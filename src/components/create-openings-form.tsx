import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";
import type { Opening } from "@/app/columns";
import { useOpenings } from "@/hooks/useOpenings";
import { toast } from "sonner";

const formSchema = z.object({
	move: z
		.string()
		.min(2, {
			message: "Chess moves are at least 2 characters",
		})
		.regex(/^[abcdefgh12345678xQRNKB]+$/, "Invalid move"),
	name: z.string().optional(),
});
type FormType = z.infer<typeof formSchema>;

type Props = {
	previousMoves: string[];
	validMoves: string[];
	openings: Opening[];
	setOpenings: Dispatch<SetStateAction<Opening[]>>;
};

export default function CreateOpeningsForm({
	previousMoves,
	validMoves,
}: Props) {
	const { addOpening } = useOpenings(previousMoves);
	const form = useForm<FormType>({
		resolver: zodResolver(
			formSchema.superRefine(({ move }, ctx) => {
				if (!validMoves.includes(move)) {
					ctx.addIssue({
						message: "Illegal move",
						code: "custom",
						path: ["move"],
					});
				}
			}),
		),
	});

	function onSubmit({ move, name }: FormType) {
		const succeeded = addOpening(move, previousMoves, name || undefined);
		if (succeeded) {
			toast.success("Added opening");
		} else {
			toast.error("Opening already exists");
		}
		form.reset({ move: "", name: "" });
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex gap-2 flex-col md:flex-row"
			>
				<FormField
					control={form.control}
					name="move"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Move</FormLabel>
							<FormControl>
								<Input autoCapitalize="none" placeholder="e4" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="flex-grow">
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="King's Pawn Opening" {...field} />
							</FormControl>
							<FormDescription>
								The name of the opening/variation
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					variant="outline"
					className="self-center w-32 md:ml-auto md:flex-grow md:max-w-32"
				>
					Add
				</Button>
			</form>
		</Form>
	);
}
