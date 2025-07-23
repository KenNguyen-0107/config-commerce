"use client";

import AddToBasket from "./AddToBasket";
import { ProductProps } from "@/components/widgets/Product/types";
import { ProductImage } from "@/gql/graphql";
import { getProductThumbnail } from "@/components/utils";
import { useRealtimePricing } from "./hooks";
import { lazy, Suspense } from "react";

const QuantityBreakPricing = lazy(() => import("./QuantityBreakPricing"));

interface ProductPriceDisplayProps {
	productData: ProductProps;
}

export const ProductPriceDisplay: React.FC<ProductPriceDisplayProps> = ({ productData }) => {
	const { isLoadingRealtimePricing, setQuantity, productUnitPriceDisPlay, actualBreakPrices } =
		useRealtimePricing(productData);

	const attributes = productData.AttributeTypeContainer?.AttributeTypes;
	const priceVat = attributes?.find((a) => a?.Name === "Price (inc. vat)");
	const price = attributes?.find((a) => a?.Name === "Price (exc. vat)");

	const handleChangeQuantity = (value: number) => {
		setQuantity(value);
	};

	return (
		<>
			<div>
				{!!price || !!priceVat ? (
					<div className="space-y-1">
						{priceVat && (
							<div className="flex gap-2 items-center uppercase">
								<h4 className="text-blue">
									{priceVat?.AttributeValueContainer?.AttributeValues?.[0]?.ValueDisplay}
								</h4>
								<span className="text-muted text-sm font-lora">{priceVat?.Label}</span>
							</div>
						)}
						{price && (
							<p className="flex gap-2 text-muted text-sm uppercase font-lora">
								<span>{price?.AttributeValueContainer?.AttributeValues?.[0]?.ValueDisplay}</span>
								<span>{price?.Label}</span>
							</p>
						)}
					</div>
				) : (
					<h4 className="text-blue">
						{isLoadingRealtimePricing ? <span>&nbsp;</span> : productUnitPriceDisPlay}
					</h4>
				)}
				{productData && (
					<Suspense
						fallback={
							<button
								aria-label="View Quantity Break Pricing"
								className={
									"text-blue border-none p-0 lg:p-0 capitalize font-lora text-sm opacity-0 pointer-events-none"
								}
							>
								View Quantity Break Pricing
							</button>
						}
					>
						<QuantityBreakPricing actualBreakPrices={actualBreakPrices} />
					</Suspense>
				)}
			</div>
			<AddToBasket
				id={productData.Id || ""}
				name={productData.ProductTitle || ""}
				price={productData.UnitListPrice || 0}
				priceDisplay={productData.UnitListPriceDisplay || ""}
				canAddToCart={productData.CanAddToCart || false}
				image={getProductThumbnail(productData.ImageContainer?.Images as ProductImage[])}
				url={productData.Url || ""}
				onChangeQuantity={handleChangeQuantity}
			/>
		</>
	);
};
