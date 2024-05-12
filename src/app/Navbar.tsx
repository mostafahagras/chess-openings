import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import {} from "lucide-react";

export default function Navbar() {
	return (
		<header className="sticky top-0 bg-transparent">
			<div className="flex justify-center bg-background/85 px-6 saturate-[1.8] backdrop-blur-sm py-3 border-b">
				<div className="flex max-w-7xl flex-1 items-center">
					<div className="flex flex-1 items-center">
						<Link className="flex" href="/" title="Go to the homepage">
							{/* <School /> */}
							<div className="text-xl flex-nowrap font-medium">
								Chess Openings
							</div>
						</Link>
					</div>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
