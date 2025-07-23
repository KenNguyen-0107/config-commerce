"use client";

import LoadingIndicator from "@/components/common/LoadingIndicator";
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
import { useSiteSettingsStore } from "@/store/site-settings-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IAddress, ICountry } from "./types";
interface CreateAddressModalProps {
	isOpen: boolean;
	isLoading: boolean;
	onClose: () => void;
	onSave: () => void;
	initialData?: IAddress;
	mode: "create" | "edit shipping" | "edit billing";
}
type FormValues = z.infer<typeof formSchema>;

export const formSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	attention: z.string().optional(),
	companyName: z.string().min(1, "Company is required"),
	address1: z.string().min(1, "Address 1 is required"),
	address2: z.string().optional(),
	email: z
		.string()
		.min(1, "Email is required")
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Please enter a valid email address"
		),
	state: z.string().min(1, "State is required"),
	city: z.string().min(1, "City is required"),
	postalCode: z
		.string()
		.min(1, "Postal Code is required")
		.transform((val) => Number(val)), // transform string to number
	country: z.string().min(1, "Country is required"),
	phone: z
		.string()
		.min(1, "Phone is required")
		.regex(/^[0-9\s\-\+]{10,}$/, "Please enter a valid phone number")
		.transform((val) => Number(val)),
});

