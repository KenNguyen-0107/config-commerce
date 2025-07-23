import { useEffect, useState } from "react";
import { BreakPrice, RealTimePricingResults } from "./types";
import { ProductProps } from "@/components/widgets/Product/types";

export const useRealtimePricing = (productData: ProductProps) => {
	const [quantity, setQuantity] = useState(1);
	const [selectedVariant, setSelectedVariant] = useState<any>();
	const [isLoadingRealtimePricing, setIsLoadingRealtimePricing] =
		useState(true);
	const [realTimePricings, setRealTimePricings] = useState<
		RealTimePricingResults[]
	>([]);
	const [productUnitPriceDisPlay, setProductUnitPriceDisPlay] = useState(
		productData.UnitListPriceDisplay || 0
	);
	const [actualBreakPrices, setActualBreakPrices] = useState<BreakPrice[]>([]);
	useEffect(() => {
		const activeId = selectedVariant?.Product?.ProductId || productData.Id;
		setActualBreakPrices(
			realTimePricings?.find((pricing) => pricing.productId === activeId)
				?.actualBreakPrices || []
		);
	}, [realTimePricings, selectedVariant]);

	useEffect(() => {
		fetchRealtimePricing();
	}, []);

	const fetchRealtimePricing = () => {
		fetch(`/api/realtimepricing`, {
			method: "POST",
			body: JSON.stringify({
				productPriceParameters: [
					{
						productId: productData.Id,
						qtyOrdered: 1,
						unitOfMeasure: "",
					},
					...(
						productData.VariantTraitContainer?.VariantTraits?.[0]
							?.TraitValueContainer?.TraitValues || []
					).map((trait) => ({
						productId: trait?.Id,
						qtyOrdered: 1,
						unitOfMeasure: "",
					})),
				],
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setRealTimePricings(data.realTimePricingResults);
				setProductUnitPriceDisPlay(data.realTimePricingResults[0]?.actualPriceDisplay);
			})
			.finally(() => {
				setIsLoadingRealtimePricing(false);
			});
	};

	useEffect(() => {
		const orderBreakPrices = [...actualBreakPrices].sort(
			(a, b) => b.breakQty - a.breakQty
		);
		for (let index = 0; index < orderBreakPrices.length; index++) {
			if (quantity >= orderBreakPrices[index].breakQty) {
				setProductUnitPriceDisPlay(orderBreakPrices[index].breakPriceDisplay);
				break;
			}
		}
	}, [quantity, actualBreakPrices]);

	return {
		actualBreakPrices,
		isLoadingRealtimePricing,
		productUnitPriceDisPlay,
		setQuantity,
		setSelectedVariant,
	};
};
