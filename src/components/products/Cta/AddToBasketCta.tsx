import { Button } from "@/components/ui/button";
import { useUpdateCart } from "@/hook/useUpdateCart";
import { cn } from "@/lib/utils";
import { CartItem } from "@/store/cart-store";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { useSiteSettingsStore } from "@/store/site-settings-store";

export interface IAddToBasketCta extends CartItem {
	className?: string;
	canAddToCart?: boolean;
	showControl?: boolean;
	buttonClass?: string;
	onChangeQuantity?: (value: number) => void;
}

const AddToBasketCta = ({
	id,
	canAddToCart,
	quantity,
	stockQuantity,
	className,
}: Omit<IAddToBasketCta, "qtyLeft" | "qtyOnHand">) => {
	const { syncCurrentCart } = useUpdateCart();
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const { siteSettings } = useSiteSettingsStore();

	const handleAddToCart = async (id: string) => {
		if (!quantity || quantity < 1) {
			return toast("Quantity should be > 0", {
				type: "error",
				autoClose: siteSettings.CartSettings?.AddToCartPopupTimeout || 3000,
			});
		}
		if (stockQuantity && stockQuantity > 0 && quantity > stockQuantity) {
			return toast(`Only ${stockQuantity} product(s) left in the stock`, {
				type: "error",
				autoClose: siteSettings.CartSettings?.AddToCartPopupTimeout || 3000,
			});
		}
		setIsAddingToCart(true);
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
				autoClose: siteSettings.CartSettings?.AddToCartPopupTimeout || 3000,
			});
		} else {
			toast("Item(s) added to your cart", {
				type: "success",
				autoClose: siteSettings.CartSettings?.AddToCartPopupTimeout || 3000,
			});
		}
		syncCurrentCart();
		setIsAddingToCart(false);
	};

	return (
		<Button
			disabled={!canAddToCart || isAddingToCart}
			className={cn("w-1/2", className)}
			onClick={() => handleAddToCart(id || "")}
			buttonLabel="Add to cart"
		>
			{isAddingToCart ? <LoadingIndicator text="ADDING..." /> : "ADD TO BASKET"}
		</Button>
	);
};

export default AddToBasketCta;
