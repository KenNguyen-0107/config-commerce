import { fetchAllShipTos } from "../app/my-account/address/api";
import { IAddress } from "../app/my-account/address/types";
// import { HttpMethod } from "@/app/api/clientApi";

interface AddressData {
	billingAddress: any;
	allShipping: IAddress[];
	currentShipping: IAddress;
}
const getAllShipping = async () => {
	async function fetchAddressData(): Promise<AddressData> {
		// Fetch session và billing address song song
		const [sessionResponse, billToResponse, allShipTosResponse] = await Promise.all([
			fetch("/api/sessions/current"),
			fetch("/api/billtos/current"),
			fetchAllShipTos(),
		]);
		// Validate responses
		if (!sessionResponse.ok) throw new Error("Failed to fetch current session");
		if (!billToResponse.ok) throw new Error("Failed to fetch current bill to");

		// Parse billing address
		const billingAddress = JSON.parse(await billToResponse.text());
		const currentBillToId = billingAddress.id;

		// Fetch related shipTo
		const relatedShipToResponse = await fetch(
			`/api/billtos/${currentBillToId}/shiptos/${currentBillToId}`
		);

		if (!relatedShipToResponse.ok) {
			throw new Error("Failed to fetch related ship to");
		}
		// Process shipping data
		const Shipping = allShipTosResponse;
		const currentShipping = Shipping.shipTos.find((item: IAddress) => item.id) || billingAddress;
		const allShipping = Shipping.shipTos.filter((item: IAddress) => item.id);

		return {
			billingAddress,
			allShipping,
			currentShipping,
		};
	}
};

export const preloadAllShipping = () => {
	void getAllShipping();
};
