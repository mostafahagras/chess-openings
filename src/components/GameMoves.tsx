import { movesToPlies } from "@/lib/movesToPlies";

type Props = {
	moves: string[];
};

export default function GameMoves({ moves }: Props) {
	const plies = movesToPlies(moves);
	return (
		<>
			{plies.map((ply, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<p key={index}>
					{index + 1}. <span>{ply.white}</span> <span>{ply.black}</span>
				</p>
			))}
		</>
	);
}
