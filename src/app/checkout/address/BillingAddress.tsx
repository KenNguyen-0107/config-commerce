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
interface BillingAddressProps {
  form: UseFormReturn<FormValues>;
  data: AddressField[];
}

const BillingAddress = ({ form, data }: BillingAddressProps) => {
  return (
    <div className="grid gap-4">
        {data && data.map((item) => <Fragment key={item.FieldName}>
          {item.IsVisible && <div key={item.FieldName}>
          {item.FieldName === "Attention" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.title"
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
        {item.FieldName === "CompanyName" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.companyName"
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
        {item.FieldName === "FirstName" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.firstName"
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
        {item.FieldName === "LastName" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.surName"
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
        {item.FieldName === "Address1" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.addressLine1"
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
        {item.FieldName === "Address2" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.addressLine2"
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
        {item.FieldName === "Address3" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.addressLine3"
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
        {item.FieldName === "Address4" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.addressLine4"
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
        {item.FieldName === "Country" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.country"
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
                    <SelectValue placeholder="Select country" className="" />
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
        {item.FieldName === "State" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.state"
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
        {item.FieldName === "City" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.townCity"
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
        {item.FieldName === "PostalCode" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.postCode"
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
        {item.FieldName === "Phone" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.phone"
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
        {item.FieldName === "Email" && item.IsVisible && <FormField
          control={form.control}
          name="billingAddress.email"
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
        </div>}
        </Fragment> )}
      </div>
  );
};

export default BillingAddress;
