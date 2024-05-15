"use client";
import Delete from "./icons/delete";

export default function ClearLocalStorage() {
	const hidden =
		process.env.NODE_ENV !== "development" ||
		!(typeof localStorage !== "undefined"
			? localStorage.getItem("openings")?.length
			: true);
	return (
		<button
			className="text-destructive mx-2"
			hidden={hidden}
			aria-hidden={hidden}
			type="button"
			onClick={() => localStorage.clear()}
		>
			<span className="sr-only">Clear Local storage</span>
			<Delete />
		</button>
	);
}
