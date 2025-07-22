import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CartItem, useCartStore } from "@/store/cart-store";
import { useUpdateCart } from "@/hook/useUpdateCart";
import { toast } from "react-toastify";

export interface IAddToBasketCta extends CartItem {
	className?: string;
	canAddToCart?: boolean;
	showControl?: boolean;
	buttonClass?: string;
}

const AddToBasketCta = ({
	id,
	name,
	code,
	price,
	priceDisplay,
	canAddToCart,
	url,
	image,
	quantity,
	className,
}: IAddToBasketCta) => {
	const { addItem, removeItem, setCartId } = useCartStore();
	const { syncCurrentCart } = useUpdateCart();

	const handleAddToCart = async (id: string) => {
		if (!quantity || quantity < 1) {
			return toast("Quantity should be > 0", {
				type: "error",
			});
		}
		const req = await fetch("/api/cart/add-product", {
			method: "POST",
			body: JSON.stringify({
				productId: id,
				qtyOrdered: quantity,
				unitOfMeasure: "EA",
			}),
		});

		if (!req.ok) {
			toast("Something went wrong", {
				type: "error",
			});
		} else {
			toast("Item(s) added to your cart", {
				type: "success",
			});
		}
		syncCurrentCart();
		// addItem({
		// 	id: id,
		// 	name: name,
		// 	code: code,
		// 	price: price,
		// 	priceDisplay: priceDisplay,
		// 	url: url,
		// 	quantity: quantity,
		// 	image: image,
		// });

		// toast("Item(s) added to your cart", {
		// 	type: "success",
		// });

		// validateAddProduct()
	};

	const validateAddProduct = async () => {
		const req = await fetch("/api/cart/validate")
		if (req.status === 200 || !id) {
			const res = await req.text()
			return setCartId(JSON.parse(res).trackId.split("-")[0])
		}

		removeItem(id);

		return toast("Something went wrong", {
			type: "error",
		});
	}

	return (
		<Button
			disabled={!canAddToCart}
			className={cn("w-1/2", className)}
			onClick={() => handleAddToCart(id || "")}
		>
			ADD TO BASKET
		</Button>
	);
};

export default AddToBasketCta;
