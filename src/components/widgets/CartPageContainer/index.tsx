"use client"

import React from "react";
import { CartPageContainerProps } from "./types";
import CartList from "@/components/cms/CartList";
import { DeliveryInfo } from "@/components/cms/CartList/CartDelivery";
import { PriceSummary } from "@/components/cms/CartList/CartPriceSummary";
import { useCartStore } from "@/store/cart-store";

const CartPageContainer: React.FC<CartPageContainerProps> = () => {
	const { items, isLoadingCart } = useCartStore();

	if (items.length < 1) return (
		<div className="container mx-auto text-center py-20">
			<h2 className="text-muted uppercase">
				{
					isLoadingCart ? "Loading Cart..." : "No product in your cart."
				}
			</h2>
		</div>
	)

	return (
		<div className="py-10 lg:py-20">
			<div className="container mx-auto pb-4 px-4 hidden lg:block">
				<div className="flex justify-end gap-8">
					<h4 className="text-blue">QUANTITY</h4>
					<h4 className="text-blue">SUBTOTAL</h4>
				</div>
			</div>
			<CartList />
			<DeliveryInfo />
			<PriceSummary />
		</div>
	);
};

export default CartPageContainer;
