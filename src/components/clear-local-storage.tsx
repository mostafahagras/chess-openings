"use client";
import Delete from "./icons/delete";

export default function ClearLocalStorage() {
	return (
		<button
			className="text-red-500 mx-2"
			hidden={
				process.env.NODE_ENV !== "development" ||
				!(typeof localStorage !== "undefined"
					? localStorage.getItem("openings")?.length
					: true)
			}
			type="button"
			onClick={() => localStorage.clear()}
		>
			<Delete />
		</button>
	);
}
