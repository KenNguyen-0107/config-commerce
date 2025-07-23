"use client";

import { useRealtimePricingStore } from "@/store/realtime-pricing-store";
import { useEffect } from "react";

const FetchRealtimePricing = ({ productIds }: { productIds: string[] }) => {
	const { setRealTimePricings } = useRealtimePricingStore();

	useEffect(() => {
		fetchRealtimePricing();
	}, []);

	const fetchRealtimePricing = async () => {
		if (!productIds.length) return;

		const response = await fetch("/api/realtimepricing", {
			method: "POST",
			body: JSON.stringify({
				productPriceParameters: productIds
					.filter((productId) => productId !== "")
					.map((productId) => ({
						productId,
						qtyOrdered: 1,
						unitOfMeasure: "",
					})),
			}),
		});

		const data = await response.json();

		setRealTimePricings(data.realTimePricingResults);
	};

	return <></>;
};

export default FetchRealtimePricing;
