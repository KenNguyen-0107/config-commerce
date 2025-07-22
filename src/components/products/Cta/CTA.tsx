"use client"

import { Button } from "@/components/ui/button";
import { getCart } from "@/services/Cart";
import { useCartStore } from "@/store/cart-store";

const PDPCta = () => {
	const { cartId } = useCartStore();


	const test = async () => {
		console.log({cartId})
		const req123 = await getCart({
			cartId: cartId
		})

		console.log({req123})
	} 


	return (
		<div className="flex flex-col lg:flex-row gap-4">
			<Button
				variant="emphasize"
				onClick={() => test()}
			>
				FENCE CALCULATOR
			</Button>

			<Button
				variant="secondary"
				className="border-blue"
				// onClick={() => console.log("Installation Options clicked")}
			>
				INSTALLATION OPTIONS
			</Button>
		</div>
	)
}

export default PDPCta