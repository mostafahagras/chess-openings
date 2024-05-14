import type { Dispatch, SetStateAction } from "react";
import type { FileNumber, HighlightedSquare, Rank, SquareColor } from "./types";
import { chooseColor } from "./chooseHighlightColor";
import { useDroppable } from "@dnd-kit/core";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

type Props = {
	rank: Rank;
	file: FileNumber;
	squareColors: SquareColor;
	isDarkSquare: boolean;
	setHighlightedSquares: Dispatch<SetStateAction<HighlightedSquare[]>>;
	highlightColor?: string;
};

export default function Square({
	squareColors,
	file,
	rank,
	highlightColor,
	isDarkSquare,
	setHighlightedSquares,
}: Props) {
	const { setNodeRef, isOver } = useDroppable({
		id: `${FILES[file - 1]}${rank}`,
	});
	const squareColor = isDarkSquare ? squareColors.dark : squareColors.light;
	const textColor = isDarkSquare ? squareColors.light : squareColors.dark;
	return (
		<g ref={(e) => setNodeRef(e as unknown as HTMLElement)}>
			<rect
				onContextMenu={(e) => {
					const { shiftKey, ctrlKey, altKey } = e;
					e.preventDefault();
					setHighlightedSquares((prev) => [
						...prev,
						{
							color: chooseColor({ shiftKey, ctrlKey, altKey, isDarkSquare }),
							file,
							rank,
						},
					]);
				}}
				width={8}
				height={8}
				x={(file - 1) * 8}
				y={(8 - rank) * 8}
				fill={highlightColor ?? squareColor}
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
