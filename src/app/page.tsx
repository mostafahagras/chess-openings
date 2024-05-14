import { type Opening, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Openings from "./openings";
import { Chess } from "chess.js";
import { EditOpeningForm } from "@/components/edit-opening-form";

export default function Home() {
	const game = new Chess();
	return (
		<main className="p-4">
			<Openings previousMoves={[]} validMoves={game.moves()} />
		</main>
	);
}
