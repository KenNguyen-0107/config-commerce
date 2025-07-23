import { create } from "zustand";

interface CheckoutStore {
	isCheckoutPage: boolean;
	setIsCheckoutPage: (isCheckoutPage: boolean) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
	isCheckoutPage: false,
	setIsCheckoutPage: (isCheckoutPage: boolean) => set({ isCheckoutPage }),
}));