export default function CreateAddressModal({
	isOpen,
	onClose,
	onSave,
	isLoading,
	initialData = {},
	mode = "create",
}: CreateAddressModalProps) {
	const { countries } = useSiteSettingsStore();
	const [listState, setListState] = useState<ICountry[]>([]);
	const [isSaving, setIsSaving] = useState(false);

	const modalTitle = mode === "create" ? "CREATE A NEW ADDRESS" : "EDIT ADDRESS";
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: initialData?.firstName || "",
			lastName: initialData?.lastName || "",
			companyName: initialData?.companyName || "",
			email: initialData?.email || "",
			state: initialData?.state?.id || "",
			attention: initialData?.attention || "",
			address1: initialData?.address1 || "",
			address2: initialData?.address2 || "",
			city: initialData?.city || "",
			postalCode: initialData?.postalCode || ("" as any),
			country: initialData?.country?.id || "",
			phone: initialData?.phone || ("" as unknown as number),
		},
	});

	useEffect(() => {
		const selectedCountry = countries.find((country) => country.id === form.getValues().country);
		setListState(selectedCountry?.states || []);
	}, [form.watch("country"), countries]);

	useEffect(() => {
		// Prevent scrolling when modal is open by setting overflow on html element
		if (isOpen) {
			document.documentElement.style.overflow = "hidden";
			document.body.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
		}

		return () => {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const addNewAddress = async (formData: FormValues) => {
		setIsSaving(true);
		const reqGetCurrentBillTo = await fetch("/api/billtos/current");
		if (!reqGetCurrentBillTo.ok) {
			throw new Error("Failed to fetch current bill to");
		}
		const getCountryData = () => {
			const res = countries.find((item) => item.id === formData.country);
			return { ...res, states: [] };
		};

		const getStatesData = () => {
			return listState.find((item) => item.id === formData.state);
		};

		const currentBillToId = JSON.parse(await reqGetCurrentBillTo.text()).id;
		const url = () => {
			if (mode === "create") return `/api/billtos/${currentBillToId}/shiptos`;
			if (mode === "edit shipping")
				return `/api/billtos/${currentBillToId}/shiptos/${initialData.id}`;
			return `/api/billtos/${currentBillToId}`;
		};

		const reqAddNewAddress = await fetch(url(), {
			method: mode === "create" ? "POST" : "PATCH",
			body: JSON.stringify({
				...formData,
				state: getStatesData(),
				country: getCountryData(),
				id: mode === "create" ? "Create New Address" : initialData.id,
			}),
		});

		if (!reqAddNewAddress.ok) {
			throw new Error("Failed to add new address");
		}

		const fetchCurrentSession = await fetch("/api/sessions/current");
		if (!fetchCurrentSession.ok) {
			// redirect to login page
			throw new Error("Failed to fetch current session");
		}
		setIsSaving(false);

		onSave();
	};

	async function onSubmit(formEvent: FormEvent<HTMLFormElement>, data: FormValues) {
		formEvent.preventDefault();
		try {
			const result = await form.trigger();
			if (!result) {
				// If validation fails, scroll to the first error
				const firstError = document.querySelector('[aria-invalid="true"]');
				firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
				return;
			}
			addNewAddress(data);
		} catch (error) {}
	}

	return (
		<Form {...form}>
			<form noValidate onSubmit={(e) => onSubmit(e, form.getValues())} className="space-y-10">
				<div className="fixed font-lora inset-0 bg-black bg-opacity-50 z-50 flex flex-col lg:items-center justify-center p-0 lg:p-4">
					<div className="bg-white lg:rounded w-full h-full lg:w-full lg:max-w-3xl lg:max-h-[90vh] overflow-y-auto">
						<div className="px-6 py-10 lg:py-8 space-y-6 relative">
							<button
								onClick={onClose}
								className="text-blue absolute top-5 right-5"
								title="Close modal"
							>
								<X size={36} />
							</button>

							<div className="flex justify-between items-center mb-6">
								<h2 className="text-blue text-2xl lg:text-3xl font-frutiger-bold">{modalTitle}</h2>
							</div>

							<div className="space-y-4">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="block text-[#555555] text-lg font-bold">
													First Name
												</FormLabel>
												<FormControl>
													<Input {...field} className="h-14 border-[#8C8B9080]" maxLength={40} />
												</FormControl>
												<FormMessage className="text-red" />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="block text-[#555555] text-lg font-bold">
													Last Name
												</FormLabel>
												<FormControl>
													<Input {...field} className="h-14 border-[#8C8B9080]" maxLength={40} />
												</FormControl>
												<FormMessage className="text-red" />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="companyName"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel className="block text-[#555555] text-lg font-bold">
												Company Name*
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="h-14 border-[#8C8B9080]"
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
									name="address1"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel className="block text-[#555555] text-lg font-bold">
												Address 1*
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="h-14 border-[#8C8B9080]"
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
									name="address2"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel className="block text-[#555555] text-lg font-bold">
												Address 2
											</FormLabel>
											<FormControl>
												<Input {...field} className="h-14 border-[#8C8B9080]" maxLength={40} />
											</FormControl>
											<FormMessage className="text-red" />
										</FormItem>
									)}
								/>

								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
									<FormField
										control={form.control}
										name="country"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="block text-[#555555] text-lg font-bold">
													Country*
												</FormLabel>
												<Select onValueChange={field.onChange} value={field.value} required>
													<FormControl className="bg-white text-tertiary font-lora">
														<SelectTrigger
															title="Select country"
															aria-label="Select country"
															className="h-14 rounded border border-[#8C8B9080] text-base"
														>
															<SelectValue placeholder="Select country" />
														</SelectTrigger>
													</FormControl>
													<SelectContent className="bg-white text-tertiary font-lora">
														{countries &&
															countries.map((item, index) => (
																<SelectItem key={index} value={item.id}>
																	{item.name || ""}
																</SelectItem>
															))}
													</SelectContent>
												</Select>
												<FormMessage className="text-red" />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="city"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="block text-[#555555] text-lg font-bold">
													City*
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														className="h-14 border-[#8C8B9080]"
														maxLength={40}
														required
													/>
												</FormControl>
												<FormMessage className="text-red" />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
									<FormField
										control={form.control}
										name="state"
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
														{listState &&
															listState.map((item, index) => (
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
									<FormField
										control={form.control}
										name="postalCode"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="block text-[#555555] text-lg font-bold">
													Postal Code*
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														className="h-14 border-[#8C8B9080]"
														maxLength={40}
														required
													/>
												</FormControl>
												<FormMessage className="text-red" />
											</FormItem>
										)}
									/>
								</div>
								<div className="mb-6">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="block text-[#555555] text-lg font-bold">
													Email*
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														className="h-14 border-[#8C8B9080]"
														maxLength={40}
														required
													/>
												</FormControl>
												<FormMessage className="text-red" />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel className="block text-[#555555] text-lg font-bold">
												Phone*
											</FormLabel>
											<FormControl>
												<Input {...field} className="h-14 border-[#8C8B9080]" maxLength={40} />
											</FormControl>
											<FormMessage className="text-red" />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<Button
									type="button"
									variant="secondary"
									onClick={onClose}
									className="w-full border-blue rounded-none h-14 font-frutiger-bold"
									buttonLabel="Cancel"
								>
									CANCEL
								</Button>

								<Button
									formNoValidate
									type="submit"
									disabled={isLoading || isSaving}
									className="w-full hover:bg-[#011e41] text-white rounded-none h-14 font-frutiger-bold"
									buttonLabel="Save"
								>
									{isLoading || isSaving ? <LoadingIndicator text="SAVING..." /> : "SAVE"}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}
