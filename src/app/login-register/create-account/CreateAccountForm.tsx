"use client";

import { HttpMethod } from "@/app/api/clientApi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthenStore from "@/store/authen-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z
	.object({
		email: z.string()
			.min(1, "Email is required")
			.email("Invalid email address"),
		userName: z.string()
			.min(1, "Username is required")
			.regex(/^\S*$/, "Username cannot contain spaces"),
		password: z.string()
			.min(1, "Password is required")
			.min(8, "Password must be at least 8 characters")
			.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/, 
				"Password must match the requirements"),
		confirmPassword: z.string().min(1, "Confirm password is required"),
		isSubscribed: z.boolean().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type FormValues = z.infer<typeof formSchema>;

const CreateAccountForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { setUserInfo } = useAuthenStore();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			userName: "",
			password: "",
			confirmPassword: "",
			isSubscribed: false,
		},
	});

	const onSubmit = async (values: FormValues) => {
		setLoading(true);

		try {
			const reqCreateAccount = await fetch(`/api/account/create`, {
				method: "POST",
				body: JSON.stringify(values),
			});

			if (!reqCreateAccount.ok) {
				const errorMsg = JSON.parse(await reqCreateAccount.text());
				console.log({errorMsg})
				return onError(JSON.parse(errorMsg.details)?.message);
			}

			const createSession = await fetch("/api/sessions/manage", {
				method: HttpMethod.POST,
				body: JSON.stringify(values),
			});

			if (!createSession.ok) {
				return onError();
			}

			const reqCurrentSession = await fetch("/api/sessions/current");
			if (!reqCurrentSession.ok) {
				return onError();
			}

			const userData = JSON.parse(await reqCurrentSession.text());

			setUserInfo({
				userName: userData.userName,
				userProfileId: userData.userProfileId,
				userLabel: userData.userLabel,
				email: userData.email,
				currency: userData.currency.currencySymbol,
			});

			router.back();
		} finally {
			setLoading(false);
		}
	};

	const onError = (msg?: string) => {
		toast(msg || "Something went wrong", {
			type: "error",
		});
	};

	return (
		<div className="pb-10 lg:pb-0 lg:pr-20 border-r-0 border-b lg:border-b-0 lg:border-r border-muted">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold text-lg text-[#6D6C6F]">
									Email Address*
								</FormLabel>
								<FormControl>
									<Input
										className="h-14 placeholder:text-blue placeholder:opacity-50 mt-2 font-lora"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="userName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold text-lg text-[#6D6C6F]">
									User Name*
								</FormLabel>
								<FormControl>
									<Input
										className="h-14 placeholder:text-blue placeholder:opacity-50 mt-2 font-lora"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold text-lg text-[#6D6C6F]">
									Password*
								</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											className="h-14 placeholder:text-blue placeholder:opacity-50"
											{...field}
										/>
										<button
											type="button"
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOffIcon className="h-5 w-5" color="#283270" />
											) : (
												<EyeIcon className="h-5 w-5" color="#283270" />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold text-lg text-[#6D6C6F]">
									Password*
								</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											className="h-14 placeholder:text-blue placeholder:opacity-50 font-lora"
											{...field}
										/>
										<button
											type="button"
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOffIcon className="h-5 w-5" color="#283270" />
											) : (
												<EyeIcon className="h-5 w-5" color="#283270" />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="isSubscribed"
						render={({ field }) => (
							<FormItem className="flex items-center gap-2">
								<FormControl>
									<Checkbox
										className="border-muted rounded"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormLabel className="text-sm cursor-pointer mt-0 text-[#6D6C6F]">
									Sign me for newsletters and product updates
								</FormLabel>
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full font-frutiger-bold" disabled={loading}>
						CREATE
					</Button>
				</form>
			</Form>

			<div className="text-center mt-5">
				<Link href="/login-register" className="text-duck inline-flex items-center underline hover:text-blue">
					Back to Login
				</Link>
			</div>
		</div>
	);
};

export default CreateAccountForm;
