import ClearLocalStorage from "@/components/clear-local-storage";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-10 bg-transparent">
			<div className="flex justify-center bg-background/85 px-6 saturate-[1.8] backdrop-blur-sm py-3 border-b">
				<div className="flex max-w-7xl flex-1 items-center">
					<div className="flex flex-1 items-center">
						<Link
							className="flex items-center"
							href="/"
							title="Go to the homepage"
						>
							<Image
								src="/bp.png"
								width={30}
								height={30}
								alt="Logo"
								className="-translate-y-[3px]"
							/>
							<div className="text-xl flex-nowrap font-medium">
								Chess Openings
							</div>
						</Link>
					</div>
					<ClearLocalStorage />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
