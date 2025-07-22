"use client";

import Icon from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { useUpdateCart } from "@/hook/useUpdateCart";
import { useValidateCart } from "@/hook/useValidateCart";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MiniCart = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { items, getAllQuantity, price } = useCartStore();
	const { syncCurrentCart } = useUpdateCart()

	useEffect(() => {
		syncCurrentCart()
	}, [])

	return (
		<div
			className="relative"
			onMouseOver={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<Button
				variant="secondary"
				size="icon"
				buttonLabel="Cart"
				href="/cart"
				onClick={() => setIsOpen(false)}
				className="hover:bg-transparent p-0 hover:text-blue"
			>
				<Icon
					iconName="cart"
					size={24}
					viewSize={24}
					className="h-6 w-6 lg:h-10 lg:w-10"
				/>
				{!!items.length && (
					<span className="absolute top-0 left-4 bg-yellow w-5 h-5 text-sm inline-flex justify-center items-center rounded-full">
						{getAllQuantity()}
					</span>
				)}
			</Button>

			{isOpen && items.length < 1 && (
				<div className="absolute top-full right-0 z-20 bg-white w-full lg:w-content max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
					<div className="p-4 border-b border-light-gray-background text-muted">
						No product in your cart.
					</div>
				</div>
			)}

			{isOpen && !!items.length && (
				<div className="absolute top-full right-0 z-20 bg-muted-background w-full lg:w-[480px] max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
					<div className="p-4 border-b border-light-gray-background uppercase text-base">
						BASKET
					</div>

					<div className="p-4 space-y-6 max-h-[350px] overflow-y-auto border-b border-t border-opacity-50 border-[#6B8096]">
						{items.map((item) => (
							<div key={item.id} className="flex gap-4">
								<Link
									href={item.url || "/"}
									className="w-24 h-24 bg-light-gray-background rounded-md overflow-hidden"
								>
									<Image
										src={item.image || "/placeholder.svg"}
										alt={item.name || "cart image"}
										width={100}
										height={100}
										className="w-full h-full object-cover"
									/>
								</Link>
								<div className="flex-1 min-w-0">
									<Link href={item.url || "/"}>
										<h3 className="text-blue font-medium text-sm mb-2 uppercase">
											{item.name}
										</h3>
									</Link>
									<div className="flex justify-between items-center">
										<p className="font-semibold text-md text-[#0A0F2F]">{item.priceDisplay}</p>
										<div className="flex items-center gap-4">
											<span className="text-muted text-[#6B8096]">
												Quantity:{" "}
												<span className="text-blue">{item.quantity}</span>
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="p-4 bg-light-gray-background">
						<h3 className="flex justify-end items-center mb-4 text-[#0A0F2F]">
							SUB TOTAL: {price.subTotal}
						</h3>
						<div className="grid grid-cols-2 gap-4">
							<Button
								href="/cart"
								variant="tertiary"
								className="w-full border-blue text-blue hover:bg-blue hover:text-white"
								onClick={() => setIsOpen(false)}
							>
								VIEW BASKET
							</Button>
							<Button
								href="/checkout/address"
								className="w-full bg-blue text-white hover:bg-duck"
							>
								CHECK OUT
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MiniCart;
