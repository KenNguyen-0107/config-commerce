"use client";

import type React from "react";
import { Fragment } from "react";
import { getProductThumbnail } from "@/components/utils";
import type { ProductProps } from "@/components/widgets/Product/types";
import type { ProductImage, ProductTraitValue, ProductVariantTrait } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { lazy, useEffect, useMemo, useState, Suspense } from "react";
import AddToBasket from "./AddToBasket";
import { useRealtimePricingStore } from "@/store/realtime-pricing-store";
import type { BreakPrice } from "./types";
import { useIntersectionObserver } from "@/hook/useIntersectionObserver";

// Lazy load components that aren't needed immediately
const FetchStock = lazy(() => import("../StockBadge/FetchStock"));
const QuantityBreakPricing = lazy(() => import("./QuantityBreakPricing"));
const FetchRealtimePricing = lazy(() => import("../RealtimePricing/FetchRealtimePricing"));
const StockBadge = lazy(() => import("../StockBadge"));

// Static component that renders the HTML structure without JavaScript functionality
const StaticPDPVariants = ({
	productData,
	defaultPrice,
}: {
	productData?: ProductProps;
	defaultPrice?: string;
}) => {
	const data = productData?.VariantTraitContainer?.VariantTraits?.[0] as ProductVariantTrait;

	if (!data) return null;

	const type = data?.DisplayType;
	const title = data?.NameDisplay?.split("-")[0] || data?.Name?.split("-")[0] || "";
	const subtitle = data?.NameDisplay?.split("-")[1] || data?.Name?.split("-")[1] || "";
	const variants = data?.TraitValueContainer?.TraitValues || [];

	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { Select, SelectTrigger, SelectValue } = require("@/components/ui/select");

	return (
		<div className="space-y-2 lg:space-y-4">
			{(title || subtitle) && (
				<h3 className="uppercase text-md lg:text-xl">
					<span className="text-blue">
						{title} {subtitle && "- "}
					</span>
					<span className="text-muted">{subtitle}</span>
				</h3>
			)}

			{/* Static variant selector */}
			{variants.length > 0 &&
				(type === "Button" ? (
					<div className="flex flex-wrap gap-2">
						{variants.map((v, index: number) => (
							<Fragment key={index}>
								{!!v?.Product?.ProductId && (
									<label>
										<input
											type="radio"
											value={v?.Value || v?.ValueDisplay || ""}
											className="hidden peer"
											disabled
										/>
										<span className="p-4 lg:px-4 rounded font-medium font-lora border border-[#8C8B9080] cursor-pointer hover:border-blue block text-blue">
											{v?.ValueDisplay || v?.Value || ""}
										</span>
									</label>
								)}
							</Fragment>
						))}
					</div>
				) : (
					<Select>
						<SelectTrigger
							title="Select product"
							aria-label="Select product"
							className="w-full h-auto py-4 rounded border-muted/50 uppercase text-blue text-base"
						>
							<SelectValue placeholder="SELECT PRODUCT" className="line-clamp-1" />
						</SelectTrigger>
					</Select>
				))}

			{/* Static price display */}
			<div className="text-blue">
				<div className="text-3xl flex justify-between">{defaultPrice || ""}</div>
			</div>

			<button
				aria-label="View Quantity Break Pricing"
				className={cn(
					"text-blue border-none p-0 lg:p-0 capitalize font-lora text-sm opacity-0 pointer-events-none"
				)}
			>
				View Quantity Break Pricing
			</button>

			{/* Static add to basket button */}
			<AddToBasket
				id={""}
				name={""}
				code={""}
				price={0}
				priceDisplay={""}
				canAddToCart={false}
				image={""}
				url={""}
				qtyLeft={0}
				qtyOnHand={0}
			/>
		</div>
	);
};

