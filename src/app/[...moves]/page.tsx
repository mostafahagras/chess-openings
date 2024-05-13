import { type Opening, columns } from "../columns";
import { DataTable } from "../../components/ui/data-table";

type Props = {
	params: {
		moves: string[];
	};
};

const allData: Opening[] = [
	{
		move: "e4",
		previousMoves: [],
		responses: [
			{
				move: "e5",
				previousMoves: ["e4"],
				responses: [
					{ move: "Nf3", previousMoves: ["e4", "e5"], responses: [] },
				],
			},
		],
	},
	{
		move: "d4",
		previousMoves: [],
		responses: [{ move: "d5", previousMoves: ["d4"], responses: [] }],
	},
];

export default function Page({ params: { moves } }: Props) {
	let data: Opening[] = allData;
	// biome-ignore lint/complexity/noForEach: <explanation>
	moves.forEach((move) => {
		const responses = data.find((d) => d.move === move)?.responses;
		if (responses) {
			data = responses;
		}
	});
	return (
		<main className="p-4">
			<DataTable columns={columns} data={data} />
		</main>
	);
}
