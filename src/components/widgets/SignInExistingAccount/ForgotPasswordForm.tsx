"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	username: z.string().min(1, "Username is required"),
});
type FormValues = z.infer<typeof formSchema>;

interface ForgotPasswordFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function ForgotPasswordForm({
	open,
	onOpenChange,
}: ForgotPasswordFormProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	function onSubmit(values: FormValues) {
		console.log(values);
		onOpenChange(false);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[480px] bg-white space-y-8 gap-0">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold text-blue uppercase">
						Reset password
					</DialogTitle>
				</DialogHeader>
				<p className="text-blue text-base lg:text-lg font-lora">Enter your username and we’ll send you an email that will allow you to reset your password</p>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-lg text-[#6D6C6F] font-lora">
										User Name
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your user name"
											className="h-14 placeholder:text-blue placeholder:opacity-50 rounded mt-2"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4 mt-8">
							<Button
								type="button"
								variant="secondary"
								onClick={() => onOpenChange(false)}
								className="w-full border-blue"
							>
								return to sign in
							</Button>
							<Button type="submit" className="w-full">send e-mail</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
