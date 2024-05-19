import { useMemo } from "react";

type Props = {
	moves: string[];
};

function movesToPlies(
	chessMoves: string[],
): { white: string; black: string | null }[] {
	const pairs = [];

	for (let i = 0; i < chessMoves.length; i += 2) {
		const movePair = {
			white: chessMoves[i],
			black: i + 1 < chessMoves.length ? chessMoves[i + 1] : null,
		};
		pairs.push(movePair);
	}

	return pairs;
}

export default function Moves({ moves }: Props) {
	const plies = useMemo(() => movesToPlies(moves), [moves]);
	return (
		<div className="self-start flex flex-col gap-2">
			{plies.map((ply, i) => (
				<span key={ply.toString()} className="flex gap-3">
					<span>{i + 1}.</span>
					<span>{ply.white}</span>
					{ply.black && <span>{ply.black}</span>}
				</span>
			))}
		</div>
	);
}
