export function movesToPlies(
	chessMoves: string[],
): { white: string; black: string | null }[] {
	const pairs = [];

	for (let i = 0; i < chessMoves.length; i += 2) {
		const movePair = {
			white: chessMoves[i],
			black: i + 1 < chessMoves.length ? chessMoves[i + 1] : null,
		};
		pairs.push(movePair);
	}

	return pairs;
}
