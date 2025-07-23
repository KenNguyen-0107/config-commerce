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
import { useOrderHistoryStore } from "@/store/order-history-store";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { useUpdateCart } from "@/hook/useUpdateCart";
import { useCheckoutStore } from "@/store/checkout-store";

const formSchema = z.object({
	username: z
		.string()
		.min(1, "Username is required")
		.regex(/^\S*$/, "Username cannot contain spaces"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters"),
	rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SignInExistingAccount: React.FC<SignInExistingAccountProps> = (props) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
	const [loading, setLoading] = useState(false);
	const { userInfo, setUserInfo, setIsLogin } = useAuthenStore();
	const router = useRouter();
	const { storeCurrentShipping, storeCurrentBilling } = useOrderHistoryStore();
	const { Settings } = props;
	const { syncCurrentCart } = useUpdateCart();
	const { isCheckoutPage } = useCheckoutStore();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
			rememberMe: false,
		},
	});

	const cartExpandedUrl =
		"/api/cart/current?expand=shipping,validation,cartLines,restrictions,carriers,paymentOptions,costCodes,tax&forceRecalculation=true&allowInvalidAddress=true";
	const cartCurrentUrl = "/api/cart/current";
	const createSessionUrl = "/api/sessions/manage";
	const currentSessionUrl = "/api/sessions/current";

	const onSubmit = async (values: FormValues) => {
		setLoading(true);
		try {
			if (isCheckoutPage) {
				const tokenResponse = await fetch("/api/auth/token", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: values.username,
						password: values.password,
					}),
				});

				if (!tokenResponse.ok) {
					return onError(tokenResponse);
				}

				const cartExpanded = await fetch(cartExpandedUrl);
				const result = await cartExpanded.json();
				const patchUserInfo = await fetch(cartCurrentUrl, {
					method: "PATCH",
					body: JSON.stringify(result),
				});
				if (!patchUserInfo.ok) {
					return onError(patchUserInfo);
				}

				const reqDeleteCart = await fetch(currentSessionUrl, {
					method: HttpMethod.DELETE,
				});
				if (!reqDeleteCart.ok) {
					return onError(reqDeleteCart);
				}
			}

			const createSession = await fetch(createSessionUrl, {
				method: HttpMethod.POST,
				body: JSON.stringify(values),
			});
			if (!createSession.ok) {
				return onError(createSession);
			}

			const reqCurrentSession = await fetch(currentSessionUrl);
			if (!reqCurrentSession.ok) {
				return onError(reqCurrentSession);
			}

			const userData = JSON.parse(await reqCurrentSession.text());
			storeCurrentShipping(userData.shipTo);
			storeCurrentBilling(userData.billTo);

			setUserInfo({
				userName: userData.userName,
				userProfileId: userData.userProfileId,
				userLabel: userData.userLabel,
				email: userData.email,
				currency: userData.currency.currencySymbol,
				billTo: userData.billTo.id,
			});
			setIsLogin(true);
			syncCurrentCart();
			if (reqCurrentSession.status === 200) {
				return router.back();
			}
		} finally {
			setLoading(false);
		}
	};

	const onError = async (response: Response) => {
		const responseData = JSON.parse(await response.text());
		const errorMsg = JSON.parse(responseData.details).message || "Something went wrong";
		return toast(errorMsg, {
			type: "error",
		});
	};

	useEffect(() => {
		if (!!userInfo.userProfileId) {
			router.push("/");
		}
	}, [router, userInfo]);

	return (
		<>
			<div className="pb-10 lg:pb-0 lg:pr-20">
				<h2 className="text-blue mb-6">ALREADY HAVE AN ACCOUNT?</h2>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:space-y-4">
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
											ariaLabel="Username"
											placeholder="Enter your user name"
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
									<FormLabel className="font-semibold text-lg text-[#6D6C6F] font-lora">
										Password*
									</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												ariaLabel="Password"
												type={showPassword ? "text" : "password"}
												placeholder="Enter your password"
												className="h-14 placeholder:text-blue placeholder:opacity-50 font-lora hide-password-toggle"
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
							{Settings?.AccountSettings?.RememberMe && (
								<FormField
									control={form.control}
									name="rememberMe"
									render={({ field }) => (
										<FormItem className="flex items-center gap-2 space-y-0">
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
							)}

							<button
								type="button"
								onClick={() => setShowForgotPasswordForm(true)}
								className="text-blue text-sm underline"
								disabled={loading}
								title="Forgot password"
							>
								FORGOT PASSWORD?
							</button>
						</div>

						<Button type="submit" className="w-full" disabled={loading} buttonLabel="Sign in">
							{loading ? <LoadingIndicator text="SIGNING IN..." /> : "SIGN IN"}
						</Button>
					</form>
				</Form>
			</div>

			<ForgotPasswordForm open={showForgotPasswordForm} onOpenChange={setShowForgotPasswordForm} />
		</>
	);
};

export default SignInExistingAccount;
