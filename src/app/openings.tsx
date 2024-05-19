"use client";
import Chessboard from "@/components/chessboard";
import type { SquareColor } from "@/components/chessboard/types";
import CreateOpeningsForm from "@/components/create-openings-form";
import Pause from "@/components/icons/pause";
import Play from "@/components/icons/play";
import Moves from "@/components/moves";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Chess } from "@chess";
import {
	ChevronFirst,
	ChevronLast,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import { useReadLocalStorage } from "usehooks-ts";
import { useOpenings } from "../hooks/useOpenings";
import { columns } from "./columns";

type Props = {
	previousMoves: string[];
};

export default function Openings({ previousMoves }: Props) {
	const router = useRouter();
	const [playing, setPlaying] = useState(false);
	const [game] = useState(new Chess(undefined, typeof window !== "undefined"));
	const [fen, setFen] = useState(game.fen());
	const [actualPrevMoves, setActualPrevMoves] = useState(previousMoves);
	const undo = useCallback(() => {
		game.undo();
		setFen(game.fen());
	}, [game]);
	const redo = useCallback(() => {
		game.redo();
		setFen(game.fen());
	}, [game]);
	const firstMove = useCallback(() => {
		while (game.undo(false)) {}
		setFen(game.fen());
	}, [game]);
	const lastMove = useCallback(() => {
		while (game.redo(false)) {}
		setFen(game.fen());
	}, [game]);
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (playing) {
			const playNextMove = async () => {
				if (!game.redo()) {
					setPlaying(false);
				}
				setFen(game.fen());
				timer = setTimeout(playNextMove, 1000);
			};
			playNextMove();
		}

		return () => clearTimeout(timer);
	}, [playing, game]);
	useEffect(() => {
		game.reset();
		for (let i = 0; i < previousMoves.length; i++) {
			try {
				game.move(decodeURIComponent(previousMoves[i]), undefined, false);
				setFen(game.fen());
			} catch {
				router.replace(`/${previousMoves.slice(0, i).join("/")}`);
			}
		}
	}, [previousMoves, game, router]);
	const squareColors = useReadLocalStorage<SquareColor>("boardColors") || {
		dark: "#739552",
		light: "#ebecd0",
	};
	const { openings, setOpenings, addOpening } = useOpenings(previousMoves);
	/**
	 * Chess.com keyboard shortcuts
	 * https://support.chess.com/en/articles/8609263-what-chat-commands-can-i-use-in-game-chat#:~:text=Press%20Arrow%20Right,on%20the%20board.
	 */
	useHotkeys("ArrowLeft", undo, {
		preventDefault: previousMoves.length !== game.undos.length,
	});
	useHotkeys("ArrowRight", redo, { preventDefault: !!game.undos.length });
	useHotkeys("ArrowUp", firstMove, {
		preventDefault: previousMoves.length !== game.undos.length,
	});
	useHotkeys("ArrowDown", lastMove, { preventDefault: !!game.undos.length });
	useHotkeys("Space", () => setPlaying((p) => !p), {
		preventDefault: !!game.undos.length,
	});
	// biome-ignore lint/correctness/useExhaustiveDependencies: only actualPrevMoves is needed
	const onMove = useCallback(
		(from: string, to: string, promotion: string) => {
			try {
				const move = game.move({ from, to, promotion });
				setFen(game.fen());
				const slicedPreviousMoves = actualPrevMoves.slice(
					0,
					actualPrevMoves.length - game.undos.length,
				);
				if (addOpening(move.san, slicedPreviousMoves)) {
					toast.success("Added opening");
				} else {
					toast.info("Opening already exists");
				}
				const prevMovesString = slicedPreviousMoves.join("/");
				setActualPrevMoves((prev) => [...prev, move.san]);
				router.push(
					`${prevMovesString ? `/${prevMovesString}` : ""}/${encodeURIComponent(
						move.san,
					)}` as "/",
				);
			} catch {}
		},
		[actualPrevMoves],
	);
	return (
		<div className="space-y-4">
			<div className="flex flex-col items-center gap-4 mx-auto max-w-[500px]">
				<Chessboard fen={fen} squareColors={squareColors} onMove={onMove} />
				<div className="w-full max-w-[500px] flex gap-4 justify-center">
					<Button
						className="flex-grow"
						variant="secondary"
						onClick={firstMove}
						disabled={previousMoves.length === game.undos.length}
					>
						<span className="sr-only">First Move</span>
						<ChevronFirst />
					</Button>
					<Button
						className="flex-grow"
						variant="secondary"
						onClick={undo}
						disabled={previousMoves.length === game.undos.length}
					>
						<span className="sr-only">Previous Move</span>
						<ChevronLeft />
					</Button>
					<Button
						className="flex-grow"
						variant="secondary"
						onClick={() => setPlaying((p) => !p)}
						disabled={!game.undos.length}
					>
						<span className="sr-only">Play / Pause</span>
						{playing ? <Pause /> : <Play />}
					</Button>
					<Button
						className="flex-grow"
						variant="secondary"
						onClick={redo}
						disabled={!game.undos.length}
					>
						<span className="sr-only">Next Move</span>
						<ChevronRight />
					</Button>
					<Button
						className="flex-grow"
						variant="secondary"
						onClick={lastMove}
						disabled={!game.undos.length}
					>
						<span className="sr-only">Last Move</span>
						<ChevronLast />
					</Button>
				</div>
				<Moves moves={game.history()} />
			</div>
			<CreateOpeningsForm
				previousMoves={previousMoves}
				openings={openings}
				validMoves={game.moves()}
				setOpenings={setOpenings}
			/>
			<DataTable columns={columns} data={openings} />
		</div>
	);
}
