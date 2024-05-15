"use client";

import { DataTable } from "@/components/ui/data-table";
import { useReadLocalStorage } from "usehooks-ts";
import { useHotkeys } from "react-hotkeys-hook";
import { columns } from "./columns";
import CreateOpeningsForm from "@/components/create-openings-form";
import { useEffect, useMemo, useState } from "react";
import { useOpenings } from "../hooks/useOpenings";
import Chessboard from "@/components/chessboard";
import type { SquareColor } from "@/components/chessboard/types";
import { Chess } from "@chess";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	ChevronFirst,
	ChevronLast,
	ChevronRight,
	ChevronLeft,
} from "lucide-react";
import Pause from "@/components/icons/pause";
import Play from "@/components/icons/play";
import { sleep } from "@/lib/sleep";

type Props = {
	previousMoves: string[];
};

export default function Openings({ previousMoves }: Props) {
	const router = useRouter();
	const [playing, setPlaying] = useState(false);
	const [game] = useState(new Chess(undefined, typeof window !== "undefined"));
	const [fen, setFen] = useState(game.fen());
	const undo = useMemo(() => {
		return () => {
			game.undo();
			setFen(game.fen());
		};
	}, [game]);
	const redo = useMemo(() => {
		return () => {
			game.redo();
			setFen(game.fen());
		};
	}, [game]);
	const firstMove = useMemo(() => {
		return () => {
			while (game.undo(false)) {}
			setFen(game.fen());
		};
	}, [game]);
	const lastMove = useMemo(() => {
		return () => {
			while (game.redo(false)) {}
			setFen(game.fen());
		};
	}, [game]);
	const playMoves = useMemo(() => {
		return async () => {
			if (playing) {
				setPlaying(false);
			} else {
				setPlaying(true);
				while (game.redo()) {
					setFen(game.fen());
					await sleep(500);
				}
				setPlaying(false);
			}
		};
	}, [game, playing]);
	useEffect(() => {
		game.reset();
		for (let i = 0; i < previousMoves.length; i++) {
			try {
				game.move(decodeURIComponent(previousMoves[i]), undefined, false);
				setFen(game.fen());
			} catch (error) {}
		}
	}, [previousMoves, game]);
	const colors = useReadLocalStorage<SquareColor>("boardColors") || {
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
	useHotkeys("Space", playMoves, { preventDefault: !!game.undos.length });
	return (
		<div className="space-y-4">
			<div className="flex flex-col items-center gap-4">
				<Chessboard
					fen={fen}
					onMove={(from, to, promotion) => {
						try {
							const move = game.move({ from, to, promotion });
							setFen(game.fen());
							if (addOpening(move.san, previousMoves)) {
								toast.success("Added opening");
							} else {
								toast.info("Opening already exists");
							}
							const prevMovesString = previousMoves.join("/");
							router.push(
								`${
									prevMovesString ? `/${prevMovesString}` : ""
								}/${encodeURIComponent(move.san)}` as "/",
							);
						} catch {}
					}}
					squareColors={colors}
				/>
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
						onClick={playMoves}
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
			</div>
			<CreateOpeningsForm
				previousMoves={previousMoves}
				openings={openings}
				validMoves={game.moves()}
				setOpenings={setOpenings}
			/>
			<DataTable columns={columns} data={openings} setData={setOpenings} />
		</div>
	);
}
