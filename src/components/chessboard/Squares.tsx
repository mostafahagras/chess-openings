import type { Dispatch, SetStateAction } from "react";
import type { SquareColor, HighlightedSquare } from "./types";
import Rank from "./Rank";

const RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;


type Props = {
	squareColors: SquareColor;
	setHighlightedSquares: Dispatch<SetStateAction<HighlightedSquare[]>>;
	highlightedSquares: HighlightedSquare[];
};

export default function Squares({
	squareColors,
	setHighlightedSquares,
	highlightedSquares,
}: Props) {
	return (
		<g name="Board">
			{RANKS.map((rank) => (
				<Rank
					key={`rank-${rank}`}
					highlightedSquares={highlightedSquares}
					rank={rank}
					setHighlightedSquares={setHighlightedSquares}
					squareColors={squareColors}
				/>
			))}
		</g>
	);
}
