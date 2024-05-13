"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export type Opening = {
	move: string;
	name?: string;
	previousMoves: string[];
	responses?: Opening[];
};

export const columns: ColumnDef<Opening>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell(props) {
			return props.row.getValue<string>("name") ?? "None";
		},
	},
	{
		accessorKey: "previousMoves",
		header: "Previous moves",
		cell(props) {
			return props.row.getValue<string[]>("previousMoves").join(" ") || "None";
		},
	},
	{ accessorKey: "move", header: "Move" },
	{
		accessorKey: "responses",
		header: "# of Responses",
		cell(props) {
			return props.row.getValue<[]>("responses")?.length ?? 0;
		},
	},
	{
		accessorKey: "move",
		header: "Go to opening",
		cell(props) {
			const previousMoves = props.row
				.getValue<string[]>("previousMoves")
				.join("/");
			const move = props.row.getValue<"">("move");
			const href = `${previousMoves ? `/${previousMoves}` : ""}/${move}`;
			return (
				<Link href={href as "/"}>
					<ExternalLink size="16" />
				</Link>
			);
		},
	},
];
