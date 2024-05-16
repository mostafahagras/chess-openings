import type { Opening } from "@/app/columns";
import { nanoid } from "nanoid";
import { useLocalStorage } from "usehooks-ts";

export function useOpenings(previousMoves?: string[]) {
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
			prev.filter(
				(opening) =>
					!opening.previousMoves
						.concat(opening.move)
						.join(",")
						.startsWith(moves.join(",")),
			),
		);
	}
	function editOpening(opening: Opening) {
		if (
			openings.find(
				(o) =>
					o.move === opening.move &&
					o.id !== opening.id &&
					o.previousMoves.toString() === opening.previousMoves.toString(),
			)
		) {
			return false;
		}
		setOpenings((prev) =>
			prev.map((o) => (o.id === opening.id ? { ...o, ...opening } : o)),
		);
		return true;
	}
	return {
		openings: previousMoves
			? openings.filter(
					(o) =>
						o.previousMoves.length === previousMoves.length &&
						o.previousMoves.join().startsWith(previousMoves.join()),
				)
			: openings,
		setOpenings,
		deleteOpenings,
		addOpening,
		deleteOpening,
		editOpening,
	};
}
