import { type Move, Chess as _Chess } from "chess.js";

/**
 * An extension on the chess.js class that adds the redo method
 */
export class Chess extends _Chess {
	undos: string[];
	constructor(fen?: string) {
		super(fen);
		this.undos = [];
	}
	redo() {
		const lastUndone = this.undos.pop();
		if (lastUndone) {
			this.move(lastUndone);
			return lastUndone;
		}
		return null
	}
	undo(): Move | null {
		const move = super.undo();
		if (move) this.undos.push(move.san);
		return move;
	}
}
