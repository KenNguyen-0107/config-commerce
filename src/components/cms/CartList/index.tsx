"use client";

import { useCartStore } from "@/store/cart-store";
import { CartItem } from "./CartItem";

export default function CartList() {
	const { items } = useCartStore();
	if (items?.length < 1) return null;

	return (
		<div className="container mx-auto max-h-[200vh] overflow-y-auto mb-10 px-4">
			{items.map((item) => (
				<CartItem key={item.id} {...item} />
			))}
		</div>
	);
}
