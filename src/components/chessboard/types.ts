export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type _File = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"; // File is already taken
export type FileNumber = Rank; // or 1 -> 8
export type SquareRecord = { file: FileNumber; rank: Rank };
export type HighlightedSquare = SquareRecord & { color: string };
export type SquareColor = { light: string; dark: string };
export type BoardDimentsions = { height: number; width: number };
