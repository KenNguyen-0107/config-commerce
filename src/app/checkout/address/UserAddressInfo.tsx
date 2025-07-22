"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BillingAddress from "./BillingAddress";
import ShippingAddress from "./ShippingAddress";

export const formSchema = z.object({
  shippingAddress: z.object({
    title: z.string(),
    firstName: z.string(),
    surName: z.string(),
    companyName: z.string(),
    email: z.string()
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
    addressLine1: z.string(),
    addressLine2: z.string(),
    addressLine3: z.string().optional(),
    addressLine4: z.string().optional(),
    townCity: z.string(),
    postCode: z
      .string()
      .transform((val) => Number(val)), // transform string to number
    country: z.string(),
  }),
  billingAddress: z.object({
    title: z.string(),
    firstName: z.string(),
    surName: z.string(),
    companyName: z.string(),
    email: z.string()
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
    addressLine1: z.string(),
    addressLine2: z.string(),
    addressLine3: z.string().optional(),
    addressLine4: z.string().optional(),
    townCity: z.string(),
    postCode: z
      .string()
      .transform((val) => Number(val)), // transform string to number
    country: z.string(),
  }),
  sameAsShipping: z.boolean().default(true),
});
export interface AddressField {
  FieldName: string;
  DisplayName: string;
  IsVisible: boolean;
  IsSystemField: boolean;
  IsRequired: boolean;
  IsMaxFieldLengthRequired: boolean;
  MaxFieldLength: number;
}

export interface AddressContainer {
  ShipToAddresses: AddressField[];
  BillToAddresses: AddressField[];
}

export interface AddressDataProps {
  Id: string;
  ParentId: string | null;
  BillToAddressContainer: AddressContainer;
  ShipToAddressContainer: AddressContainer;
}

type FormValues = z.infer<typeof formSchema>;

const UserAddressInfo = ({ data }: { data: AddressDataProps }) => {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUserInfo, userInfo } = useCartStore();
  const router = useRouter();

  const updateUserAddreses = (values: z.infer<typeof formSchema>) => {
    console.log('values.billingAddress', values.billingAddress);
    console.log('values.shippingAddress', values.shippingAddress);

    const updateAddress = (
      type: "billing" | "shipping",
      address: typeof values.billingAddress | typeof values.shippingAddress
    ) => {
      updateUserInfo(type, {
        customerName: address.title,
        state: address.state,
        fax: address.fax,
        firstName: address.firstName,
        lastName: address.surName,
        companyName: address.companyName,
        email: address.email,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        addressLine3: address.addressLine3,
        addressLine4: address.addressLine4,
        city: address.townCity,
        postCode: address.postCode,
        country: address.country,
      });
    };

    updateAddress("shipping", values.shippingAddress);
    updateAddress("billing", sameAsShipping ? values.shippingAddress : values.billingAddress);
  };

  const defaultShipping = {
    title: userInfo.shipping.customerName || "",
    firstName: userInfo.shipping.firstName || "",
    surName: userInfo.shipping.lastName || "",
    companyName: userInfo.shipping.companyName || "",
    email: userInfo.shipping.email || "",
    phone: userInfo.shipping.phone || ("" as unknown as number),
    addressLine1: userInfo.shipping.addressLine1 || "",
    addressLine2: userInfo.shipping.addressLine2 || "",
    addressLine3: userInfo.shipping.addressLine3 || "",
    addressLine4: userInfo.shipping.addressLine4 || "",
    townCity: userInfo.shipping.city || "",
    postCode: userInfo.shipping.postCode || ("" as unknown as number),
    country: userInfo.shipping.country || "",
    state: userInfo.shipping.state || "",
    fax: userInfo.shipping.fax || "",
  };

  const defaultBilling = {
    title: userInfo.billing.customerName || "",
    firstName: userInfo.billing.firstName || "",
    surName: userInfo.billing.lastName || "",
    companyName: userInfo.billing.companyName || "",
    email: userInfo.billing.email || "",
    phone: userInfo.billing.phone || ("" as unknown as number),
    addressLine1: userInfo.billing.addressLine1 || "",
    addressLine2: userInfo.billing.addressLine2 || "",
    addressLine3: userInfo.billing.addressLine3 || "",
    addressLine4: userInfo.billing.addressLine4 || "",
    townCity: userInfo.billing.city || "",
    postCode: userInfo.billing.postCode || ("" as unknown as number),
    country: userInfo.billing.country || "",
    state: userInfo.billing.state || "",
    fax: userInfo.billing.fax || "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingAddress: defaultShipping,
      billingAddress: defaultShipping,
      sameAsShipping,
    },
    
  });

  async function onSubmit(formEvent: FormEvent<HTMLFormElement>, data: FormValues) {
    formEvent.preventDefault();
    try {
      setIsSubmitting(true);
      // Validate all required fields
      if(sameAsShipping) {
        form.setValue("billingAddress", form.getValues("shippingAddress"))
      }
      const result = await form.trigger();
      if (!result) {
        // If validation fails, scroll to the first error
        const firstError = document.querySelector('[aria-invalid="true"]');
        firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      updateUserAddreses(data);

      const patchUserInfo = await fetch("/api/cart/current", {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      if (patchUserInfo.status !== 200) return
      const reqValidate = await fetch(
        "/api/cart/full-validate",
        {
          method: "GET"
        }
      )
      console.log({ reqValidate })
      if (reqValidate.status !== 200) return

      router.push("/checkout/review");

      // Proceed to next step
      console.log("Proceeding to step 2");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => onSubmit(e, form.getValues())}
        className="space-y-10"
      >
        <ShippingAddress
          data={data.ShipToAddressContainer.ShipToAddresses}
          form={form}
        />
        <div className="h-[1px] w-full bg-muted"></div>
        <div className="">
          <h2 className="text-xl font-semibold text-blue mb-4">
            BILLING ADDRESS
          </h2>

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="same-address"
              checked={sameAsShipping}
              onCheckedChange={(checked) => {
                setSameAsShipping(checked as boolean);
              }}
            />
            <label
              htmlFor="same-address"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Billing address is the same as Shipping address
            </label>
          </div>
          {!sameAsShipping && (
            <BillingAddress
              data={data.BillToAddressContainer.BillToAddresses}
              form={form}
            />
          )}
        </div>
        <div>
          <Button
            type="submit"
            formNoValidate
            disabled={isSubmitting}
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
