// Environment-specific API configuration

// Base URL for the API - from environment variables

export const API_BASE_URL =
	process.env.API_BASE_URL || "https://jacksonsfencing-configcommerce-d-cl.niteco.dev";
// Base URL for the intarnal API - from environment variables
export const API_BASE_INTERNAL_URL = process.env.API_BASE_INTERNAL_URL || "http://localhost:3000";

// API endpoints - defined as constants
export const API_ENDPOINTS = {
	// Website info
	countrySetting: "/api/v1/websites/current/countries?expand=states",
	getRedirects: "/api/v1/custom/htmlredirects",
	// Orders
	orders: "/api/v1/orders",

	// Cart operations
	carts: (cartId: string) => `/api/v1/carts/${cartId}`,
	addProductToCart: "/api/v1/carts/current/cartlines",
	validateAddToCart: "/api/v1/carts/current",
	cartLine: (cartLineId: string) => `/api/v1/carts/current/cartlines/${cartLineId}`,
	getCurrentCart: "/api/v1/carts/current",

	// Address and customer info
	getAddressFields: "/api/v1/websites/current/addressfields",
	getShipTo: "/api/v1/billtos/",
	patchCustomerInfo: "/api/v1/sessions/current",

	// Order status
	getOrderStatusMapping: "/api/v1/orderstatusmappings",
	getOrderHistory: "/api/v1/orders",

	// Sessions
	manageSession: "/api/v1/sessions",
	currentSession: "/api/v1/sessions/current",
	currentSessionInternal: "/api/sessions/current",

	// Account
	isAuthenticated: "/account/isauthenticated",
	createAccount: "/api/v1/accounts",

	// BillTo
	currentBillTo: "/api/v1/billtos/current?expand=validation",
	currentShipTo: "/api/v1/billtos/current/shiptos",
	relatedShipTo: (billToId: string, shipToId?: string) =>
		shipToId
			? `/api/v1/billtos/${billToId}/shiptos/${shipToId || ""}?expand=validation`
			: `/api/v1/billtos/${billToId}`,
	getAllShipTos:
		"/api/v1/billtos/current/shiptos?filter=&page=1&expand=validation&exclude=showAll%2ConeTime%2CbillTo&pageSize=8",
	//product pricing
	realTimePricing: "/api/v1/realtimepricing",

	// product inventory
	realTimeInventory: "/api/v1/realtimeinventory",
};

// Default query parameters - defined as constants
export const DEFAULT_QUERY_PARAMS = {
	orders: {
		customerSequence: "-1",
		sort: "orderDate+DESC,erpOrderNumber+DESC,webOrderNumber+DESC",
		fromDate: "2024-12-03",
	},
	orderHistory: {
		customerSequence: "-1",
		page: "1",
		pageSize: "5",
		sort: "OrderDate+DESC",
	},
	validateAddToCart: {
		expand: "shipping,validation",
	},
	getCurrentCart: {
		expand:
			"shipping,validation,cartLines,restrictions,carriers,paymentOptions,costCodes,hiddenproducts,tax",
		forceRecalculation: "true",
		allowInvalidAddress: "true",
	},
	getShipTo: {
		expand: "validation",
		exclude: "showAll",
	},
};

// Default request bodies - defined as constants
export const DEFAULT_REQUEST_BODIES = {
	addProductToCart: {
		productId: "",
		qtyOrdered: 1,
		unitOfMeasure: "EA",
	},
	patchCustomerInfo: {
		customerWasUpdated: true,
		billTo: {
			id: "",
		},
		shipTo: {
			id: "",
		},
	},
};

// Authentication - defined as a constant
export const AUTH_COOKIE =
	"CurrentCurrencyId=144985ae-9822-4ba5-f05d-08dd4a8489b6; CurrentLanguageId=a26095ef-c714-e311-ba31-d43d7e4e88b2; InsiteCacheId=f560f0a0-b2ce-4863-8911-97883a042395; SetContextLanguageCode=en-us; SetContextPersonaIds=463f529c-9182-4a00-128d-08dd4a4cd382%252cd06988c0-9358-4dbb-aa3d-b7be5b6a7fd9; c2c53320-98dc-4eca-8022-9efc00dea0dc_Cart=8874dfad-acf8-415e-92c8-b296004918a7";

// CORS configuration
export const CORS_CONFIG = {
	allowOrigin: process.env.CORS_ALLOW_ORIGIN || "*",
	allowMethods: process.env.CORS_ALLOW_METHODS || "GET, POST, PUT, DELETE, OPTIONS, PATCH",
	allowHeaders: process.env.CORS_ALLOW_HEADERS || "Content-Type, Authorization",
};
