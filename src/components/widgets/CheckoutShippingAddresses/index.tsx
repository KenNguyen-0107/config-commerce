import React from "react";
import { CheckoutShippingAddressesProps } from "./types";
import UserAddressInfo from "@/app/checkout/address/UserAddressInfo";
import { getSdk } from "@/sdk";
import { getFirstIfExists } from "@/components/utils";
import { AddressDataProps } from "@/app/checkout/address/types";
import { getSiteId } from "@/app/config/site-settings";

const CheckoutShippingAddresses: React.FC<CheckoutShippingAddressesProps> = async () => {
	const sdk = getSdk();
	const data = getFirstIfExists(
		(await sdk.getWebSiteInfo({ siteId: await getSiteId() })).Website?.items
	) as unknown as AddressDataProps;

	return <UserAddressInfo data={data} />;
};

export default CheckoutShippingAddresses;