// Interactive component with full JavaScript functionality
const InteractivePDPVariants = ({
	productData,
	defaultPrice,
}: {
	productData?: ProductProps;
	defaultPrice?: string;
}) => {
	const [selectedHeight, setSelectedHeight] = useState("");
	const [selectedVariant, setSelectedVariant] = useState<ProductTraitValue>({});
	const [finalPrice, setFinalPrice] = useState(defaultPrice || "");
	const [quantity, setQuantity] = useState(1);
	const searchParams = useSearchParams();

	const data = productData?.VariantTraitContainer?.VariantTraits?.[0] as ProductVariantTrait;

	const type = data?.DisplayType;
	const title = data?.NameDisplay?.split("-")[0] || data?.Name?.split("-")[0] || "";
	const subtitle = data?.NameDisplay?.split("-")[1] || data?.Name?.split("-")[1] || "";
	const variants = useMemo(
		() => data?.TraitValueContainer?.TraitValues || [],
		[data?.TraitValueContainer?.TraitValues]
	);

	const variantIds = variants?.map((v) => v?.Product?.ProductId || "") || [];

	useEffect(() => {
		const option = searchParams.get("option");
		if (option) {
			const _selectedVariant = variants?.find((v) => v?.Product?.ProductNumber === option);
			if (_selectedVariant) {
				setSelectedHeight(_selectedVariant?.Value || _selectedVariant?.ValueDisplay || "");
			}
		}
	}, [searchParams, variants]);

	useEffect(() => {
		const _selectedVariant = variants?.find((v) => v?.Value === selectedHeight);
		const _price = _selectedVariant?.Product?.UnitPriceDisplay || defaultPrice;

		setSelectedVariant(_selectedVariant as ProductTraitValue);
		setFinalPrice(_price || "");
	}, [defaultPrice, variants, selectedHeight]);

	const { getActualBreakPrices, getPriceDisplay } = useRealtimePricingStore();

	const handleChangeQuantity = (value: number) => {
		setQuantity(value);
	};

	if (!data) return null;

	const renderVariantSelecter = () => {
		if (variants.length === 0) {
			return null;
		}
		if (type === "Button") {
			return (
				<div className="flex flex-wrap gap-2">
					{variants.map((v, index: number) => (
						<Fragment key={index}>
							{!!v?.Product?.ProductId && (
								<label key={index}>
									<input
										type="radio"
										value={v?.Value || v?.ValueDisplay || ""}
										className="hidden peer"
										checked={[v?.Value, v?.ValueDisplay].includes(selectedHeight)}
										onChange={() => setSelectedHeight(v?.Value || v?.ValueDisplay || "")}
									/>

									<span
										className={cn(
											"p-4 lg:px-4 rounded font-medium font-lora border border-[#8C8B9080] cursor-pointer hover:border-blue block",
											"peer-checked:border-blue peer-checked:bg-blue peer-checked:text-white text-blue"
										)}
									>
										{v?.ValueDisplay || v?.Value || ""}
									</span>
								</label>
							)}
						</Fragment>
					))}
				</div>
			);
		}

		const {
			Select,
			SelectContent,
			SelectItem,
			SelectTrigger,
			SelectValue,
			// eslint-disable-next-line @typescript-eslint/no-require-imports
		} = require("@/components/ui/select");
		return (
			<Select onValueChange={(value: string) => setSelectedHeight(value)} value={selectedHeight}>
				<SelectTrigger
					title="Select product"
					aria-label="Select product"
					className="w-full h-auto py-4 rounded border-muted/50 uppercase text-blue text-base"
				>
					<SelectValue placeholder="SELECT PRODUCT" className="line-clamp-1" />
				</SelectTrigger>
				<SelectContent className="bg-white uppercase text-blue text-base border-blue">
					{variants
						.filter((v) => v?.Product?.ProductId)
						.map((v, index) => (
							<SelectItem
								key={index}
								value={v?.Value || v?.ValueDisplay || ""}
								className="cursor-pointer"
							>
								{v?.ValueDisplay || v?.Value || ""}
							</SelectItem>
						))}
				</SelectContent>
			</Select>
		);
	};

	return (
		<div className="space-y-2 lg:space-y-4">
			<Suspense fallback={null}>
				<FetchRealtimePricing productIds={variantIds} />
				<FetchStock productIds={variantIds} />
			</Suspense>

			{(title || subtitle) && (
				<h3 className="uppercase text-md lg:text-xl">
					<span className="text-blue">
						{title} {subtitle && "- "}
					</span>
					<span className="text-muted">{subtitle}</span>
				</h3>
			)}

			{renderVariantSelecter()}

			<div className="text-blue">
				<div className="text-3xl flex justify-between">
					{selectedVariant?.Product?.ProductId
						? getPriceDisplay(selectedVariant?.Product?.ProductId as string, quantity)
						: finalPrice}

					{!!selectedVariant?.Product?.ProductId && (
						<StockBadge
							productId={selectedVariant.Product.ProductId as string}
							position="carousel"
						/>
					)}
				</div>
				{productData && (
					<Suspense
						fallback={
							<button
								aria-label="View Quantity Break Pricing"
								className={cn(
									"text-blue border-none p-0 lg:p-0 capitalize font-lora text-sm opacity-0 pointer-events-none"
								)}
							>
								View Quantity Break Pricing
							</button>
						}
					>
						<QuantityBreakPricing
							actualBreakPrices={
								getActualBreakPrices(selectedVariant?.Product?.ProductId as string) as BreakPrice[]
							}
						/>
					</Suspense>
				)}
			</div>

			<AddToBasket
				id={selectedVariant?.Product?.ProductId || ""}
				name={selectedVariant?.Product?.ProductTitle || ""}
				code={selectedVariant?.Product?.ProductNumber || ""}
				price={selectedVariant?.Product?.UnitListPrice || 0}
				priceDisplay={selectedVariant?.Product?.UnitPriceDisplay || ""}
				canAddToCart={selectedVariant?.Product?.CanAddToCart || false}
				image={getProductThumbnail(
					selectedVariant?.Product?.ImageContainer?.Images as ProductImage[]
				)}
				url={
					selectedVariant?.Product?.UrlSegment
						? `product/${selectedVariant?.Product?.UrlSegment}`
						: ""
				}
				onChangeQuantity={handleChangeQuantity}
			/>
		</div>
	);
};

// Main component that decides whether to render static or interactive version
const PDPVaritants = ({
	productData,
	defaultPrice,
}: {
	productData?: ProductProps;
	defaultPrice?: string;
}) => {
	const { elementRef, hasBeenVisible } = useIntersectionObserver();

	return (
		<div ref={elementRef as React.RefObject<HTMLDivElement>}>
			{hasBeenVisible ? (
				<InteractivePDPVariants productData={productData} defaultPrice={defaultPrice} />
			) : (
				<StaticPDPVariants productData={productData} defaultPrice={defaultPrice} />
			)}
		</div>
	);
};

export default PDPVaritants;
