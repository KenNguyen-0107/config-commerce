"use client";

import { Button } from "@/components/ui/button";
import { getCart } from "@/services/Cart";
import { useCartStore } from "@/store/cart-store";

const PDPCta = () => {
	const { cartId } = useCartStore();

	const test = async () => {
		const req123 = await getCart({
			cartId: cartId,
		});
	};

	return (
		<div className="flex flex-col lg:flex-row gap-4">
			<Button
				variant="emphasize"
				onClick={() => test()}
				className="py-3 lg:py-4"
				title="Fence calculator"
			>
				FENCE CALCULATOR
			</Button>

			<Button variant="secondary" className="border-blue py-3 lg:py-4" title="Installation options">
				INSTALLATION OPTIONS
			</Button>
		</div>
	);
};

export default PDPCta;
