"use client";

import { useRealtimePricingStore } from "@/store/realtime-pricing-store";

export default function ProductCardPrice({
	price,
	vatText,
	productId,
}: {
	price: string;
	vatText?: string;
	productId?: string;
}) {
	const { getMinPriceDisplay } = useRealtimePricingStore();

	if (!price) return null;

	return (
		<div className="flex items-center gap-1 text-blue text-xl">
			<span>FROM {productId ? getMinPriceDisplay(productId) : price}</span>
			{vatText && <span className="text-muted text-xs sm:text-sm">EXC VAT</span>}
		</div>
	);
}
