"use client";

import { ProductImage, ProductTraitValue, ProductVariantTrait } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ProductProps } from "@/components/widgets/Product/types";
import AddToBasket from "./AddToBasket";
import { getProductThumbnail } from "@/components/utils";
import QuantityBreakPricing from "./QuantityBreakPricing";

const PDPVaritants = ({
	productData,
	defaultPrice,
}: {
	productData?: ProductProps;
	defaultPrice?: string;
}) => {
	const [selectedHeight, setSelectedHeight] = useState("");
	const [selectedVariant, setSelectedVariant] = useState<ProductTraitValue>({});
	const [finalPrice, setFinalPrice] = useState(defaultPrice || "");

	const data = productData?.VariantTraitContainer
		?.VariantTraits?.[0] as ProductVariantTrait;

	const type = data?.DisplayType;
	const title =
		data?.NameDisplay?.split("-")[0] || data?.Name?.split("-")[0] || "";
	const subtitle =
		data?.NameDisplay?.split("-")[1] || data?.Name?.split("-")[1] || "";
	const variants = useMemo(
		() => data?.TraitValueContainer?.TraitValues || [],
		[data?.TraitValueContainer?.TraitValues]
	);

	useEffect(() => {
		const _selectedVariant = variants?.find((v) => v?.Value === selectedHeight);
		const _price = _selectedVariant?.Product?.UnitPriceDisplay || defaultPrice;

		setSelectedVariant(_selectedVariant as ProductTraitValue);
		setFinalPrice(_price || "");
	}, [defaultPrice, variants, selectedHeight]);

	if (!data) return null;

	return (
		<div className="space-y-2 lg:space-y-4">
			{(title || subtitle) && (
				<h3 className="uppercase">
					<span className="text-blue">
						{title} {subtitle && "- "}
					</span>
					<span className="text-muted">{subtitle}</span>
				</h3>
			)}

			{(!type || type === "Dropdown") && variants.length > 0 && (
				<Select onValueChange={(value) => setSelectedHeight(value)}>
					<SelectTrigger className="w-full h-auto py-4 rounded border-muted/50 uppercase text-blue text-base">
						<SelectValue
							placeholder="SELECT PRODUCT"
							className="line-clamp-1"
						/>
					</SelectTrigger>
					<SelectContent className="bg-white uppercase text-blue text-base border-blue">
						<>
							{variants.map((v, index) => (
								<SelectItem
									key={index}
									value={v?.Value || v?.ValueDisplay || ""}
									className="cursor-pointer"
								>
									{v?.ValueDisplay || v?.Value || ""}
								</SelectItem>
							))}
						</>
					</SelectContent>
				</Select>
			)}

			{type === "Button" && variants.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{variants.map((v, index) => (
						<label key={index}>
							<input
								type="radio"
								value={v?.Value || v?.ValueDisplay || ""}
								className="hidden peer"
								checked={[v?.Value, v?.ValueDisplay].includes(selectedHeight)}
								onChange={() =>
									setSelectedHeight(v?.Value || v?.ValueDisplay || "")
								}
							/>

							<span
								className={cn(
									"p-4 lg:px-4 rounded font-medium font-lora border border-muted/50 cursor-pointer hover:border-blue block",
									"peer-checked:border-blue peer-checked:bg-blue peer-checked:text-white"
								)}
							>
								{v?.ValueDisplay || v?.Value || ""}
							</span>
						</label>
					))}
				</div>
			)}

			<div className="text-blue">
				<div className="text-3xl">
					{finalPrice}
				</div>
				{
					productData && (
						<QuantityBreakPricing productData={productData} selectedVariant={selectedVariant} />
					)
				}
			</div>

			<AddToBasket
				id={selectedVariant?.Product?.ProductId || ""}
				name={selectedVariant?.Product?.ProductTitle || ""}
				code={selectedVariant?.Product?.ProductNumber || ""}
				price={selectedVariant?.Product?.UnitListPrice || 0}
				priceDisplay={selectedVariant?.Product?.UnitPriceDisplay || ""}
				canAddToCart={selectedVariant?.Product?.CanAddToCart || false}
				image={getProductThumbnail(selectedVariant?.Product?.ImageContainer?.Images as ProductImage[])}
				url={
					selectedVariant?.Product?.UrlSegment
						? `product/${selectedVariant?.Product?.UrlSegment}`
						: ""
				}
			/>
		</div>
	);
};

export default PDPVaritants;
