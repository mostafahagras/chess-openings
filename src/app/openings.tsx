"use client";

import { DataTable } from "@/components/ui/data-table";
import { useLocalStorage } from "usehooks-ts";
import { type Opening, columns } from "./columns";
import CreateOpeningsForm from "@/components/create-openings-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useOpenings } from "../hooks/useOpenings";

type Props = {
	previousMoves: string[];
};

export default function Openings({ previousMoves }: Props) {
	// const [openings, setOpenings] = useLocalStorage<Opening[]>("openings", []);
	const { openings, setOpenings } = useOpenings(previousMoves);
	// const router = useRouter();
	// if (openings.length === 0 && previousMoves.length !== 0) {
	// 	router.replace("/");
	// }
	// let data = openings;
	// // biome-ignore lint/complexity/noForEach: <explanation>
	// previousMoves.forEach((move) => {
	// 	const responses = data.find((d) => d.move === move)?.responses;
	// 	if (responses) {
	// 		data = responses;
	// 	}
	// });
	// const [sortableData, setSortableData] = useState<Opening[]>();
	return (
		<div className="space-y-4">
			<CreateOpeningsForm
				previousMoves={previousMoves}
				openings={openings}
				setOpenings={setOpenings}
			/>
			<DataTable
				columns={columns}
				data={openings}
				setData={setOpenings}
			/>
		</div>
	);
}
