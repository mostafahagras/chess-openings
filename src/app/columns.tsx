"use client";
import { EditOpeningForm } from "@/components/edit-opening-form";
import Delete from "@/components/icons/delete";
import ExternalLink from "@/components/icons/external-link";
import { Button } from "@/components/ui/button";
import { RowDragHandleCell } from "@/components/ui/data-table";
import { useOpenings } from "@/hooks/useOpenings";
import type { ColumnDef } from "@tanstack/react-table";
import { Chess } from "chess.js";
import Link from "next/link";
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
			return props.row.getValue<string>("name") || "None";
		},
	},
	{
		accessorKey: "previousMoves",
		header: "Previous moves",
		cell(props) {
			return (
				decodeURIComponent(props.row.original.previousMoves.join(" ")) || "None"
			);
		},
	},
	{ accessorKey: "move", header: "Move" },
	{
		header: "Open",
		cell(props) {
			const original = props.row.original;
			const previousMoves = original.previousMoves.join("/");
			const move = encodeURIComponent(original.move);
			const href = `${previousMoves ? `/${previousMoves}` : ""}/${move}`;
			return (
				<Button size="icon" variant="ghost" asChild>
					<Link href={href as "/"} title={`Go to ${original.name || move}`}>
						<ExternalLink />
					</Link>
				</Button>
			);
		},
	},
	{
		id: "edit",
		header: "Edit",
		cell({ row: { original } }) {
			const game = new Chess();
			for (let i = 0; i < original.previousMoves.length; i++) {
				try {
					game.move(decodeURIComponent(original.previousMoves[i]));
				} catch (e) {
					console.log((e as Error).message);
				}
			}
			return <EditOpeningForm opening={original} validMoves={game.moves()} />;
		},
	},
	{
		id: "actions",
		header: "Delete",
		cell: ({ row }) => {
			const opening = row.original;
			const { deleteOpening } = useOpenings([]);
			return (
				<Button
					size="icon"
					variant="ghost"
					onClick={() => {
						deleteOpening([...opening.previousMoves, opening.move]);
						toast.success(`Deleted ${opening.name || opening.move}`);
					}}
					className="text-red-500 hover:!text-red-500"
					aria-label="Delete"
				>
					<Delete />
				</Button>
			);
		},
	},
];
