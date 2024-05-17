import { BoardStoreProvider } from "@/providers/board-store-provider";
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
import { useCallback, useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import Pieces, { type PieceProps } from "./Pieces";
import Squares from "./Squares";
import type { BoardDimentsions, Rank } from "./types";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

type Props = {
	fen: string;
	onMove: (from: string, to: string, promotion: string) => void;
};

export default function Chessboard({ fen, onMove }: Props) {
	const game = useMemo(() => new Chess(fen), [fen]);
	const [boardDimentsions, setBoardDimentsions] = useState<BoardDimentsions>({
		width: 0,
		height: 0,
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
			<BoardStoreProvider squareSize={boardDimentsions.height / 8}>
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
			</BoardStoreProvider>
		</DndContext>
	);
}
