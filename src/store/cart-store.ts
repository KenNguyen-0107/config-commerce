import { create, StateCreator } from "zustand";

export interface CartItem {
	id?: string;
	name?: string;
	code?: string;
	price?: number;
	priceDisplay?: string;
	quantity?: number;
	stockQuantity?: number;
	qtyLeft?: number;
	qtyOnHand?: number;
	image?: string;
	url?: string;
	productId?: string;
	pricing?: {
		extendedActualPriceDisplay?: string;
		actualPriceDisplay?: string;
		actualPrice?: number;
	};
	availability?: {
		message?: string;
		messageType?: number;
		requiresRealTimeInventory?: boolean;
	};
}

export interface UserInfo {
	customerName?: string;
	firstName?: string;
	lastName?: string;
	contactFullName?: string;
	companyName?: string;
	attention?: string;
	address1?: string;
	address2?: string;
	address3?: string;
	address4?: string;
	city?: string;
	postalCode?: number;
	state?: string;
	country?: string;
	email?: string;
	phone?: number;
	fax?: string;
}

export interface paymentCardInfo {
	cardName?: string;
	cardNumber?: string;
	cardType?: string;
	expirationMonth?: string;
	expirationYear?: string;
	securityCode?: string;
	paymentMethod?: string;
	PONumber?: string;
}

export interface IPrice {
	subTotal?: string;
	shippingFee?: string;
	discount?: string;
	tax?: string;
	totalIncVat?: string;
}

export interface CartStore {
	isLoadingCart: boolean;
	cartId: string;
	setCartId: (id: string) => void;
	items: CartItem[];
	setItems: (items: CartItem[]) => void;
	setStockMessage: (items: CartItem[]) => void;
	addItem: (item: CartItem) => void;
	getItems: () => CartItem[];
	getAllQuantity: () => number;
	updateQuantity: (id: string, quantity: number) => void;
	removeItem: (id: string) => void;
	removeAllItems: () => void;
	getSubtotal: () => number;
	getVoucherAmount: () => number;
	getTotalExcVat: () => number;
	getTotalIncVat: () => number;
	price: IPrice;
	updatePrice: (price: IPrice) => void;
	cartErrorMessage: string;
	setCartErrorMessage: (message: string) => void;
	// checkout Address
	userInfo: {
		billing: UserInfo;
		shipping: UserInfo;
	};
	getUserInfo: () => {
		billing: UserInfo;
		shipping: UserInfo;
	};
	updateUserInfo: (type: "billing" | "shipping", info: UserInfo) => void;
	// checkout payment card info
	paymentCardInfo: paymentCardInfo;
	getPaymentCardInfo: () => void;
	updatePaymentCardInfo: (info: paymentCardInfo) => void;
	sameAsShipping: boolean;
	setSameAsShipping: (isSame: boolean) => void;
}

const cartStoreCreator: StateCreator<CartStore> = (set, get) => ({
	isLoadingCart: true,
	cartErrorMessage: "",
	setCartErrorMessage: (message: string) => set({ cartErrorMessage: message }),
	price: {
		subTotal: "£0.00",
		shippingFee: "£0.00",
		discount: "£0.00",
		tax: "£0.00",
		totalIncVat: "£0.00",
	},
	updatePrice: (priceNew: IPrice) =>
		set((state) => ({
			price: {
				...state.price,
				...priceNew,
			},
		})),
	cartId: "",
	setCartId: (id: string) => set({ cartId: id }),
	items: [],
	setItems: (items: CartItem[]) => {
		set({ items });
		set({ isLoadingCart: false });
		let errorMessage = "";
		items.forEach((item) => {
			if (item.availability?.messageType !== 0 && item.qtyLeft && item.qtyLeft < 0) {
				errorMessage = `Some of the item quantity is out of stock`;
			}
		});
		set({ cartErrorMessage: errorMessage });
	},
	setStockMessage: (items: CartItem[]) => {
		let errorMessage = "";
		let a = items.find(
			(item) => item.availability?.messageType !== 0 && item.qtyLeft && item.qtyLeft < 0
		);
		if (a) {
			errorMessage = `Some of the item quantity is out of stock`;
		} else {
			errorMessage = "";
		}
		set({ cartErrorMessage: errorMessage });
	},
	getAllQuantity: () => {
		return get().items.reduce((sum, item) => sum + (item.quantity || 0), 0);
	},
	updateQuantity: (id: string, quantity: number) =>
		set((state) => ({
			items: state.items.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
			),
		})),
	addItem: (item: CartItem) =>
		set((state) => {
			const existingItem = state.items.find((i) => i.id === item.id);
			if (existingItem) {
				return {
					items: state.items.map((i) =>
						i.id === item.id
							? {
									...i,
									quantity: Math.max(1, (i.quantity || 0) + (item.quantity || 0)),
							  }
							: i
					),
				};
			}
			return { items: [...state.items, item] };
		}),
	getItems: () => {
		return get().items;
	},
	removeItem: (id: string) =>
		set((state) => ({
			items: state.items.filter((item) => item.id !== id),
		})),
	removeAllItems: () =>
		set(() => ({
			items: [],
		})),
	getSubtotal: () => {
		return get().items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
	},
	getTotalExcVat: () => {
		return 0;
	},
	getTotalIncVat: () => {
		return get().getSubtotal() - get().getVoucherAmount();
	},
	getVoucherAmount: () => {
		return 0;
	},
	userInfo: {
		billing: {},
		shipping: {},
	},
	getUserInfo: () => {
		return get().userInfo;
	},
	updateUserInfo: (type: "billing" | "shipping", info: UserInfo) =>
		set((state) => ({
			userInfo: {
				...state.userInfo,
				[type]: info,
			},
		})),
	paymentCardInfo: {},
	getPaymentCardInfo: () => {
		return get().paymentCardInfo;
	},
	updatePaymentCardInfo: (info: paymentCardInfo) =>
		set((state) => ({
			...state,
			paymentCardInfo: info,
		})),
	sameAsShipping: true,
	setSameAsShipping: (isSame: boolean) => set({ sameAsShipping: isSame }),
});

// Use the state creator with persist
export const useCartStore = create<CartStore>(cartStoreCreator);
