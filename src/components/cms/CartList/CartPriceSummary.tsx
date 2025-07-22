"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";

export function PriceSummary() {
	const { price } = useCartStore();
	const router = useRouter();

	const handleCheckout = async () => {
		const req = await fetch("/api/address/addressfields");
		if (!req.ok) return;

		const reqFullValidateCart = await fetch("/api/cart/full-validate", {
			method: "GET",
		});
		if (reqFullValidateCart.status !== 200) return;

		router.push(`/checkout/address`);
	};

	return (
		<div className="container mx-auto px-4 py-8 bg-white">
			<div className="grid lg:grid-cols-3 ">
				<div className="col-span-2 hidden lg:block"></div>
				<div>
					<div className="space-y-4 border-b-muted-background border-b pb-4 mb-4">
						<div className="flex justify-between items-center">
							<span className="text-blue font-semibold text-lg">SUBTOTAL</span>
							<span className="text-xl">{price?.subTotal}</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-blue font-semibold text-lg">
								SHIPPING FEE
							</span>
							<span className="text-xl">{price?.shippingFee}</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-blue font-semibold text-lg">DISCOUNT</span>
							<span className="text-xl">{price?.discount}</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-blue font-semibold text-lg">TAX</span>
							<span className="text-xl">{price?.tax}</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-blue font-bold text-2xl">
								TOTAL INC VAT
							</span>
							{/* <span className="font-bold text-2xl">£{getTotalIncVat().toFixed(2)}</span> */}
							<span className="font-bold text-2xl">{price?.totalIncVat}</span>
						</div>
					</div>

					<div className="text-right">
						<Button onClick={() => handleCheckout()} className="text-sm h-12">
							CHECKOUT SECURELY
						</Button>
					</div>
				</div>
			</div>

			{/* <p className="text-sm font-lora text-muted block text-right w-full mt-4">
        I confirm these personal details and addresses are correct
      </p> */}
		</div>
	);
}
