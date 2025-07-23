"use client";

import AddToBasketCta from "@/components/products/Cta/AddToBasketCta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/store/cart-store";
import { StockType, useStockStore } from "@/store/stock-store";
import { useState } from "react";

export interface IProductCardCTA extends CartItem {
	type: string;
	href?: string;
	canAddToCart?: boolean;
}

export default function ProductCardCTA({
	type,
	id,
	name,
	code,
	price,
	priceDisplay,
	canAddToCart,
	url,
	image,
	href,
}: Omit<IProductCardCTA, "qtyLeft" | "qtyOnHand">) {
	const [quantity, setQuantity] = useState(0);
	const { stock } = useStockStore();

	const productStock = stock?.find((s) => s?.productId === id);
	const stockQuantity = productStock?.qtyOnHand || 0;
	const stockType = productStock?.inventoryAvailabilityDtos?.[0]?.availability?.messageType;

	return (
		<>
			{type === "pdp" && (
				<div className="flex gap-1 lg:gap-4 w-full items-center">
					<Input
						type="text"
						value={quantity}
						onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
						className="h-11 lg:h-14 w-11 lg:w-14 border-muted text-md rounded p-4 text-center"
						ariaLabel="Product quantity"
					/>

					<AddToBasketCta
						id={id}
						name={name}
						code={code}
						price={price}
						priceDisplay={priceDisplay}
						canAddToCart={canAddToCart && stockType !== StockType.OUT_OF_STOCK}
						url={url}
						image={image}
						quantity={quantity}
						stockQuantity={stockQuantity}
						className="whitespace-nowrap w-full h-11 lg:h-14 px-1 lg:px-6"
					/>
				</div>
			)}

			{type === "plp" && href && (
				<div>
					<Button href={href} title="View product">
						VIEW PRODUCT
					</Button>
				</div>
			)}
		</>
	);
}
