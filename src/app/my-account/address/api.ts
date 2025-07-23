import { IAddress } from "./types";
// enter page:
const getAllAddresses = async () => {
	const reqGetCurrentBillTo = await fetch("/api/billTos/current");
	if (!reqGetCurrentBillTo.ok) {
		throw new Error("Failed to fetch current bill to");
	}

	const currentBillToId = JSON.parse(await reqGetCurrentBillTo.text()).id;
	const getRelatedShipTo = await fetch(
		`/api/billTos/${currentBillToId}/shiptos/${currentBillToId}`
	);
	if (!getRelatedShipTo.ok) {
		throw new Error("Failed to fetch related ship to");
	}

	const getAddressFields = await fetch("/api/address/addressFields");
	if (!getAddressFields.ok) {
		throw new Error("Failed to fetch address fields");
	}

	const allAddress = await fetchAddress();
	// => setState({ allAddress })
};

// get Countries to fill in dropdown
const getCountries = async () => {
	const reqGetCountries = await fetch("/api/website/countries");
	if (!reqGetCountries.ok) {
		throw new Error("Failed to fetch countries");
	}
	return JSON.parse(await reqGetCountries.text());
};

const addNewAddress = async () => {
	const reqGetCurrentBillTo = await fetch("/api/billTos/current");
	if (!reqGetCurrentBillTo.ok) {
		throw new Error("Failed to fetch current bill to");
	}
	const currentBillToId = JSON.parse(await reqGetCurrentBillTo.text()).id;
	const reqAddNewAddress = await fetch(`/api/billTos/${currentBillToId}`, {
		method: "POST",
		body: JSON.stringify({
			address: {
				uri: null,
				isNew: true,
				oneTimeAddress: false,
				label: "Create New Address",
				isDefault: false,
				id: "Create New Address",
				customerNumber: "WEB002075",
				customerSequence: "",
				customerName: "",
				firstName: "Thomas",
				lastName: "Nguyen",
				contactFullName: "",
				companyName: "fdfnjfsj",
				attention: "",
				address1: "185 Chua Lang Street",
				address2: "",
				address3: "",
				address4: "",
				city: "Hanoi",
				postalCode: "100000",
				state: null,
				country: {
					uri: "http://b2b.local.com:30000/api/v1/websites/current/countries/c6ab0470-e310-e311-ba31-d43d7e4e88b2",
					id: "c6ab0470-e310-e311-ba31-d43d7e4e88b2",
					name: "Canada",
					abbreviation: "CA",
					states: [],
					properties: {},
				},
				phone: "43264432663",
				fullAddress: ", , , ",
				email: "123@gmail.com",
				fax: "",
			},
		}),
	});

	if (!reqAddNewAddress.ok) {
		throw new Error("Failed to add new address");
	}

	const fetchCurrentSession = await fetch("/api/session/current");
	if (!fetchCurrentSession.ok) {
		// redirect to login page
		throw new Error("Failed to fetch current session");
	}

	const allAddress = await fetchAddress();
	// => setState({ allAddress })

	// fetch current Session again
	const reFetchCurrentSession = await fetch("/api/session/current");
	if (!reFetchCurrentSession.ok) {
		// redirect to login page
		throw new Error("Failed to fetch current session");
	}
	const shipToId = JSON.parse(await reFetchCurrentSession.text()).shipTo.id;

	const validateBillToShipTo = await fetch(`/api/billTos/${currentBillToId}/shiptos/${shipToId}`);
	if (!validateBillToShipTo.ok) {
		throw new Error("Failed to validate bill to ship to");
	}
};

// common function
const fetchAddress = async () => {
	const getAllShipTos = await fetch("/api/billTos/current/shipTos");
	if (!getAllShipTos.ok) {
		throw new Error("Failed to fetch all ship tos");
	}

	return JSON.parse(await getAllShipTos.text());
};

// use as shipping address
const updateDefaultShippingAddress = async (shipToId: string) => {
	const reqUpdate = await fetch("/api/sessions/current", {
		method: "PATCH",
		body: JSON.stringify({
			customerWasUpdated: true,
			shipTo: {
				id: shipToId,
			},
		}),
	});

	if (!reqUpdate.ok) {
		throw new Error("Failed to update default shipping address");
	}
};
// get all shipping addresses
export const fetchAllShipTos = async () => {
	const getAllShipTos = await fetch("/api/billtos/current/shiptos");
	if (!getAllShipTos.ok) {
		throw new Error("Failed to fetch all ship tos");
	}

	return await getAllShipTos.json();
};

// filter shipping addresses
export const filterShipTos = async (params: string) => {
	const getAllShipTos = await fetch(`/api/billtos/current/shiptos?${params}`);
	if (!getAllShipTos.ok) {
		throw new Error("Failed to fetch all ship tos");
	}

	const listShipTosById = await getAllShipTos.json();
	return listShipTosById.shipTos.filter((item: IAddress) => item.id);
};
