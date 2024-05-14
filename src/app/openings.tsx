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
	validMoves: string[];
};

export default function Openings({ previousMoves, validMoves }: Props) {
	const { openings, setOpenings } = useOpenings(previousMoves);
	return (
		<div className="space-y-4">
			<CreateOpeningsForm
				previousMoves={previousMoves}
				openings={openings}
				validMoves={validMoves}
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
