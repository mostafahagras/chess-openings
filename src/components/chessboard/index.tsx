import {
	useDraggable,
	useDroppable,
	DndContext,
	MouseSensor,
	KeyboardSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Chess, Piece as _Piece } from "chess.js";
import type {
	SquareColor,
	Rank,
	FileNumber,
	_File,
	SquareRecord,
	HighlightedSquare,
} from "./types";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useEventListener, useWindowSize } from "usehooks-ts";
import Squares from "./Squares";
import Pieces, { type PieceProps } from "./Pieces";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

type Props = {
	squareColors: SquareColor;
	fen: string;
	onMove: (from: string, to: string, promotion: string) => void;
};

type BoardDimentsions = { height: number; width: number };

export default function Chessboard({ squareColors, fen, onMove }: Props) {
	const game = useMemo(() => new Chess(fen), [fen]);
	const [boardDimentsions, setBoardDimentsions] = useState<BoardDimentsions>({
		width: 0,
		height: 0,
	});
	const [highlightedSquares, setHighlitedSquares] = useState<
		HighlightedSquare[]
	>([]);
	const { width: windowWidth } = useWindowSize();
	// biome-ignore lint/correctness/useExhaustiveDependencies: Update board on window resize
	const ref = useCallback<(node: SVGSVGElement | null) => void>(
		(node) => {
			if (node) {
				setBoardDimentsions(node.getBoundingClientRect());
			}
		},
		[windowWidth],
	);
	useEventListener("click", () => setHighlitedSquares([]));
	return (
		<DndContext
			sensors={useSensors(
				useSensor(MouseSensor),
				useSensor(TouchSensor),
				useSensor(KeyboardSensor),
			)}
			modifiers={[restrictToWindowEdges]}
			onDragEnd={(e) => {
				if (e.over && e.active.id !== e.over.id) {
					onMove(
						e.active.id as string,
						e.over.id as string,
						/*promotion ||*/ "q",
					);
				}
			}}
		>
			<div
				className="w-[min(100%,500px)] relative"
				style={{ height: boardDimentsions.height || "500px" }}
			>
				<svg
					ref={ref}
					viewBox="0 0 64 64"
					className="select-none absolute bg-[#312e2b]"
				>
					<Squares
						squareColors={squareColors}
						setHighlightedSquares={setHighlitedSquares}
						highlightedSquares={highlightedSquares}
					/>
				</svg>
				<div className="relative">
					<Pieces
						pieces={
							game
								.board()
								.reverse()
								.flat()
								.filter(Boolean)
								.map((p) => ({
									...p,
									squareSize: boardDimentsions.height / 8,
									// biome-ignore lint/style/noNonNullAssertion: .filter(Boolean) is applied
									file: FILES.indexOf(p!.square[0]) + 1,
									// biome-ignore lint/style/noNonNullAssertion: .filter(Boolean) is applied
									rank: Number.parseInt(p!.square[1]) as Rank,
								})) as PieceProps[]
						}
					/>
				</div>
			</div>
		</DndContext>
	);
}
