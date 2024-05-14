type Key = "shiftKey" | "ctrlKey" | "altKey" | "isDarkSquare";

export function chooseColor({
	altKey,
	ctrlKey,
	isDarkSquare,
	shiftKey,
}: Record<Key, boolean>) {
	if (altKey) {
		return isDarkSquare ? "#59abc0" : "#71bcda";
	}
	if (ctrlKey) {
		return isDarkSquare ? "#e3a610" : "#fbb72a";
	}
	if (shiftKey) {
		return isDarkSquare ? "#a1c357" : "#b9d471";
	}
	return isDarkSquare ? "#d36c50" : "#eb7d6a";
}
