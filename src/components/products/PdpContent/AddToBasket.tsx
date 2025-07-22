"use client";

import { useState } from "react";
import AddToBasketCta, { IAddToBasketCta } from "../Cta/AddToBasketCta";
import QuantityControl from "../Cta/QuantityControl";
import { cn } from "@/lib/utils";

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
}: Omit<IAddToBasketCta, "quantity">) => {
	const [quantity, setQuantity] = useState(1);

	const onChangeQuantity = (value: number) => {
		setQuantity(value);
	};

	return (
		<div className={cn(
			"flex flex-col lg:flex-row justify-between lg:items-center gap-2",
			className
		)}>
			<QuantityControl
				onChangeQuantity={onChangeQuantity}
				quantity={quantity}
				showControl={showControl}
			/>

			<AddToBasketCta
				id={id}
				name={name}
				code={code}
				price={price}
				priceDisplay={priceDisplay}
				canAddToCart={canAddToCart}
				url={url}
				quantity={quantity}
				image={image}
				className={buttonClass}
			/>
		</div>
	);
};

export default AddToBasket;
