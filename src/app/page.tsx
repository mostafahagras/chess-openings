import { type Opening, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Openings from "./openings";

export default function Home() {
	return (
		<main className="p-4">
			<Openings previousMoves={[]} />
		</main>
	);
}
