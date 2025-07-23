"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";

import { HttpMethod } from "@/app/api/clientApi";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCart } from "@/hook/useUpdateCart";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useSiteSettingsStore } from "@/store/site-settings-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getValidateCurrentSession } from "../review/utils";
import BillingAddress from "./BillingAddress";
import ShippingAddress from "./ShippingAddress";
import { AddressDataProps } from "./types";
import { DEFAULT_INFO, formSchema } from "./utils";

type FormValues = z.infer<typeof formSchema>;

const UserAddressInfo = ({ data }: { data: AddressDataProps }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [sessionData, setSessionData] = useState<{ shipTo: any; billTo: any } | undefined>(
		undefined
	);

	const router = useRouter();
	const { updateUserInfo, isLoadingCart, items, sameAsShipping, setSameAsShipping } =
		useCartStore();
	const { syncCurrentCart } = useUpdateCart();
	const { countries } = useSiteSettingsStore();

	const updateUserAddreses = (values: z.infer<typeof formSchema>) => {
		const updateAddress = (
			type: "billing" | "shipping",
			address: typeof values.billingAddress | typeof values.shippingAddress
		) => {
			updateUserInfo(type, {
				firstName: address.firstName,
				lastName: address.lastName,
				companyName: address.companyName,
				address1: address.address1,
				address2: address.address2,
				address3: address.address3,
				address4: address.address4,
				city: address.city,
				state: address.state,
				country: address.country,
				postalCode: address.postalCode,
				fax: address.fax,
				phone: address.phone,
				email: address.email,
			});
		};

		updateAddress("shipping", values.shippingAddress);
		updateAddress("billing", sameAsShipping ? values.shippingAddress : values.billingAddress);
	};

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			shippingAddress: !!sessionData?.shipTo ? sessionData.shipTo : DEFAULT_INFO,
			billingAddress: !!sessionData?.billTo ? sessionData?.billTo : DEFAULT_INFO,
			sameAsShipping: sameAsShipping,
			notes: "",
		},
	});

	const fetchCurrentCart = useCallback(async () => {
		const cart = await syncCurrentCart();
		form.setValue("notes", cart?.notes);
	}, []);

	const fetchCurrentSession = useCallback(async () => {
		setSessionData(await getValidateCurrentSession());
	}, []);

	useEffect(() => {
		form.setValue("shippingAddress", {
			...sessionData?.shipTo,
			country: sessionData?.shipTo?.country?.id,
		});
		form.setValue("billingAddress", {
			...sessionData?.billTo,
			country: sessionData?.billTo?.country?.id,
		});
	}, [sessionData]);

	useEffect(() => {
		if (!isLoadingCart && items.length === 0) {
			router.push("/cart");
		}
	}, [isLoadingCart, items.length, router]);

	useEffect(() => {
		fetchCurrentCart();
		fetchCurrentSession();
	}, [router]);

	async function onSubmit(formEvent: FormEvent<HTMLFormElement>, data: FormValues) {
		formEvent.preventDefault();
		try {
			setIsSubmitting(true);
			// Validate all required fields
			if (data.sameAsShipping) {
				form.setValue("billingAddress", form.getValues("shippingAddress"));
			}

			await form.trigger();
			const firstError = document.querySelector('[aria-invalid="true"]');
			if (firstError) {
				firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
				return;
			}

			updateUserAddreses(data);
			const reqAddNewAddress = await fetch(
				`/api/billtos/${sessionData?.billTo?.id}/shiptos${
					sessionData?.shipTo?.id ? "/" + sessionData?.shipTo?.id : ""
				}`,
				{
					method: sessionData?.shipTo?.id ? "PATCH" : "POST",
					body: JSON.stringify({
						...data.shippingAddress,
						country: {
							...countries.find((c) => c.id === data.shippingAddress.country),
							states: [],
						},
						state: countries
							.find((c) => c.id === data.shippingAddress.country)
							?.states?.find((s) => s.id === data.shippingAddress.state),
					}),
				}
			);
			if (!reqAddNewAddress.ok) return;
			const patchUserInfo = await fetch("/api/cart/current", {
				method: "PATCH",
				body: sameAsShipping
					? JSON.stringify({
							...data,
							billingAddress: {
								...data.shippingAddress,
								country: {
									...countries.find((c) => c.id === data.shippingAddress.country),
									states: [],
								},
								state: countries
									.find((c) => c.id === data.shippingAddress.country)
									?.states?.find((s) => s.id === data.shippingAddress.state),
							},
					  })
					: JSON.stringify({
							...data,
							shippingAddress: {
								...data.shippingAddress,
								country: {
									...countries.find((c) => c.id === data.shippingAddress.country),
									states: [],
								},
								state: countries
									.find((c) => c.id === data.shippingAddress.country)
									?.states?.find((s) => s.id === data.shippingAddress.state),
							},
							billingAddress: {
								...data.billingAddress,
								country: {
									...countries.find((c) => c.id === data.billingAddress.country),
									states: [],
								},
								state: countries
									.find((c) => c.id === data.billingAddress.country)
									?.states?.find((s) => s.id === data.billingAddress.state),
							},
							sameAsShipping: false,
					  }),
			});
			if (!patchUserInfo.ok) return;
			const resPatchUserInfo = JSON.parse(await patchUserInfo.text());

			if (!sameAsShipping) {
				const reqSaveAddressInfo = await fetch(`/api/billtos/${resPatchUserInfo?.billTo?.id}`, {
					method: HttpMethod.PATCH,
					body: JSON.stringify({
						...data.billingAddress,
						country: countries.find((c) => c.id === data.billingAddress.country),
					}),
				});
				if (!reqSaveAddressInfo.ok) return;
			}

			const reqValidate = await fetch("/api/cart/full-validate");
			if (!reqValidate.ok) return;

			router.push("/checkout/review");
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form noValidate onSubmit={(e) => onSubmit(e, form.getValues())} className="space-y-10">
				<ShippingAddress
					data={data.ShipToAddressContainer.ShipToAddresses}
					form={form}
					countriesData={countries}
				/>

				<div className="h-[1px] w-full bg-muted"></div>
				<div className="">
					<h2 className="text-xl font-semibold text-blue mb-4">BILLING ADDRESS</h2>

					<div className="flex items-center space-x-2 mb-4">
						<Checkbox
							id="same-address"
							checked={sameAsShipping}
							onCheckedChange={(checked) => {
								setSameAsShipping(checked as boolean);
							}}
							disabled={true}
						/>
						<label
							htmlFor="same-address"
							className="text-sm font-medium font-lora leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Billing address is the same as Shipping address
						</label>
					</div>

					{!sameAsShipping && (
						<BillingAddress
							data={data.BillToAddressContainer.BillToAddresses}
							form={form}
							countriesData={countries}
						/>
					)}
				</div>
				<div className="h-[1px] w-full bg-muted"></div>
				<div className="">
					<h2 className="text-xl font-semibold text-blue mb-4">ORDER NOTES</h2>
					<FormField
						control={form.control}
						name="notes"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										className="bg-white border border-[#E5E5E5] rounded-none min-h-[120px] px-4 py-3 font-lora"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div>
					<Button
						type="submit"
						formNoValidate
						disabled={isSubmitting}
						buttonLabel="Checkout"
						className={cn(
							"h-14 w-full bg-blue hover:bg-blue/90 text-white py-6 text-lg relative",
							"transition-all duration-200 ease-in-out",
							"active:scale-[0.99] active:bg-blue/80",
							"disabled:opacity-70 disabled:cursor-not-allowed",
							"focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2"
						)}
						aria-busy={isSubmitting}
						aria-disabled={isSubmitting}
					>
						{isSubmitting ? (
							<div className="flex items-center justify-center gap-2">
								<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
								<span>Processing...</span>
							</div>
						) : (
							"CHECKOUT"
						)}
					</Button>
					<div className="font-lora text-sm text-muted mt-4">
						I confirm these personal details and addresses are correct
					</div>
				</div>
			</form>
		</Form>
	);
};

export default UserAddressInfo;
