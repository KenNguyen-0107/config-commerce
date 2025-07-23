import { ICountry } from "@/app/my-account/address/types";
import { SmartLink } from "@/components/shared/smartLink";
import { ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import { useState } from "react";

const AddressOrder = [
	"attention",
	"companyName",
	"firstName",
	"lastName",
	"address1",
	"address2",
	"address3",
	"address4",
	"country",
	"state",
	"city",
	"postalCode",
	"phone",
	"email",
];

type IAddressItem = ICountry | string;

const AddressInformation = ({
	sessionData,
}: {
	sessionData?: {
		shipTo: Record<string, IAddressItem>;
		billTo: Record<string, IAddressItem>;
	};
}) => {
	const [billingShippingOpen, setBillingShippingOpen] = useState(false);
	const billingInfo: IAddressItem[] = [];
	const shippingInfo: IAddressItem[] = [];

	if (sessionData?.shipTo) {
		AddressOrder.forEach((item) => {
			Object.entries(sessionData?.shipTo)?.map(([key, value]) => {
				if (item === key && !!value) {
					shippingInfo.push(value as IAddressItem);
				}
			});
		});
	}

	if (sessionData?.billTo) {
		AddressOrder.forEach((item) => {
			Object.entries(sessionData?.billTo)?.map(([key, value]) => {
				if (item === key && !!value) {
					billingInfo.push(value);
				}
			});
		});
	}

	if (!sessionData) return null;

	return (
		<div className="mt-6">
			<button
				type="button"
				className="w-full bg-secondary-background flex items-center justify-between p-3"
				onClick={() => setBillingShippingOpen(!billingShippingOpen)}
				title="Billing & shipping information"
			>
				<span className="text-blue text-lg font-bold">BILLING & SHIPPING INFORMATION</span>
				{billingShippingOpen ? (
					<ChevronUp className="h-4 w-4 text-tertiary" />
				) : (
					<ChevronDown className="h-4 w-4 text-tertiary" />
				)}
			</button>

			{billingShippingOpen && (
				<div className="border border-secondary-background border-t-0 p-4 bg-white">
					<div className="flex justify-between mb-4 gap-8">
						<div className="w-1/2">
							<div className="text-blue font-bold mb-1 text-xs lg:text-base">CARRIER</div>
							<p className="text-tertiary font-lora text-sm lg:text-base">Flat Rate</p>
						</div>
						<div className="w-1/2">
							<div className="text-blue font-bold mb-1 text-xs lg:text-base">SERVICE</div>
							<p className="text-tertiary font-lora text-sm lg:text-base">Flat Rate</p>
						</div>
					</div>

					<div className="mb-4">
						<div className="flex justify-between items-start">
							<h4 className="text-blue font-bold mb-1 text-xs lg:text-base">SHIPPING ADDRESS</h4>
							<SmartLink
								href="/checkout/address"
								className="text-blue flex items-center text-sm lg:text-base"
							>
								<Edit2 className="h-3 w-3 mr-1" />
								EDIT
							</SmartLink>
						</div>
						<div className="text-tertiary font-lora space-y-1">
							{shippingInfo?.map((item, index) => {
								if (typeof item === "string") {
									return <div key={index}>{item}</div>;
								}
								return <div key={index}>{(item as ICountry).name}</div>;
							})}
						</div>
					</div>

					<div>
						<div className="flex justify-between items-start">
							<h4 className="text-blue font-bold mb-1 text-xs lg:text-base">BILLING ADDRESS</h4>
							<SmartLink
								href="/checkout/address"
								className="text-blue flex items-center text-sm lg:text-base"
							>
								<Edit2 className="h-3 w-3 mr-1" />
								EDIT
							</SmartLink>
						</div>
						<div className="text-tertiary font-lora space-y-1">
							{billingInfo?.map((item: IAddressItem, index) => {
								if (typeof item === "string") {
									return <div key={index}>{item}</div>;
								}
								return <div key={index}>{(item as ICountry).name}</div>;
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddressInformation;
