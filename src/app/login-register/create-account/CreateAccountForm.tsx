"use client";

import { HttpMethod } from "@/app/api/clientApi";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { SmartLink } from "@/components/shared/smartLink";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { IAccountSettings } from "../types";

const CreateAccountForm = ({ settings }: { settings: IAccountSettings }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { setUserInfo } = useAuthenStore();
	const router = useRouter();

	const regexValue = () => {
		const regexParts = [];

		if (settings?.PasswordRequiresDigit) {
			regexParts.push("(?=.*[0-9])");
		}
		if (settings?.PasswordRequiresLowercase) {
			regexParts.push("(?=.*[a-z])");
		}
		if (settings?.PasswordRequiresUppercase) {
			regexParts.push("(?=.*[A-Z])");
		}
		if (settings?.PasswordRequiresSpecialCharacter) {
			regexParts.push("(?=.*[^a-zA-Z0-9])");
		}
		if (regexParts.length === 0) {
			return /^.+$/;
		}

		return new RegExp(`^${regexParts.join("")}`);
	};
	const formSchema = z
		.object({
			email: z.string().min(1, "Email is required").email("Invalid email address"),
			userName: z
				.string()
				.min(1, "Username is required")
				.regex(/^\S*$/, "Username cannot contain spaces"),
			password: z
				.string()
				.min(1, "Password is required")
				.min(
					settings.PasswordMinimumRequiredLength || 5,
					`Password must be at least ${settings.PasswordMinimumRequiredLength} characters`
				)
				.regex(regexValue(), "Password must match the requirements"),
			confirmPassword: z.string().min(1, "Confirm password is required"),
			isSubscribed: z.boolean().optional(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords do not match",
			path: ["confirmPassword"],
		});

	type FormValues = z.infer<typeof formSchema>;

	console.log("CreateAccountForm ettings", settings);

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
			const fetchCurrentSession = await fetch("/api/sessions/current");
			const currentSessionData = JSON.parse(await fetchCurrentSession.text());
			if (currentSessionData?.isGuest) {
				const reqDeleteGuestSession = await fetch("/api/sessions/manage", {
					method: HttpMethod.DELETE,
				});
				if (![200, 502].includes(reqDeleteGuestSession.status)) return;
			}

			const reqCreateAccount = await fetch(`/api/account/create`, {
				method: "POST",
				body: JSON.stringify(values),
			});

			if (!reqCreateAccount.ok) {
				const errorMsg = JSON.parse(await reqCreateAccount.text());
				console.log({ errorMsg });
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

			router.push("/my-account");
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
								<FormLabel className="font-bold text-base lg:text-lg text-[#6D6C6F] font-lora">
									Email Address*
								</FormLabel>
								<FormControl>
									<Input
										ariaLabel="Email Address"
										className="h-14 placeholder:text-blue placeholder:opacity-50 mt-2 font-lora"
										placeholder="Enter your email address"
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
								<FormLabel className="font-bold text-base lg:text-lg text-[#6D6C6F] font-lora">
									User Name*
								</FormLabel>
								<FormControl>
									<Input
										ariaLabel="Username"
										className="h-14 placeholder:text-blue placeholder:opacity-50 mt-2 font-lora"
										placeholder="Enter your user name"
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
								<FormLabel className="font-bold text-base lg:text-lg text-[#6D6C6F] font-lora">
									Password*
								</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											ariaLabel="Password"
											type={showPassword ? "text" : "password"}
											className="h-14 placeholder:text-blue placeholder:opacity-50 font-lora hide-password-toggle"
											placeholder="Enter your password"
											{...field}
										/>
										<button
											type="button"
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
											onClick={() => setShowPassword(!showPassword)}
											title="Show password"
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
								<FormLabel className="font-bold text-base lg:text-lg text-[#6D6C6F] font-lora">
									Confirm Password*
								</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											ariaLabel="Confirm Password"
											type={showPassword ? "text" : "password"}
											className="h-14 placeholder:text-blue placeholder:opacity-50 font-lora hide-password-toggle"
											placeholder="Confirm your password"
											{...field}
										/>
										<button
											type="button"
											title="Show password"
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

					{settings?.AllowSubscribeToNewsLetter && (
						<FormField
							control={form.control}
							name="isSubscribed"
							render={({ field }) => (
								<FormItem className="flex items-center gap-2 space-y-0 py-3">
									<FormControl>
										<Checkbox
											className="border-muted rounded"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel className="text-sm cursor-pointer mt-0 text-[#6D6C6F] font-lora">
										Sign me for newsletters and product updates
									</FormLabel>
								</FormItem>
							)}
						/>
					)}

					<Button
						type="submit"
						className="w-full font-frutiger-bold"
						disabled={loading}
						buttonLabel="Creating account"
					>
						{loading ? <LoadingIndicator text="CREATING ACCOUNT..." /> : "CREATE"}
					</Button>
				</form>
			</Form>

			<div className="text-center mt-5">
				<SmartLink href="/login-register" className="inline-flex items-center underline text-blue">
					Back to Login
				</SmartLink>
			</div>
		</div>
	);
};

export default CreateAccountForm;
