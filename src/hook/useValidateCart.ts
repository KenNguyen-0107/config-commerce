import { CartLine } from "@/components/widgets/Product/types";
import { CartItem, useCartStore } from "@/store/cart-store";
import { useCallback, useEffect } from "react";

export const useValidateCart = () => {
	const { removeAllItems, setItems } = useCartStore();

	const validateCart = useCallback(async () => {
		const req = await fetch("/api/cart/current");
		if (req.status === 200) {
			const res = await req.text();
			const products: CartItem[] = JSON.parse(res).cartLines.map((p: CartLine) => {
				const SITE_HOST =
					process.env.NEXT_PUBLIC_SITE_HOST ||
					"https://jacksonsfencing-configcommerce-d-cl.niteco.dev";
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
			return setItems(products);
		}

		removeAllItems();
	}, [removeAllItems, setItems]);

	useEffect(() => {
		validateCart();
	}, [validateCart]);
};
