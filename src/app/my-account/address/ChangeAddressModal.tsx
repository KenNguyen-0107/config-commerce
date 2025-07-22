"use client";

import type React from "react";
import { X } from "lucide-react";
import { FormEvent } from "react";
import { IAddress, ICountry } from "./types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface CreateAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: IAddress) => void;
  initialData?: IAddress;
  mode: "create" | "edit";
  listCountry: ICountry[];
}
type FormValues = z.infer<typeof formSchema>;

export const formSchema = z.object({
  companyName: z.string().min(1, "company is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    ),
  state: z.string().min(1, "state is required"),
  attention: z.string().min(1, "attention is required"),
  address1: z.string().min(1, "address 1 is required"),
  address2: z.string().min(1, "address 2 is required"),
  city: z.string().min(1, "city is required"),
  postCode: z.string().transform((val) => Number(val)), // transform string to number
  country: z.string().min(1, "country is required"),
});

export default function CreateAddressModal({
  isOpen,
  onClose,
  onSave,
  initialData = {},
  mode = "create",
  listCountry = [],
}: CreateAddressModalProps) {
  const defaultValues = {
    companyName: initialData?.companyName || "",
    email: initialData?.email || "",
    state: initialData?.state || "",
    attention: initialData?.attention || "",
    address1: initialData?.address1 || "",
    address2: initialData?.address2 || "",
    city: initialData?.city || "",
    postCode: initialData?.postalCode || ("" as any),
    country: initialData?.country?.name || "",
  };
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  console.log("initialData", initialData);

  const addNewAddress = async (formData: FormValues) => {
    const reqGetCurrentBillTo = await fetch("/api/billTos/current");
    if (!reqGetCurrentBillTo.ok) {
      throw new Error("Failed to fetch current bill to");
    }
    const getCountryData = () => {
      return listCountry.find((item) => item.name === formData.country);
    };
    const currentBillToId = JSON.parse(await reqGetCurrentBillTo.text()).id;
    const reqAddNewAddress = await fetch(`/api/billTos/${currentBillToId}`, {
      method: mode === "create" ? "POST" : "PATCH",
      body: JSON.stringify({
        address: {
          companyName: formData.companyName,
          attention: formData.attention,
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          postalCode: formData.postCode,
          state: formData.state,
          country: getCountryData(),
          email: formData.email,
        },
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
    const allAddress = await fetchAddress();
    // fetch current Session again
    const reFetchCurrentSession = await fetch("/api/sessions/current");
    if (!reFetchCurrentSession.ok) {
      // redirect to login page
      throw new Error("Failed to fetch current session");
    }
    const shipToId = JSON.parse(await reFetchCurrentSession.text()).shipTo.id;

    const validateBillToShipTo = await fetch(
      `/api/billTos/${currentBillToId}/shiptos/${shipToId}`
    );
    if (!validateBillToShipTo.ok) {
      throw new Error("Failed to validate bill to ship to");
    }
  };

  const updateShippingAddress = async () => {
    try {
    } catch (error) {}
  };

  if (!isOpen) return null;

  const modalTitle =
    mode === "create" ? "CREATE A NEW ADDRESS" : "EDIT ADDRESS";

  async function onSubmit(
    formEvent: FormEvent<HTMLFormElement>,
    data: FormValues
  ) {
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
      onClose();
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={(e) => onSubmit(e, form.getValues())}
        className="space-y-10"
      >
        <div className="fixed font-lora inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#2A3563] text-3xl font-bold">
                  {modalTitle}
                </h2>
                <button onClick={onClose} className="text-[#2A3563]">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="block text-[#555555] text-lg">
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-14"
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
                    name="attention"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="block text-[#555555] text-lg">
                          Attention
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-14"
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
                  name="address1"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="block text-[#555555] text-lg">
                        Address 1
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-14"
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
                      <FormLabel className="block text-[#555555] text-lg">
                        Address 2
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-14"
                          maxLength={40}
                          required
                        />
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
                        <FormLabel className="block text-[#555555] text-lg">
                          Country
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          required
                        >
                          <FormControl className="bg-white text-tertiary font-lora">
                            <SelectTrigger className="h-14 rounded border border-muted">
                              <SelectValue
                                placeholder="Select country"
                                className=""
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white text-tertiary font-lora">
                            {listCountry &&
                              listCountry.map((item, index) => (
                                <SelectItem key={index} value={item.name || ""}>
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
                        <FormLabel className="block text-[#555555] text-lg">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-14"
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
                        <FormLabel className="block text-[#555555] text-lg">
                          State
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          required
                        >
                          <FormControl className="bg-white text-tertiary font-lora">
                            <SelectTrigger className="h-14 rounded border border-muted">
                              <SelectValue
                                placeholder="Select state"
                                className=""
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white text-tertiary font-lora">
                            {listCountry &&
                              listCountry.map((item, index) => (
                                <SelectItem key={index} value={item.name || ""}>
                                  United Kingdom
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
                    name="postCode"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="block text-[#555555] text-lg">
                          Postal Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-14"
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
                        <FormLabel className="block text-[#555555] text-lg">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-14"
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

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 border border-[#2A3563] text-[#2A3563] font-medium rounded"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="py-3 bg-[#2A3563] text-white font-medium rounded"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
