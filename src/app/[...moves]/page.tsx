import Openings from "../openings";

type Props = {
	params: {
		moves: string[];
	};
};

export default function Page({ params: { moves } }: Props) {
	return (
		<main className="p-4">
			<Openings previousMoves={moves} />
		</main>
	);
}
