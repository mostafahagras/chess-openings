import { type Move, Chess as _Chess } from "chess.js";

/**
 * An extension on the chess.js class that adds the redo method, 
 * plays sound on move, capture, check, castle and promotion just like chess.com's
 */
export class Chess extends _Chess {
	undos: string[];
	private playAudio: boolean;
	private captureSound?: HTMLAudioElement;
	private castleSound?: HTMLAudioElement;
	private illegalMoveSound?: HTMLAudioElement;
	private moveSound?: HTMLAudioElement;
	private promoteSound?: HTMLAudioElement;
	private checkSound?: HTMLAudioElement;
	constructor(fen?: string, playAudio = false) {
		super(fen);
		this.undos = [];
		this.playAudio = playAudio;
		if (playAudio && typeof window !== "undefined") {
			this.captureSound = new Audio("/sounds/capture.webm");
			this.castleSound = new Audio("/sounds/castle.webm");
			this.illegalMoveSound = new Audio("/sounds/illegal.webm");
			this.moveSound = new Audio("/sounds/move-self.webm");
			this.promoteSound = new Audio("/sounds/promote.webm");
			this.checkSound = new Audio("/sounds/move-check.webm");
		}
	}
	redo() {
		const lastUndone = this.undos.pop();
		if (lastUndone) {
			this.move(lastUndone);
			return lastUndone;
		}
		return null;
	}
	undo(): Move | null {
		const move = super.undo();
		if (move) this.undos.push(move.san);
		return move;
	}
	move(
		move: string | { from: string; to: string; promotion?: string | undefined },
		{ strict }: { strict?: boolean } = {},
	): Move {
		const moveResult = super.move(move, { strict });
		console.log(moveResult);
		this.playSound(moveResult.san);
		return moveResult;
	}
	private playSound(move: string) {
		console.log(move);
		if (/(O\-){1,2}O/.test(move)) {
			console.log("Castle");
			this.castleSound?.play();
		} else if (/[\+#]$/.test(move)) {
			this.checkSound?.play();
		} else if (/^[a-h](x[a-h])*[18]\=[QRBN]$/.test(move)) {
			this.promoteSound?.play();
		} else if (/x/.test(move)) {
			this.captureSound?.play();
		} else {
			console.log("play");
			this.moveSound?.play();
		}
	}
}
