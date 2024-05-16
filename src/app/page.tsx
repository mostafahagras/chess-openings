import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Openings from "./openings";

export default function Home() {
	return (
		<main className="p-4">
			<Openings previousMoves={[]} />
			<Alert variant="warning" className="mt-4">
				<AlertTitle>Important</AlertTitle>
				<AlertDescription>
					This app is under development and is constantly changing. for any
					issues, Please submit them{" "}
					<Link
						href="https://github.com/mostafahagras/chess-openings/issues/new"
						target="_blank"
						className="underline"
					>
						here
					</Link>
				</AlertDescription>
			</Alert>
		</main>
	);
}
