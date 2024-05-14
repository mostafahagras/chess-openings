"use client";
import Delete from "./icons/delete";

export default function ClearLocalStorage() {
	return (
		<button
			className="text-red-500 mx-2"
			hidden={
				process.env.NODE_ENV !== "development" ||
				!localStorage.getItem("openings")?.length
			}
			type="button"
			onClick={() => localStorage.clear()}
		>
			<Delete />
		</button>
	);
}
