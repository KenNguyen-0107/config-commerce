"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

const MiniCartMobile = () => {
	const { items, getAllQuantity } = useCartStore();

	return (
		<Button
			variant="secondary"
			size="icon"
			buttonLabel="Cart"
			href="/cart"
			className="hover:bg-transparent p-0 hover:text-blue relative"
			title="Cart"
		>
			<img src={`/icons/cart.svg`} alt="cart" width={24} height={24} />
			{!!items.length && (
				<span className="absolute -top-1 left-2 bg-yellow w-5 h-5 text-sm inline-flex justify-center items-center rounded-full">
					{getAllQuantity()}
				</span>
			)}
		</Button>
	);
};

export default MiniCartMobile;
