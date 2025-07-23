"use client";

import React from "react";
import { CartPageContainerProps } from "./types";
import CartList from "@/components/cms/CartList";
import { DeliveryInfo } from "@/components/cms/CartList/CartDelivery";
import { PriceSummary } from "@/components/cms/CartList/CartPriceSummary";
import { useCartStore } from "@/store/cart-store";
import LineSkeleton from "@/components/common/LineSkeleton";

const CartPageContainer: React.FC<CartPageContainerProps> = () => {
	const { items, isLoadingCart } = useCartStore();

	const CartItemSkeleton = () => {
		return (
			<div className="grid grid-cols-[100px,auto] lg:grid-cols-[240px,auto] items-start lg:items-center gap-6 lg:px-0 p-4 border-t border-[#8C8B90] animate-pulse">
				{/* Image skeleton */}
				<div className="w-[100px] h-[100px] lg:w-60 lg:h-60 bg-gray-200 rounded" />

				<div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full">
					<div className="space-y-1 lg:space-y-4 flex-grow">
						{/* Title skeleton */}
						<div className="h-6 bg-gray-200 rounded w-3/4" />

						{/* Price skeleton */}
						<div className="h-7 bg-gray-200 rounded w-1/4 lg:mt-2" />

						{/* Product code skeleton */}
						<div className="h-5 bg-gray-200 rounded w-1/2" />
					</div>

					<div className="flex gap-6 lg:gap-2 w-full lg:w-auto">
						{/* Quantity input skeleton */}
						<div className="h-14 w-14 bg-gray-200 rounded" />

						<div className="flex flex-col gap-6 lg:gap-0 items-end justify-between w-full">
							{/* Price skeleton */}
							<div className="flex flex-col text-right min-w-[8rem] gap-1">
								<div className="h-7 bg-gray-200 rounded w-full" />
								<div className="h-4 bg-gray-200 rounded w-1/2 self-end" />
							</div>

							{/* Remove button skeleton */}
							<div className="h-6 bg-gray-200 rounded w-24" />
						</div>
					</div>
				</div>
			</div>
		);
	};

	const ListCartSkeleton = () => (
		<div className="w-full container">
			<div className="mx-auto pb-4 px-4">
				<div className="flex justify-between ml-10 pl-[100px] lg:ml-0 lg:pl-0 lg:justify-end gap-10 lg:gap-8">
					<LineSkeleton height={32} width={81} />
					<LineSkeleton height={32} width={81} />
				</div>
			</div>
			<CartItemSkeleton />
			<CartItemSkeleton />
		</div>
	);

	if (items.length < 1) {
		return (
			<div className=" mx-auto text-center py-20 lg:min-h-[500px] flex justify-center items-center">
				{isLoadingCart ? (
					<ListCartSkeleton />
				) : (
					<h2 className="text-muted uppercase">No product in your cart.</h2>
				)}
			</div>
		);
	}

	return (
		<div className="py-10 lg:py-20">
			<div className="container mx-auto pb-4 px-4">
				<div className="flex justify-between ml-10 pl-[100px] lg:ml-0 lg:pl-0 lg:justify-end gap-10 lg:gap-8">
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
