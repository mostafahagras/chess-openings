import { useLocalStorage } from "usehooks-ts";
// import type { Opening } from "../columns"
import { nanoid } from "nanoid";
type Opening = {
	move: string;
	name?: string;
	previousMoves: string[];
	id: string;
};

export function useOpenings(previousMoves: string[]) {
	const [openings, setOpenings, deleteOpenings] = useLocalStorage<Opening[]>(
		"openings",
		[],
	);
	function addOpening(move: string, previousMoves: string[], name?: string) {
		if (
			!openings.find(
				(o) =>
					o.move === move && o.previousMoves.join() === previousMoves.join(),
			)
		) {
			setOpenings((prev) => [
				...prev,
				{ move, name, previousMoves, id: nanoid() },
			]);
			return true;
		}
		return false;
	}
	function deleteOpening(moves: string[]) {
		setOpenings((prev) =>
			prev.filter((opening) =>
				!opening.previousMoves
					.concat(opening.move)
					.join(",")
					.startsWith(moves.join(",")),
			),
		);
	}
	function editOpening() {}
	function swapOpenings(firstId: string, secondId: string) {
		setOpenings((prev) => {
			const firstElement = prev.find((o) => o.id === firstId);
			const secondElement = prev.find((o) => o.id === secondId);
			return prev;
			// 	.with(firstIndex, secondElement)
			// 	.with(secondIndex, firstElement);
		});
	}
	return {
		openings: openings.filter(
			(o) =>
				o.previousMoves.length === previousMoves.length &&
				o.previousMoves.join().startsWith(previousMoves.join()),
		),
		setOpenings,
		deleteOpenings,
		addOpening,
		deleteOpening,
		editOpening,
		swapOpenings,
	};
}
