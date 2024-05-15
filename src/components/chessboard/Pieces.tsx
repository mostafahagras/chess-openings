import { useDraggable } from "@dnd-kit/core";
import type { Piece as PieceType } from "chess.js";
import type { FileNumber, Rank } from "./types";
import { CSS } from "@dnd-kit/utilities";

type Props = { pieces: PieceProps[] };

export default function Pieces({ pieces }: Props) {
	return (
		<>
			{pieces.map((piece) => (
				<Piece key={`Piece ${piece.file}${piece.rank}`} {...piece} />
			))}
		</>
	);
}

export type PieceProps = {
	square: string;
	rank: Rank;
	file: FileNumber;
	squareSize: number;
} & PieceType;

function Piece({ squareSize, file, rank, square, color, type }: PieceProps) {
	const { setNodeRef, listeners, transform, attributes, isDragging } =
		useDraggable({
			id: square,
			data: { piece: type, color: color },
			attributes: {},
		});
	return (
		<div
			{...listeners}
			{...attributes}
			className="absolute"
			style={{
				transform: CSS.Translate.toString(transform),
				left: (file - 1) * squareSize,
				top: (8 - rank) * squareSize,
				cursor: isDragging ? "grabbing" : "grab",
				zIndex: isDragging ? 1 : 0,
			}}
			ref={setNodeRef}
		>
			<img
				src={`/pieces/${color}${type}.webp`}
				height={squareSize}
				width={squareSize}
				alt={`${color}${type}`}
			/>
		</div>
	);
}