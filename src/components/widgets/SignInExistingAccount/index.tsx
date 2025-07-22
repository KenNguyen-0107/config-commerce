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
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { SignInExistingAccountProps } from "./types";

const formSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SignInExistingAccount: React.FC<SignInExistingAccountProps> = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
	const [loading, setLoading] = useState(false);
	const { userInfo, setUserInfo } = useAuthenStore();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
			rememberMe: false,
		},
	});

	const onSubmit = async (values: FormValues) => {
		setLoading(true);

		try {
			const createSession = await fetch(`/api/sessions/manage`, {
				method: HttpMethod.POST,
				body: JSON.stringify(values),
			});

			if (!createSession.ok) {
				onError();
			}

			const reqCurrentSession = await fetch("/api/sessions/current");
			if (!reqCurrentSession.ok) {
				onError();
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
		} catch (err) {
			toast("Error creating account", {
				type: "success",
			});
			console.error("Error creating account:", err);
		} finally {
			setLoading(false);
		}
	};

	const onError = () => {
		toast("Error logging in", {
			type: "error",
		});
		throw new Error("Failed to log in");
	};

	useEffect(() => {
		if (!!userInfo.userProfileId) {
			router.push("/");
		}
	}, [router, userInfo]);

	return (
		<>
			<div className="pb-10 lg:pb-0 lg:pr-20 border-r-0 border-b lg:border-b-0 lg:border-r border-muted">
				<h2 className="text-blue mb-6">ALREADY HAVE AN ACCOUNT?</h2>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-lg text-[#6D6C6F] font-lora">
										User Name*
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your user name"
											className="h-14 placeholder:text-blue placeholder:opacity-50 mt-2"
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
									<FormLabel className="font-semibold text-lg text-[#6D6C6F] font-lora">
										Password*
									</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={showPassword ? "text" : "password"}
												placeholder="Enter your password"
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

						<div className="flex items-center justify-between">
							<FormField
								control={form.control}
								name="rememberMe"
								render={({ field }) => (
									<FormItem className="flex items-center gap-2">
										<FormControl>
											<Checkbox
												className="border-muted rounded"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel className="text-sm font-lora cursor-pointer text-[#6D6C6F]">
											Remember Me
										</FormLabel>
									</FormItem>
								)}
							/>

							<button
								type="button"
								onClick={() => setShowForgotPasswordForm(true)}
								className="text-blue text-sm font-medium underline"
								disabled={loading}
							>
								FORGOT PASSWORD?
							</button>
						</div>

						<Button type="submit" className="w-full">
							SIGN IN
						</Button>
					</form>
				</Form>
			</div>

			<ForgotPasswordForm
				open={showForgotPasswordForm}
				onOpenChange={setShowForgotPasswordForm}
			/>
		</>
	);
};

export default SignInExistingAccount;
