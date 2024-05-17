import type { Opening } from "@/app/columns";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOpenings } from "@/hooks/useOpenings";
import { SANRegex } from "@/lib/SANRegex";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Edit from "./icons/edit";

const formSchema = z
	.object({
		move: z
			.string()
			.min(2, {
				message: "Chess moves are at least 2 characters",
			})
			.regex(SANRegex, "Invalid move")
			.optional(),
		name: z.string().optional(),
	})
	.refine(({ move, name }) => !!move || !!name, {
		path: ["name"],
		message: "Nothing changed",
	});
type FormType = z.infer<typeof formSchema>;

type Props = {
	opening: Opening;
	validMoves: string[];
};

export function EditOpeningForm({ opening, validMoves }: Props) {
	const [open, setOpen] = useState(false);
	const { editOpening } = useOpenings(opening.previousMoves);
	const form = useForm<FormType>({
		resolver: zodResolver(
			formSchema.superRefine(({ move }, ctx) => {
				if (!validMoves.includes(move ?? "")) {
					ctx.addIssue({
						message: "Illegal move",
						code: "custom",
						path: ["move"],
					});
				}
			}),
		),
		defaultValues: {
			name: opening.name,
			move: opening.move,
		},
	});
	function onSubmit({ move, name }: FormType) {
		const succeeded = editOpening({
			...opening,
			...(move && { move }),
			...(name !== undefined && { name }),
		});
		if (succeeded) {
			setOpen(false);
			toast.success("Edited opening");
		} else {
			toast.error("Opening already exists");
		}
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="icon" variant="ghost">
					<span className="sr-only">Edit</span>
					<Edit />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit {opening.name || opening.move}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex gap-2 flex-col"
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
								<FormItem>
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
						<DialogFooter>
							<Button type="submit" variant="outline">
								Save changes
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
