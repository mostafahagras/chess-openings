import Square from "./Square";
import type { Rank as _Rank } from "./types";

const FILES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

type Props = {
	rank: _Rank;
};

export default function Rank({ rank }: Props) {
	return (
		<g name={`Rank ${rank}`}>
			{FILES.map((file) => {
				return <Square key={`Square ${file}${rank}`} file={file} rank={rank} />;
			})}
		</g>
	);
}
