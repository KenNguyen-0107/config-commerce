"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/cart-store";
import useCurrentOrderStore from "@/store/current-order-store";
import { useYourOrderStore } from "@/store/your-order-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp, Edit2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CartLine } from "@/components/widgets/Product/types";
import { getValidateCurrentSession } from "./utils";

export const formSchema = z.object({
	cardName: z.string().min(1, "Card Name required"),
	cardNumber: z.string().min(1, "Card Number required"),
	cardType: z.string().min(1, "Card Type required"),
	expirationMonth: z.string().min(1, "Expiration Month required"),
	expirationYear: z.string().min(1, "Expiration Year required"),
	securityCode: z.string().min(1, "Security Code required"),
	paymentMethod: z.string().min(1, "Payment Method required"),
	PONumber: z.string().min(1, "PO Number required"),
});
type FormValues = z.infer<typeof formSchema>;

const PaymentDetail = () => {
	const [paymentMethod, setPaymentMethod] = useState<string>("");
	const [billingShippingOpen, setBillingShippingOpen] = useState(false);
	const { userInfo, updatePaymentCardInfo, updatePrice } = useCartStore();
	const { setCurrentOrder } = useCurrentOrderStore();
	const { updateYourOrder } = useYourOrderStore();
	const router = useRouter();
	const [isPending, setIsPending] = useState(false)

	const handleSubmitPayment = (values: z.infer<typeof formSchema>) => {
		updatePaymentCardInfo({
			cardName: values.cardName,
			cardNumber: values.cardNumber,
			cardType: values.cardType,
			expirationMonth: values.expirationMonth,
			expirationYear: values.expirationYear,
			securityCode: values.securityCode,
			paymentMethod: values.paymentMethod,
			PONumber: values.PONumber,
		});
	};

	const defaultCardDetail = {
		cardName: "",
		cardNumber: "",
		cardType: "",
		expirationMonth: "",
		expirationYear: "",
		securityCode: "",
		paymentMethod: "",
		PONumber: "",
	};

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultCardDetail,
	});

	async function onSubmit(
		e: React.FormEvent<HTMLFormElement>,
		cartData: FormValues
	) {
		e.preventDefault();
		try {
			const result = await form.trigger();
			if (!result) {
				// If validation fails, scroll to the first error
				const firstError = document.querySelector('[aria-invalid="true"]');
				firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
				return;
			}

			handleSubmitPayment(cartData);
			setIsPending(true)
			const sessionData = await getValidateCurrentSession();

			// full validate cart
			const reqFullValidateCart = await fetch("/api/cart/full-validate", { method: "GET" });
			if (reqFullValidateCart.status !== 200) return;
			const dataSummary: {
				billTo: {
					id: string;
				};
				shipTo: {
					id: string;
				};
				trackId: string;
				cartLines: CartLine[];
				shipVia: {
					id: string,
					description: string,
					isDefault: boolean
				}
			} = JSON.parse(await reqFullValidateCart.text());

			setCurrentOrder({
				id: dataSummary.billTo.id,
			});


			await fetch("/api/sessions/manage", {
				method: "POST",
				body: JSON.stringify({
					password: sessionData.password,
					email: sessionData.email,
					isSubscribed: sessionData.isSubscribed,
					userName: sessionData.userName,
				}),
			});

			const patchUserInfo = await fetch("/api/cart/current", {
				method: "PATCH",
				body: JSON.stringify({
					...cartData,
					...dataSummary,
					shipVia: dataSummary.shipVia,
					billToId: dataSummary.billTo.id,
					shipToId: dataSummary.shipTo.id,
					billTo: {
						id: dataSummary.billTo.id
					},
					status: "Submitted",
					paymentMethod: {
						name: cartData.paymentMethod,
						description: cartData.paymentMethod,
						isCreditCard: cartData.paymentMethod === "CC",
						isECheck: false,
						isPaymentProfile: false,
						isPaymentProfileExpired: false,
					},
					poNumber: cartData.PONumber,
					paymentOptions: {
						creditCard: {
							cardType: cartData.cardType,
							cardHolderName: cartData.cardName,
							cardNumber: cartData.cardNumber,
							expirationMonth: parseInt(cartData.expirationMonth, 10),
							expirationYear: parseInt(cartData.expirationYear, 10),
							securityCode: cartData.securityCode,
							useBillingAddress: true,
						}
					}
				}),
			});

			const orderInfo: {
				orderDate: string;
				orderNumber: string;
				status: string;
			} = JSON.parse(await patchUserInfo.text());

			updateYourOrder({
				orderDate: orderInfo.orderDate,
				orderCode: orderInfo.orderNumber,
				status: orderInfo.status,
				cartLines: dataSummary.cartLines
			});

			if (patchUserInfo.status !== 200) return;
			await fetch("/api/cart/full-validate");
			const reqUpdateOrder = await fetch(
				`/api/cart/${dataSummary.trackId}`
			)

			if (reqUpdateOrder.status !== 200) return;
			const finalOrderData = JSON.parse(await reqUpdateOrder.text())
			updatePrice({
				shippingFee: finalOrderData.shippingAndHandlingDisplay,
				subTotal: finalOrderData.orderSubTotalDisplay,
				totalIncVat: finalOrderData.orderGrandTotalDisplay
			})
			return router.push("/checkout/thank-your-order");
		} catch (error) {
			console.error("Error:", error);
			setIsPending(false)

		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => onSubmit(e, form.getValues())}
				className="space-y-8"
			>
				<div>
					<div className="mb-6">
						<h3 className="text-duck text-xl font-bold mb-4">
							PAYMENT DETAILS
						</h3>
						<div className="flex flex-col md:flex-row gap-4 mb-4">
							<div className="w-full md:w-1/2">
								<FormField
									control={form.control}
									name="paymentMethod"
									render={({ field }) => (
										<FormItem className="space-y-0">
											<FormLabel className="text-muted text-lg font-lora font-bold mb-2 block">
												Payment Method*
											</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
													setPaymentMethod(value);
												}}
												defaultValue={field.value}
												required
											>
												<FormControl className="bg-white mt-0">
													<SelectTrigger className="bg-white text-tertiary font-lora space-y-0 border-secondary-background h-14 rounded-non">
														<SelectValue placeholder="Select method" />
													</SelectTrigger>
												</FormControl>
												<SelectContent className="bg-white text-tertiary font-lora border border-muted/50">
													<SelectItem value="CC">
														Credit Card
													</SelectItem>
													{/* <SelectItem value="PC">
														Payment Card
													</SelectItem> */}
												</SelectContent>
											</Select>
											<FormMessage className="text-red" />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="PONumber"
								render={({ field }) => (
									<FormItem className="w-full md:w-1/2">
										<FormLabel className="text-muted text-lg font-lora font-bold mb-2 block">
											PO Number*
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="bg-white border-secondary-background h-14 rounded-none"
												maxLength={40}
												required
											/>
										</FormControl>
										<FormMessage className="text-red" />
									</FormItem>
								)}
							/>
						</div>
					</div>
					{paymentMethod && (
						<div className="mb-6">
							<h3 className="text-duck text-lg font-bold mb-4">YOUR DETAILS</h3>
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="cardName"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel className="text-muted text-lg font-lora font-bold mb-2 block">
												Card Name*
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="bg-white border-secondary-background h-14 rounded-none"
													maxLength={40}
													required
												/>
											</FormControl>
											<FormMessage className="text-red" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="cardNumber"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel className="text-muted text-lg font-lora font-bold mb-2 block">
												Card Number*
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="bg-white border-secondary-background h-14 rounded-none"
													maxLength={40}
													required
												/>
											</FormControl>
											<FormMessage className="text-red" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="cardType"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel className="text-muted text-lg font-lora font-bold mb-2 block">
												Card Type*
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												required
											>
												<FormControl className="bg-white">
													<SelectTrigger className="bg-white border-secondary-background h-14 rounded-non">
														<SelectValue placeholder="Select card" />
													</SelectTrigger>
												</FormControl>
												<SelectContent className="bg-white">
													<SelectItem value="visa">Visa</SelectItem>
													<SelectItem value="mastercard">Mastercard</SelectItem>
													<SelectItem value="amex">American Express</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage className="text-red" />
										</FormItem>
									)}
								/>
								<div className="flex gap-4">
									<div className="w-1/2">
										<FormField
											control={form.control}
											name="expirationMonth"
											render={({ field }) => (
												<FormItem className="">
													<FormLabel className="text-muted text-lg font-lora font-bold mb-2 block">
														Expiration Month*
													</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
														required
													>
														<FormControl className="bg-white">
															<SelectTrigger className="bg-white border-secondary-background h-14 rounded-none">
																<SelectValue placeholder="Select" />
															</SelectTrigger>
														</FormControl>
														<SelectContent className="bg-white text-tertiary font-lora">
															<SelectItem value="1">January</SelectItem>
															<SelectItem value="2">February</SelectItem>
															<SelectItem value="3">March</SelectItem>
															<SelectItem value="4">April</SelectItem>
															<SelectItem value="5">May</SelectItem>
															<SelectItem value="6">June</SelectItem>
															<SelectItem value="7">July</SelectItem>
															<SelectItem value="8">August</SelectItem>
															<SelectItem value="9">
																September
															</SelectItem>
															<SelectItem value="10">October</SelectItem>
															<SelectItem value="11">November</SelectItem>
															<SelectItem value="12">December</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									</div>
									<div className="w-1/2">
										<FormField
											control={form.control}
											name="expirationYear"
											render={({ field }) => (
												<FormItem className="">
													<FormLabel className="text-muted text-lg font-lora font-bold mb-2 block">
														Expiration Year*
													</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
														required
													>
														<FormControl className="bg-white">
															<SelectTrigger className="bg-white border-secondary-background h-14 rounded-none">
																<SelectValue placeholder="Select" />
															</SelectTrigger>
														</FormControl>
														<SelectContent className="bg-white text-tertiary font-lora">
															<SelectItem value="2023">2023</SelectItem>
															<SelectItem value="2024">2024</SelectItem>
															<SelectItem value="2025">2025</SelectItem>
															<SelectItem value="2026">2026</SelectItem>
															<SelectItem value="2027">2027</SelectItem>
															<SelectItem value="2028">2028</SelectItem>
															<SelectItem value="2029">2029</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									</div>
								</div>
								<FormField
									control={form.control}
									name="securityCode"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel className="text-muted text-lg font-lora font-bold mb-2 block">
												Security code*
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="bg-white border-secondary-background h-14 rounded-none"
													maxLength={40}
													required
												/>
											</FormControl>
											<FormMessage className="text-red" />
										</FormItem>
									)}
								/>
							</div>

							{/* Billing & Shipping Information */}
						</div>
					)}
					<div className="mt-6">
						<button
							className="w-full bg-secondary-background flex items-center justify-between p-3"
							onClick={() => setBillingShippingOpen(!billingShippingOpen)}
						>
							<span className="text-blue text-lg font-bold">
								BILLING & SHIPPING INFORMATION
							</span>
							{billingShippingOpen ? (
								<ChevronUp className="h-4 w-4 text-tertiary" />
							) : (
								<ChevronDown className="h-4 w-4 text-tertiary" />
							)}
						</button>

						{billingShippingOpen && (
							<div className="border border-secondary-background border-t-0 p-4 bg-white">
								<div className="flex justify-between mb-4">
									<div>
										<div className="text-blue font-bold mb-1">CARRIER</div>
										<p className="text-tertiary font-lora">Flat Rate</p>
									</div>
									<div>
										<div className="text-blue font-bold mb-1">SERVICE</div>
										<p className="text-tertiary font-lora">Flat Rate</p>
									</div>
								</div>

								<div className="mb-4">
									<div className="flex justify-between items-start">
										<h4 className="text-blue font-bold mb-1">
											SHIPPING ADDRESS
										</h4>
										<Link
											href="/checkout/address"
											className="text-blue flex items-center"
										>
											<Edit2 className="h-3 w-3 mr-1" />
											EDIT
										</Link>
									</div>
									<div className="text-tertiary font-lora space-y-1">
										{userInfo.shipping &&
											Object.values(userInfo.shipping).map((item, index) => {
												return <p key={index}>{item}</p>;
											})}
									</div>
								</div>

								<div>
									<div className="flex justify-between items-start">
										<h4 className="text-blue font-bold mb-1">
											BILLING ADDRESS
										</h4>
										<Link
											href="/checkout/address"
											className="text-blue flex items-center"
										>
											<Edit2 className="h-3 w-3 mr-1" />
											EDIT
										</Link>
									</div>
									<div className="text-tertiary font-lora space-y-1">
										{userInfo.shipping &&
											Object.values(userInfo.billing).map((item, index) => {
												return <p key={index}>{item}</p>;
											})}
									</div>
								</div>
							</div>
						)}
					</div>
					<Button
						formNoValidate
						type="submit"
						disabled={isPending}
						className="w-full bg-tertiary hover:bg-[#011e41] text-white rounded-none h-14 mt-6"
					>
						{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						PLACE ORDER
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default PaymentDetail;
