"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import type { SquareColor } from "@/components/chessboard/types";
import { type BoardStore, createBoardStore } from "@/stores/board";

export const BoardStoreContext = createContext<StoreApi<BoardStore> | null>(
	null,
);

export interface BoardStoreProviderProps {
	children: ReactNode;
	squareSize: number;
	squareColors: SquareColor;
	onMove: (from: string, to: string, promotion: string) => void;
}

export const BoardStoreProvider = ({
	children,
	squareSize,
	squareColors,
	onMove,
}: BoardStoreProviderProps) => {
	const storeRef = useRef<StoreApi<BoardStore>>();
	if (!storeRef.current) {
		storeRef.current = createBoardStore(squareSize, squareColors, onMove);
	}

	return (
		<BoardStoreContext.Provider value={storeRef.current}>
			{children}
		</BoardStoreContext.Provider>
	);
};

export const useBoardStore = <T,>(selector: (store: BoardStore) => T): T => {
	const boardStoreContext = useContext(BoardStoreContext);
	if (!boardStoreContext)
		throw new Error("useBoardStore must be within BoardStoreProvider");
	return useStore(boardStoreContext, selector);
};
