import Rank from "./Rank";
import { useEventListener } from "usehooks-ts";
import { useBoardStore } from "@/providers/board-store-provider";

const RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export default function Squares() {
	const { setHighlightedSquares } = useBoardStore((state) => state);
	useEventListener("click", () => setHighlightedSquares([]));
	return (
		<g name="Board">
			{RANKS.map((rank) => (
				<Rank key={`rank-${rank}`} rank={rank} />
			))}
		</g>
	);
}
