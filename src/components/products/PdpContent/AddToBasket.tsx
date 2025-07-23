"use client";

import { useState } from "react";
import AddToBasketCta, { IAddToBasketCta } from "../Cta/AddToBasketCta";
import QuantityControl from "../Cta/QuantityControl";
import { cn } from "@/lib/utils";
import { StockType, useStockStore } from "@/store/stock-store";

const AddToBasket = ({
	id,
	name,
	code,
	price,
	priceDisplay,
	url,
	canAddToCart,
	image,
	showControl,
	className,
	buttonClass,
	onChangeQuantity,
}: Omit<IAddToBasketCta, "quantity">) => {
	const [quantity, setQuantity] = useState(1);
	const { getStockByProductId } = useStockStore();

	const productStock = id ? getStockByProductId(id) : undefined;
	const stockQuantity = productStock?.qtyOnHand || 0;
	const stockType = productStock?.inventoryAvailabilityDtos?.[0]?.availability?.messageType;

	const handleChangeQuantity = (value: number) => {
		setQuantity(value);
		if (onChangeQuantity) {
			onChangeQuantity(value);
		}
	};

	return (
		<div className={cn("flex flex-row justify-between items-center gap-2", className)}>
			<QuantityControl
				onChangeQuantity={handleChangeQuantity}
				quantity={quantity}
				showControl={showControl}
			/>

			<AddToBasketCta
				id={id}
				name={name}
				code={code}
				price={price}
				priceDisplay={priceDisplay}
				canAddToCart={canAddToCart && stockType !== StockType.OUT_OF_STOCK}
				url={url}
				quantity={quantity}
				stockQuantity={stockQuantity}
				image={image}
				className={buttonClass}
			/>
		</div>
	);
};

export default AddToBasket;
