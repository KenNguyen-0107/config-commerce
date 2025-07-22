import { CartLine } from "@/components/widgets/Product/types";
import { CartItem, useCartStore } from "@/store/cart-store";

export const useUpdateCart = () => {
    const { setItems, updatePrice } = useCartStore();

    const syncCurrentCart = async () => {
        const req = await fetch("/api/cart/current");
        if (req.status === 200) {
            const res = await req.text()
            const newCart = JSON.parse(res)
            const products: CartItem[] = newCart.cartLines.map((p: CartLine) => {
                return {
                    ...p,
                    id: p.id,
                    name: p.shortDescription,
                    code: p.erpNumber,
                    price: p.pricing.unitListPrice,
                    priceDisplay: p.pricing.unitListPriceDisplay,
                    quantity: p.qtyOrdered,
                    image: p.smallImagePath.replace("http://b2b.local.com:30000", "https://jacksonsfencing-configcommerce-d-cl.niteco.dev"),
					// image: p.smallImagePath.replace("http://b2b.local.com:30000", ""),
                    url: p.productUri
                }
            })
            updatePrice({
                subTotal: newCart.orderSubTotalDisplay,
                shippingFee: newCart.shippingAndHandlingDisplay,
                // discount: data.orderSubTotalDisplay,
                tax: newCart.totalTaxDisplay,
                totalIncVat: newCart.orderGrandTotalDisplay,
            });
            setItems(products)
        }
    }


    return {
        syncCurrentCart
    }
};