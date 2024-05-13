import { type Opening, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const allData: Opening[] = [
	{
		move: "e4",
		name: "King's Pawn",
		previousMoves: [],
		responses: [{ move: "e5", previousMoves: ["e4"], responses: [] }],
	},
	{
		move: "d4",
		name: "Queen's Pawn",
		previousMoves: [],
		responses: [{ move: "d5", previousMoves: ["d4"], responses: [] }],
	},
];

export default function Home() {
	return (
		<main className="p-4">
			<DataTable columns={columns} data={allData} />
		</main>
	);
}
