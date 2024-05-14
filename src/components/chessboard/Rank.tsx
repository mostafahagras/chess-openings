import Square from "./Square";
import type { Rank as _Rank, SquareColor, HighlightedSquare } from "./types";
import type { Dispatch, SetStateAction } from "react";

const FILES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

type Props = {
	squareColors: SquareColor;
	rank: _Rank;
	setHighlightedSquares: Dispatch<SetStateAction<HighlightedSquare[]>>;
	highlightedSquares: HighlightedSquare[];
};

export default function Rank({
	highlightedSquares,
	rank,
	setHighlightedSquares,
	squareColors,
}: Props) {
	return (
		<g name={`Rank ${rank}`}>
			{FILES.map((file) => {
				const isDarkSquare = (rank + file) % 2 === 0;
				return (
					<Square
						key={`Square ${file}${rank}`}
						file={file}
						rank={rank}
						squareColors={squareColors}
						isDarkSquare={isDarkSquare}
						setHighlightedSquares={setHighlightedSquares}
						highlightColor={
							highlightedSquares.find((s) => s.file === file && s.rank === rank)
								?.color
						}
					/>
				);
			})}
		</g>
	);
}
