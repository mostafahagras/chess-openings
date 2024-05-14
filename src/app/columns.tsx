"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RowDragHandleCell } from "@/components/ui/data-table";
import { useOpenings } from "@/hooks/useOpenings";
import { toast } from "sonner";

export type Opening = {
	move: string;
	name?: string;
	previousMoves: string[];
	id: string;
};

export const columns: ColumnDef<Opening>[] = [
	{
		id: "drag-handle",
		header: "Reorder",
		cell: ({ row }) => <RowDragHandleCell rowId={row.original.id} />,
	},
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
	{
		id: "actions",
		cell: ({ row }) => {
			const opening = row.original;
			const { openings, deleteOpening } = useOpenings([]);

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() =>
								{deleteOpening([...opening.previousMoves, opening.move])
								toast.success(`Deleted ${opening.name || opening.move}`)}
							}
							className="text-red-500 hover:!text-red-500"
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
