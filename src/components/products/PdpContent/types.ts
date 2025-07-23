export interface RealTimePricingResults {
	productId: string;
	actualBreakPrices: BreakPrice[];
}

export interface BreakPrice {
	breakQty: number;
	breakPriceDisplay: string;
	savingsMessage: string;
}
