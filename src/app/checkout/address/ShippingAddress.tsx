"use client";
import {
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
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { AddressField, formSchema } from "./UserAddressInfo";
import { Fragment } from "react";

type FormValues = z.infer<typeof formSchema>;

interface shippingAddressProps {
  form: UseFormReturn<FormValues>;
  data: AddressField[];
}

export interface ShippingFormFieldProps {
  name: string;
  label: string;
  isRequired?: boolean;
  isCountry?: boolean;
}

const ShippingAddress = ({ form, data }: shippingAddressProps) => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold text-blue mb-4">SHIPPING ADDRESS</h2>

      <div className="grid gap-4">
        {data && data.map((item) => <Fragment key={item.FieldName}>
          {item.IsVisible && <div>
          {item.FieldName === "Attention" && <FormField
          control={form.control}
          name="shippingAddress.title"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                Attention
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={50} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "CompanyName" && <FormField
          control={form.control}
          name="shippingAddress.companyName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                Company Name
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={40} required />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "FirstName" && <FormField
          control={form.control}
          name="shippingAddress.firstName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                First Name
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={30} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "LastName" && <FormField
          control={form.control}
          name="shippingAddress.surName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                Last Name
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={30} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "Address1" && <FormField
          control={form.control}
          name="shippingAddress.addressLine1"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                Address line 1
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={40} required />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "Address2" && <FormField
          control={form.control}
          name="shippingAddress.addressLine2"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                Address line 2
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={40} required />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "Address3" && <FormField
          control={form.control}
          name="shippingAddress.addressLine3"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                Address line 3
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={40} required />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "Address4" && <FormField
          control={form.control}
          name="shippingAddress.addressLine4"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                Address line 4
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={40} required />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "Country" && <FormField
          control={form.control}
          name="shippingAddress.country"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormLabel className="text-muted text-lg font-bold font-lora w-32 shrink-0">
                Country
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl className="bg-white text-tertiary font-lora">
                  <SelectTrigger className="h-14 rounded border border-muted">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white text-tertiary font-lora">
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="United State">United State</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "State" && <FormField
          control={form.control}
          name="shippingAddress.state"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                State
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={30} required />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "City" && <FormField
          control={form.control}
          name="shippingAddress.townCity"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                City
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={30} required />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "PostalCode" && <FormField
          control={form.control}
          name="shippingAddress.postCode"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                Postal Code
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={30} required />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "Phone" && <FormField
          control={form.control}
          name="shippingAddress.phone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                Phone*
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-14" maxLength={20} required />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        {item.FieldName === "Email" && <FormField
          control={form.control}
          name="shippingAddress.email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-muted text-lg font-bold font-lora">
                Email*
              </FormLabel>
              <FormControl>
                <Input type="email" className="h-14" {...field} maxLength={50} required />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}
        </div> }
        </Fragment> )}
      </div>
    </div>
  );
};

export default ShippingAddress;
