import {
	BoardStoreProvider,
	useBoardStore,
} from "@/providers/board-store-provider";
import {
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Chess } from "chess.js";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import Pieces, { type PieceProps } from "./Pieces";
import Squares from "./Squares";
import type { BoardDimentsions, FileNumber, Rank, SquareColor } from "./types";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

type Props = {
	fen: string;
	onMove: (from: string, to: string, promotion: string) => void;
	squareColors: SquareColor;
};

export default function Chessboard({ fen, onMove, squareColors }: Props) {
	const game = useMemo(() => new Chess(fen), [fen]);
	const [boardDimentsions, setBoardDimentsions] = useState<
		BoardDimentsions & { top: number; left: number }
	>({
		width: 0,
		height: 0,
		left: 0,
		top: 0,
	});
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
	return (
		<BoardStoreProvider
			squareSize={boardDimentsions.height / 8}
			squareColors={squareColors}
			onMove={onMove}
		>
			<DndProvider
				left={boardDimentsions.left}
				top={boardDimentsions.top}
				onMove={onMove}
				squareSize={boardDimentsions.width / 8}
			>
				<div
					className="w-full max-w-[500px] relative"
					style={{ height: boardDimentsions.height || "500px" }}
				>
					<svg
						ref={ref}
						viewBox="0 0 64 64"
						className="select-none absolute bg-[#312e2b]"
					>
						<Squares />
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
			</DndProvider>
		</BoardStoreProvider>
	);
}

function DndProvider({
	children,
	left,
	top,
	onMove,
	squareSize,
}: {
	children: ReactNode;
	left: number;
	top: number;
	onMove: (from: string, to: string, promotion: string) => void;
	squareSize: number;
}) {
	const { selectSquare, selectedSquare, unselectSquare } = useBoardStore(
		(state) => state,
	);
	return (
		<DndContext
			sensors={useSensors(
				useSensor(MouseSensor, {
					onActivation({ event }) {
						const file = Math.ceil(
							((event as MouseEvent).clientX - left) / squareSize,
						) as FileNumber;
						const rank = (9 -
							Math.ceil(
								((event as MouseEvent).clientY - top) / squareSize,
							)) as Rank;
						if (!selectedSquare) {
							selectSquare({ file, rank });
						} else if (
							selectedSquare.rank === rank &&
							selectedSquare.file === file
						) {
							unselectSquare();
						} else {
							onMove(
								`${FILES[selectedSquare.file - 1]}${selectedSquare.rank}`,
								`${FILES[file - 1]}${rank}`,
								"q",
							);
							unselectSquare();
						}
					},
				}),
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
			{children}
		</DndContext>
	);
}
