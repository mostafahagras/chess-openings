import Openings from "./openings";

export default function Home() {
	return (
		<main className="p-4">
			<Openings previousMoves={[]} />
		</main>
	);
}
