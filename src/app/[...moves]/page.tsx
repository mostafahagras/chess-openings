import GameMoves from "@/components/GameMoves";
import Openings from "../openings";
import { Chess } from "chess.js";

type Props = {
	params: {
		moves: string[];
	};
};

export default function Page({ params: { moves } }: Props) {
	const game = new Chess();
	for (let i = 0; i < moves.length; i++) {
		game.move(moves[i]);
	}
	return (
		<main className="p-4">
			{/* {JSON.stringify(moves)} */}
			<GameMoves moves={moves} />
			<Openings previousMoves={moves} validMoves={game.moves()} />
		</main>
	);
}

// export function generateStaticParams() {
// 	return [["e4"], ["e3"], [""]].map((a) => ({ moves: a }));
// }
