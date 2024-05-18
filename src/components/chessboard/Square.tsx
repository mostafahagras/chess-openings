import { useBoardStore } from "@/providers/board-store-provider";
import { useDroppable } from "@dnd-kit/core";
import { chooseColor } from "./chooseHighlightColor";
import type { FileNumber, Rank } from "./types";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

type Props = {
	rank: Rank;
	file: FileNumber;
};

export default function Square({ file, rank }: Props) {
	const { setNodeRef, isOver } = useDroppable({
		id: `${FILES[file - 1]}${rank}`,
	});
	const {
		highlightSquare,
		squareColors,
		highlightColor,
		selectedSquare,
		unselectSquare,
		onMove,
	} = useBoardStore((state) => state);
	const selected =
		selectedSquare &&
		selectedSquare.file === file &&
		selectedSquare.rank === rank;
	const isDarkSquare = (rank + file) % 2 === 0;
	const squareColor = isDarkSquare ? squareColors.dark : squareColors.light;
	const textColor = isDarkSquare ? squareColors.light : squareColors.dark;
	const fillColor = selected
		? isDarkSquare
			? "#b9ca43"
			: "#f5f682"
		: highlightColor({ file, rank }) ?? squareColor;
	return (
		<g ref={(e) => setNodeRef(e as unknown as HTMLElement)}>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
				onClick={() => {
					if (selected) {
						unselectSquare();
					} else if (selectedSquare) {
						onMove(
							`${FILES[selectedSquare.file - 1]}${selectedSquare.rank}`,
							`${FILES[file - 1]}${rank}`,
							"q",
						);
						unselectSquare();
					}
				}}
				width={8}
				height={8}
				x={(file - 1) * 8}
				y={(8 - rank) * 8}
				fill={fillColor}
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
