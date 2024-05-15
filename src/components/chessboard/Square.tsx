import { useBoardStore } from "@/providers/board-store-provider";
import { useDroppable } from "@dnd-kit/core";
import type { Dispatch, SetStateAction } from "react";
import { chooseColor } from "./chooseHighlightColor";
import type { FileNumber, HighlightedSquare, Rank, SquareColor } from "./types";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

type Props = {
	rank: Rank;
	file: FileNumber;
};

export default function Square({ file, rank }: Props) {
	const { setNodeRef, isOver } = useDroppable({
		id: `${FILES[file - 1]}${rank}`,
	});
	const { highlightSquare, squareColors, highlightColor } = useBoardStore(
		(state) => state,
	);
	const isDarkSquare = (rank + file) % 2 === 0;
	const squareColor = isDarkSquare ? squareColors.dark : squareColors.light;
	const textColor = isDarkSquare ? squareColors.light : squareColors.dark;
	return (
		<g ref={(e) => setNodeRef(e as unknown as HTMLElement)}>
			<rect
				onContextMenu={(e) => {
					const { shiftKey, ctrlKey, altKey } = e;
					e.preventDefault();
					highlightSquare({
						file,
						rank,
						color: chooseColor({ shiftKey, ctrlKey, altKey, isDarkSquare }),
					});
				}}
				width={8}
				height={8}
				x={(file - 1) * 8}
				y={(8 - rank) * 8}
				fill={highlightColor({ file, rank }) ?? squareColor}
				opacity={isOver ? 0.9 : 1}
			/>
			{rank === 1 && (
				<text
					x={(file - 1) * 8 + 6.75}
					y={(8 - rank) * 8 + 6.75}
					textAnchor="middle"
					alignmentBaseline="central"
					fontSize={1.75}
					fill={textColor}
				>
					{FILES[file - 1]}
				</text>
			)}
			{file === 1 && (
				<text
					x={(file - 1) * 8 + 1}
					y={(8 - rank) * 8 + 1.5}
					textAnchor="middle"
					alignmentBaseline="central"
					fontSize={1.75}
					fill={textColor}
				>
					{rank}
				</text>
			)}
		</g>
	);
}
