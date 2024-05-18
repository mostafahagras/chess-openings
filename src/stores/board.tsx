import type {
	HighlightedSquare,
	SquareColor,
	SquareRecord,
} from "@/components/chessboard/types";
import { createStore } from "zustand/vanilla";

export type BoardStore = {
	highlightedSquares: HighlightedSquare[];
	highlightSquare: (square: HighlightedSquare) => void;
	unhighlightSquare: (square: SquareRecord) => void;
	highlightColor: (square: SquareRecord) => string | undefined;
	setHighlightedSquares: (squares: HighlightedSquare[]) => void;
	squareColors: SquareColor;
	squareSize: number;
	selectedSquare: SquareRecord | null;
	selectSquare: (square: SquareRecord) => void;
	unselectSquare: () => void;
	onMove: (from: string, to: string, promotion: string) => void;
};

export const createBoardStore = (
	squareSize: number,
	squareColors: SquareColor,
	onMove: (from: string, to: string, promotion: string) => void,
) => {
	return createStore<BoardStore>()((set, get) => ({
		highlightedSquares: [],
		highlightSquare: (square) =>
			set((state) => ({
				highlightedSquares: [...state.highlightedSquares, square],
			})),
		unhighlightSquare: (square) =>
			set((state) => ({
				highlightedSquares: state.highlightedSquares.filter(
					(s) => s.file === square.file && s.rank === square.rank,
				),
			})),
		setHighlightedSquares: (squares) =>
			set(() => ({ highlightedSquares: squares })),
		highlightColor: (square) =>
			get().highlightedSquares.find(
				(s) => square.file === s.file && square.rank === s.rank,
			)?.color,
		squareColors: squareColors,
		squareSize,
		selectedSquare: null,
		selectSquare: (square) => set(() => ({ selectedSquare: square })),
		unselectSquare: () => set(() => ({ selectedSquare: null })),
		onMove,
	}));
};
