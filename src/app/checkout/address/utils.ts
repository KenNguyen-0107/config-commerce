import { z } from "zod";

export const DEFAULT_INFO = {
	attention: "",
	firstName: "",
	lastName: "",
	companyName: "",
	email: "",
	state: "",
	fax: "",
	phone: "" as unknown as number,
	address1: "",
	address2: "",
	address3: "",
	address4: "",
	city: "",
	postalCode: "" as unknown as number,
	country: "",
};

export const formSchema = z.object({
	shippingAddress: z.object({
		attention: z.string().optional(),
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		companyName: z.string().min(1, "Company name is required"),
		email: z
			.string()
			.min(1, "Email is required")
			.regex(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Please enter a valid email address"
			),
		state: z.string().optional(),
		fax: z.string().optional(),
		phone: z
			.string()
			.min(1, "Phone is required")
			.regex(/^[0-9\s\-\+]{10,}$/, "Please enter a valid phone number")
			.transform((val) => Number(val)),
		address1: z.string().min(1, "Address line 1 is required"),
		address2: z.string().optional(),
		address3: z.string().optional(),
		address4: z.string().optional(),
		city: z.string().min(1, "City is required"),
		postalCode: z
			.string()
			.min(1, "Postcode is required")
			.transform((val) => Number(val)),
		country: z.string().min(1, "Country is required"),
	}),
	billingAddress: z.object({
		attention: z.string().optional(),
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		companyName: z.string().min(1, "Company name is required"),
		email: z
			.string()
			.min(1, "Email is required")
			.regex(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Please enter a valid email address"
			),
		state: z.string().optional(),
		fax: z.string().optional(),
		phone: z
			.string()
			.min(1, "Phone is required")
			.regex(/^[0-9\s\-\+]{10,}$/, "Please enter a valid phone number")
			.transform((val) => Number(val)),
		address1: z.string().min(1, "Address line 1 is required"),
		address2: z.string().optional(),
		address3: z.string().optional(),
		address4: z.string().optional(),
		city: z.string().min(1, "City is required"),
		postalCode: z
			.string()
			.min(1, "Postcode is required")
			.transform((val) => Number(val)),
		country: z.string().min(1, "Country is required"),
	}),
	sameAsShipping: z.boolean().default(true),
	notes: z.string().optional(),
});