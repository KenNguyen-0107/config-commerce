"use client";
import { ICountry } from "@/app/my-account/address/types";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Fragment, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { AddressField } from "./types";
import { formSchema } from "./utils";
// import { AddressField, formSchema } from "./UserAddressInfo";
import { useCheckoutStore } from "@/store/checkout-store";

type FormValues = z.infer<typeof formSchema>;

interface ShippingAddressProps {
	form: UseFormReturn<FormValues>;
	data: AddressField[];
	countriesData: ICountry[];
}

export interface ShippingFormFieldProps {
	name: string;
	label: string;
	isRequired?: boolean;
	isCountry?: boolean;
}

const ShippingAddress = ({ form, data, countriesData }: ShippingAddressProps) => {
	const [listState, setListState] = useState<ICountry[]>([]);
	const { setIsCheckoutPage } = useCheckoutStore();

	useEffect(() => {
		setIsCheckoutPage(true);
		const selectedCountry = countriesData.find(
			(country) => country.id === form.getValues().shippingAddress.country
		);
		setListState(selectedCountry?.states || []);
	}, [form.watch("shippingAddress.country"), countriesData]);

	return (
		<div className="">
			<h2 className="text-xl font-semibold text-blue mb-4">SHIPPING ADDRESS</h2>

			<div className="grid gap-4">
				{data &&
					data.map((item) => (
						<Fragment key={item.FieldName}>
							{item.IsVisible && (
								<div>
									{item.FieldName === "Attention" && (
										<FormField
											control={form.control}
											name="shippingAddress.attention"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														Attention
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={50}
															ariaLabel="Attention"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "CompanyName" && (
										<FormField
											control={form.control}
											name="shippingAddress.companyName"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														Company Name*
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={40}
															required
															ariaLabel="Company Name"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "FirstName" && (
										<FormField
											control={form.control}
											name="shippingAddress.firstName"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														First Name*
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={30}
															ariaLabel="First Name"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "LastName" && (
										<FormField
											control={form.control}
											name="shippingAddress.lastName"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														Last Name*
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={30}
															ariaLabel="Last Name"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "Address1" && (
										<FormField
											control={form.control}
											name="shippingAddress.address1"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														Address line 1*
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={40}
															required
															ariaLabel="Address line 1"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "Address2" && (
										<FormField
											control={form.control}
											name="shippingAddress.address2"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														Address line 2
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={40}
															required
															ariaLabel="Address line 2"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "Address3" && (
										<FormField
											control={form.control}
											name="shippingAddress.address3"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														Address line 3
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={40}
															required
															ariaLabel="Address line 3"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "Address4" && (
										<FormField
											control={form.control}
											name="shippingAddress.address4"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														Address line 4
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={40}
															required
															ariaLabel="Address line 4"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "Country" && (
										<FormField
											control={form.control}
											name="shippingAddress.country"
											render={({ field }) => (
												<FormItem className="flex flex-wrap">
													<div className="flex gap-2 items-center w-full">
														<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora w-32 shrink-0">
															Country*
														</FormLabel>
														<Select
															onValueChange={field.onChange}
															value={field.value || ""}
															required
														>
															<FormControl className="bg-white text-tertiary font-lora">
																<SelectTrigger
																	title="Select country"
																	aria-label="Select country"
																	className="h-14 rounded border border-muted text-sm lg:text-base"
																>
																	<SelectValue placeholder="Select country" />
																</SelectTrigger>
															</FormControl>
															<SelectContent className="bg-white text-tertiary font-lora">
																{countriesData?.map((c) => (
																	<SelectItem key={c.id} value={c.id || ""}>
																		{c.name}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</div>
													<FormMessage className="text-red w-full" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "State" && (
										<FormField
											control={form.control}
											name="shippingAddress.state"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="block text-[#555555] text-lg font-bold">
														State*
													</FormLabel>
													<Select onValueChange={field.onChange} value={field.value} required>
														<FormControl className="bg-white text-tertiary font-lora">
															<SelectTrigger
																title="Select state"
																aria-label="Select state"
																className="h-14 rounded border border-[#8C8B9080] text-base"
															>
																<SelectValue placeholder="Select state" />
															</SelectTrigger>
														</FormControl>
														<SelectContent className="bg-white text-tertiary font-lora">
															{listState?.map((item, index) => (
																<SelectItem key={index} value={item.id || ""}>
																	{item.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "City" && (
										<FormField
											control={form.control}
											name="shippingAddress.city"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														City*
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={30}
															required
															ariaLabel="City"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "PostalCode" && (
										<FormField
											control={form.control}
											name="shippingAddress.postalCode"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														Postal Code*
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={30}
															required
															ariaLabel="Postal Code"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "Phone" && (
										<FormField
											control={form.control}
											name="shippingAddress.phone"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														Phone*
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className="h-14 font-lora"
															maxLength={20}
															required
															ariaLabel="Phone"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
									{item.FieldName === "Email" && (
										<FormField
											control={form.control}
											name="shippingAddress.email"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel className="text-muted text-md lg:text-lg font-bold font-lora">
														Email*
													</FormLabel>
													<FormControl>
														<Input
															type="email"
															className="h-14 font-lora"
															{...field}
															maxLength={50}
															required
															ariaLabel="Email"
														/>
													</FormControl>
													<FormMessage className="text-red" />
												</FormItem>
											)}
										/>
									)}
								</div>
							)}
						</Fragment>
					))}
			</div>
		</div>
	);
};

export default ShippingAddress;
