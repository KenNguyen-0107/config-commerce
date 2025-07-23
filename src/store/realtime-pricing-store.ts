import { create } from "zustand";

interface IRealtimePricing {
	productId: string;
	actualPriceDisplay: string;
	actualBreakPrices: {
		breakQty: number;
		breakPriceDisplay: string;
		savingsMessage: string;
	}[];
}

interface Store {
	realTimePricings: IRealtimePricing[];
	setRealTimePricings: (realTimePricings: IRealtimePricing[]) => void;
	getMinPriceDisplay: (productId: string) => string | undefined;
	getPriceDisplay: (productId: string, quantity: number) => string | undefined;
	getActualBreakPrices: (productId: string) =>
		| {
				breakQty: number;
				breakPriceDisplay: string;
				savingsMessage: string;
		  }[]
		| undefined;
}

export const useRealtimePricingStore = create<Store>((set, get) => ({
	realTimePricings: [],
	setRealTimePricings: (realTimePricings: IRealtimePricing[]) => {
		set((state) => ({
			realTimePricings: state.realTimePricings
				.map((existingPricing) => {
					const newPricing = realTimePricings.find(
						(pricing) => pricing.productId === existingPricing.productId
					);
					return newPricing || existingPricing;
				})
				.concat(
					realTimePricings.filter(
						(newPricing) =>
							!state.realTimePricings.some(
								(existing) => existing.productId === newPricing.productId
							)
					)
				),
		}));
	},
	getMinPriceDisplay: (productId: string): string | undefined => {
		const pricing = get().realTimePricings.find((p: IRealtimePricing) => p.productId === productId);

		const orderBreakPrices = (pricing?.actualBreakPrices || []).sort(
			(a, b) => b.breakQty - a.breakQty
		);
		if (!orderBreakPrices || orderBreakPrices.length === 0) return pricing?.actualPriceDisplay;

		return orderBreakPrices[0].breakPriceDisplay;
	},
	getPriceDisplay: (productId: string, quantity: number = 1): string | undefined => {
		const pricing = get().realTimePricings.find((p: IRealtimePricing) => p.productId === productId);

		if (!pricing) return undefined;

		const orderBreakPrices = [...(pricing.actualBreakPrices || [])].sort(
			(a, b) => b.breakQty - a.breakQty
		);

		for (let i = 0; i < orderBreakPrices.length; i++) {
			if (quantity >= orderBreakPrices[i].breakQty) {
				return orderBreakPrices[i].breakPriceDisplay;
			}
		}

		return pricing?.actualPriceDisplay;
	},

	getActualBreakPrices: (
		productId: string
	):
		| {
				breakQty: number;
				breakPriceDisplay: string;
				savingsMessage: string;
		  }[]
		| undefined => {
		const pricing = get().realTimePricings.find((p: IRealtimePricing) => p.productId === productId);

		return pricing?.actualBreakPrices;
	},
}));
