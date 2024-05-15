"use client";

import { DataTable } from "@/components/ui/data-table";
import { useReadLocalStorage } from "usehooks-ts";
import { useHotkeys } from "react-hotkeys-hook";
import { columns } from "./columns";
import CreateOpeningsForm from "@/components/create-openings-form";
import { useEffect, useState } from "react";
import { useOpenings } from "../hooks/useOpenings";
import Chessboard from "@/components/chessboard";
import type { SquareColor } from "@/components/chessboard/types";
import { Chess } from "@chess";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
	previousMoves: string[];
};

export default function Openings({ previousMoves }: Props) {
	const router = useRouter();
	const [game] = useState(new Chess(undefined, typeof window !== "undefined"));
	const [fen, setFen] = useState(game.fen());
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
	useHotkeys("ArrowLeft", () => {
		game.undo();
		setFen(game.fen());
	});
	useHotkeys("ArrowRight", () => {
		game.redo();
		setFen(game.fen());
	});
	return (
		<div className="space-y-4">
			<div className="flex flex-col items-center">
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
