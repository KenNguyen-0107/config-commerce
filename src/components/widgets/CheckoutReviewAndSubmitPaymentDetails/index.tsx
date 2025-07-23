import React from "react";
import { CheckoutReviewAndSubmitPaymentDetailsProps } from "./types";
import PaymentDetail from "@/app/checkout/review/PaymentDetail";
import { getFirstIfExists } from "@/components/utils";
import { getSiteId } from "@/app/config/site-settings";
import { ISiteMessage, IWebsiteSettings } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import { AddressField } from "@/app/checkout/address/types";

export interface IWebSiteData {
	BillToAddressContainer?: {
		BillToAddresses: AddressField[];
	};
	ShipToAddressContainer?: {
		ShipToAddresses: AddressField[];
	};
	SiteMessageContainer?: {
		SiteMessages: ISiteMessage[];
	};
}
const CheckoutReviewAndSubmitPaymentDetails: React.FC<
	CheckoutReviewAndSubmitPaymentDetailsProps
> = async (props) => {
	const sdk = getSdk();
	const data = getFirstIfExists(
		(await sdk.getWebSiteInfo({ siteId: await getSiteId() }))?.Website?.items
	) as IWebSiteData;

	return <PaymentDetail data={data} />;
};

export default CheckoutReviewAndSubmitPaymentDetails;
