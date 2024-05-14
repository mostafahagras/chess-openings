"use client";

import { DataTable } from "@/components/ui/data-table";
import { useReadLocalStorage } from "usehooks-ts";
import { useHotkeys } from "react-hotkeys-hook";
import { columns } from "./columns";
import CreateOpeningsForm from "@/components/create-openings-form";
import { useState } from "react";
import { useOpenings } from "../hooks/useOpenings";
import Chessboard from "@/components/chessboard";
import type { SquareColor } from "@/components/chessboard/types";
import { Chess } from "@chess";

type Props = {
	previousMoves: string[];
};

export default function Openings({ previousMoves }: Props) {
	const [game] = useState(new Chess(undefined, true));
	for (let i = 0; i < previousMoves.length; i++) {
		game.move(previousMoves[i]);
	}
	const [fen, setFen] = useState(game.fen());
	const colors = useReadLocalStorage<SquareColor>("boardColors") || {
		dark: "#739552",
		light: "#ebecd0",
	};
	const { openings, setOpenings } = useOpenings(previousMoves);
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
						game.move({ from, to, promotion });
						setFen(game.fen());
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
