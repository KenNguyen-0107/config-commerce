import { CartLine } from "@/components/widgets/Product/types";
import { CartItem, useCartStore } from "@/store/cart-store";
import { useState } from "react";

export const useUpdateCart = () => {
	const { setItems, updatePrice } = useCartStore();
	const [isLoading, setIsLoading] = useState(false);

	const syncCurrentCart = async () => {
		if (isLoading) return;
		setIsLoading(true);
		const req = await fetch("/api/cart/current");
		setIsLoading(false);
		if (req.status === 200) {
			const SITE_HOST =
				process.env.NEXT_PUBLIC_SITE_HOST ||
				"https://jacksonsfencing-configcommerce-d-cl.niteco.dev";
			const res = await req.text();
			const newCart = JSON.parse(res);
			const products: CartItem[] = newCart.cartLines.map((p: CartLine) => {
				return {
					...p,
					id: p.id,
					name: p.shortDescription,
					code: p.erpNumber,
					price: p.pricing.unitListPrice,
					priceDisplay: p.pricing.unitListPriceDisplay,
					quantity: p.qtyOrdered,
					image: p.smallImagePath.replace("http://b2b.local.com:30000", SITE_HOST),
					url: p.productUri,
				};
			});
			updatePrice({
				subTotal: newCart.orderSubTotalDisplay,
				shippingFee: newCart.shippingAndHandlingDisplay,
				// discount: data.orderSubTotalDisplay,
				tax: newCart.totalTaxDisplay,
				totalIncVat: newCart.orderGrandTotalDisplay,
			});
			setItems(products);
			return newCart;
		}
	};

	return {
		syncCurrentCart,
	};
};
