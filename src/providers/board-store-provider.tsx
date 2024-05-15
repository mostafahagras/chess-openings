"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import { type BoardStore, createBoardStore } from "@/stores/board";

export const BoardStoreContext = createContext<StoreApi<BoardStore> | null>(
	null,
);

export interface BoardStoreProviderProps {
	children: ReactNode;
	squareSize: number;
}

export const BoardStoreProvider = ({
	children,
	squareSize,
}: BoardStoreProviderProps) => {
	const storeRef = useRef<StoreApi<BoardStore>>();
	if (!storeRef.current) {
		storeRef.current = createBoardStore(squareSize);
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
