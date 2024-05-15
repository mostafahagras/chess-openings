"use client";
import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	type UniqueIdentifier,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	restrictToParentElement,
	restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// https://tanstack.com/table/v8/docs/framework/react/examples/row-dnd
import type { CSSProperties, Dispatch, SetStateAction } from "react";

import {
	type ColumnDef,
	type Row,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import type { Opening } from "@/app/columns";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useOpenings } from "@/hooks/useOpenings";
import { cn } from "@/lib/utils";
import type React from "react";
import { useMemo } from "react";
import DragHandle from "../icons/drag-handle";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	setData: Dispatch<SetStateAction<TData[]>>;
}

export const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
	const { attributes, listeners, isDragging } = useSortable({
		id: rowId,
	});
	return (
		<button
			{...attributes}
			{...listeners}
			className={isDragging ? "cursor-grabbing" : "cursor-grab"}
		>
			<span className="sr-only">Drag handle</span>
			<DragHandle />
		</button>
	);
};

interface DraggableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	row: Row<Opening>;
}
function DraggableRow({ row, className, ...props }: DraggableRowProps) {
	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.original.id,
	});
	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition: transition,
		opacity: isDragging ? 0.8 : 1,
		zIndex: isDragging ? 1 : 0,
		position: "relative",
	};
	return (
		<tr
			ref={setNodeRef}
			className={cn(
				"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
				className,
			)}
			style={style}
			{...props}
		/>
	);
}

export function DataTable<TData, TValue>({
	columns,
	data,
	setData,
}: DataTableProps<TData, TValue>) {
	const { openings, setOpenings } = useOpenings();
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		// @ts-expect-error
		getRowId: (row) => row.id,
	});
	const dataIds = useMemo<UniqueIdentifier[]>(
		// @ts-expect-error
		() => data.map((r) => r.id),
		[data],
	);
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			const ids = openings.map((o) => o.id);
			setOpenings((prev) => {
				const oldIndex = ids.indexOf(active.id as string);
				const newIndex = ids.indexOf(over.id as string);
				return arrayMove(prev, oldIndex, newIndex);
			});
		}
	}
	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {}),
	);
	return (
		<div className="rounded-md border">
			<DndContext
				collisionDetection={closestCenter}
				modifiers={[restrictToVerticalAxis, restrictToParentElement]}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={`tr-${headerGroup.id}`}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						<SortableContext
							items={dataIds}
							strategy={verticalListSortingStrategy}
						>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<DraggableRow
										row={row as Row<Opening>}
										key={`dr-${row.id}`}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={`${row.id}${cell.id}`}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</DraggableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										Nothing here yet!
									</TableCell>
								</TableRow>
							)}
						</SortableContext>
					</TableBody>
				</Table>
			</DndContext>
		</div>
	);
}
