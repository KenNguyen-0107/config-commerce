import { HttpMethod } from "@/app/api/clientApi";
import Icon from "@/components/shared/icons";
import { SmartLink } from "@/components/shared/smartLink";
import { Input } from "@/components/ui/input";
import { getImgSrc, NoImageSrc } from "@/components/utils";
import { CartLine } from "@/components/widgets/Product/types";
import { useUpdateCart } from "@/hook/useUpdateCart";
import { cn } from "@/lib/utils";
import { CartItem as CartItemProps, useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { useEffect, useState } from "react";
export function CartItem({
	id,
	name,
	priceDisplay,
	quantity,
	qtyLeft,
	qtyOnHand,
	code,
	image,
	url,
	pricing,
	availability,
}: CartItemProps) {
	const { updateQuantity, removeItem, updatePrice, setStockMessage } = useCartStore();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const { syncCurrentCart } = useUpdateCart();

	useEffect(() => {
		let message = "";
		if (availability?.messageType !== 0 && qtyOnHand && qtyOnHand > 0) {
			message =
				qtyLeft && qtyLeft < 0 ? `${qtyOnHand} of ${quantity} requested items are in stock` : "";
		}
		setErrorMessage(message);
	}, [availability, qtyLeft, qtyOnHand, quantity]);

	const getNewCart = async (id?: string, quantity?: number) => {
		try {
			const newCart = await fetch("/api/cart/current");
			const data = JSON.parse(await newCart.text());
			updatePrice({
				subTotal: data.orderSubTotalDisplay,
				shippingFee: data.shippingAndHandlingDisplay,
				tax: data.totalTaxDisplay,
				totalIncVat: data.orderGrandTotalDisplay,
			});

			if (id && quantity) {
				updateQuantity(id, quantity);
			}
			setStockMessage(data.cartLines);
		} catch (error) {
			console.log(error);
		}
	};

	const changeQuantity = async (id: string, quantity: number) => {
		if (isLoading) {
			return;
		}
		try {
			if (!id) return;
			setIsLoading(true);
			const reqCart = await fetch("/api/cart/current");
			if (reqCart.status !== 200) return;

			const res = await reqCart.text();
			const targetProduct = JSON.parse(res).cartLines.find(
				(cartline: CartLine) => cartline.id === id
			);

			if (!!targetProduct === false) return;

			const reqPatchProduct = await fetch("/api/cart/patch-product/" + targetProduct.id, {
				method: HttpMethod.PATCH,
				body: JSON.stringify({
					id: targetProduct.id,
					qtyOrdered: quantity,
				}),
			});
			if (reqPatchProduct.status !== 200) return;
			syncCurrentCart();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemoveProduct = async (id: string) => {
		if (!id || isLoading) return;
		try {
			setIsLoading(true);
			const reqCart = await fetch("/api/cart/current");
			if (reqCart.status !== 200) return;

			const res = await reqCart.text();
			const targetProduct = JSON.parse(res).cartLines.find(
				(cartline: CartLine) => cartline.id === id
			);
			if (!!targetProduct === false) return;

			const reqRemoveProduct = await fetch("/api/cart/remove-product/" + targetProduct.id, {
				method: HttpMethod.DELETE,
				body: JSON.stringify({
					id: targetProduct.id,
				}),
			});

			if ([200, 500].includes(reqRemoveProduct.status)) {
				removeItem(id);
				await getNewCart();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const applyChangeQuatity = (value: string = "1") => {
		changeQuantity(id || "", parseInt(value));
	};

	const onBlurQuatityInput = (e: React.FocusEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (!value) {
			applyChangeQuatity("1");
			return;
		}
		applyChangeQuatity(value);
	};

	const ACCEPTED_KEY = ["Backspace", "ArrowLeft", "ArrowRight"];

	const onKeyDownQuatity = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		if (e.key === "Enter") {
			applyChangeQuatity(target.value);
		}
		if (!/^\d$/.test(e.key) && !ACCEPTED_KEY.includes(e.key)) {
			e.preventDefault();
		}
	};

	const stockBadge = () => {
		if (!availability || availability?.messageType === 0) {
			return null;
		}
		const stockText =
			availability.messageType === 1
				? "In Stock"
				: availability.messageType === 3
				? "Low Stock"
				: "Out of Stock";
		const stockClass =
			availability.messageType === 2 ? "text-red bg-red/10" : "text-green bg-green/10";
		return (
			<span
				className={cn("inline-flex items-center gap-1 pl-2 pr-3 rounded py-1 text-sm", stockClass)}
			>
				{stockText}
			</span>
		);
	};

	return (
		<div
			className={cn(
				"grid grid-cols-[100px,auto] lg:grid-cols-[240px,auto] items-start lg:items-center gap-6 lg:px-0 p-4 border-t border-[#8C8B90] disabled",
				isLoading && "animate-pulse pointer-events-none"
			)}
		>
			<SmartLink href={url || ""} className="w-[100px] h-[100px] lg:w-60 lg:h-60">
				<Image
					src={image || getImgSrc(NoImageSrc)}
					alt={name || ""}
					width={240}
					height={240}
					className="w-full h-full object-contain"
				/>
			</SmartLink>
			<div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
				<div className="space-y-1 lg:space-y-4 flex-grow">
					<SmartLink href={url || ""}>
						<h3 className="text-blue uppercase">{name}</h3>
					</SmartLink>
					<p className="text-[#0A0F2F] font-semibold lg:text-xl lg:mt-2 flex flex-row items-center gap-2">
						{pricing?.actualPriceDisplay || priceDisplay}
						{stockBadge()}
					</p>
					<p className="text-[#555555] text-sm font-lora lg:text-base">Product Code: {code}</p>
					{errorMessage && <p className="text-red font-lora">{errorMessage}</p>}
				</div>

				<div className="flex gap-6 lg:gap-2 w-full lg:w-auto">
					<Input
						type="text"
						defaultValue={quantity}
						placeholder={quantity?.toString()}
						className="h-14 w-14 border-[#8C8B9080] text-sm rounded p-4 text-center"
						onKeyDown={onKeyDownQuatity}
						onBlur={onBlurQuatityInput}
						ariaLabel="Product quantity"
					/>

					<div className=" flex flex-col gap-6 lg:gap-0 items-end justify-between w-full">
						<p className="text-[#0A0F2F] lg:text-xl lg:mb-2 flex flex-col text-right min-w-[8rem] gap-1">
							<span className="font-semibold leading-5 text-xl">
								{pricing?.extendedActualPriceDisplay}
							</span>
							<span className="text-[#555555] text-xs font-lora">EXC VAT</span>
						</p>
						<button
							onClick={() => handleRemoveProduct(id || "")}
							className="flex gap-1 items-center text-blue font-semibold hover:underline"
						>
							<Icon iconName="trash" size={16} viewSize={18} />
							REMOVE
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
