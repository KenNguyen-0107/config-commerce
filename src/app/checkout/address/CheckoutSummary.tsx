"use client";

import { SmartLink } from "@/components/shared/smartLink";
import { useFetchStock } from "@/hook/useFetchStock";
import { useCartStore } from "@/store/cart-store";
import { useOrderHistoryStore } from "@/store/order-history-store";
import { useSiteSettingsStore } from "@/store/site-settings-store";
import { useStockStore } from "@/store/stock-store";
import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";

const CheckoutSummarySkeleton = ({
	isOrderConfirmation = false,
}: {
	isOrderConfirmation?: boolean;
}) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-6 animate-pulse">
			<div className="flex justify-between">
				<div className="h-7 bg-gray-200 rounded w-1/3"></div>
				{!isOrderConfirmation && <div className="h-5 bg-gray-200 rounded w-[120px]"></div>}
			</div>

			<div className="max-h-[440px] overflow-y-auto">
				{[1, 2].map((item, index) => (
					<div
						key={item}
						className={`flex gap-10 justify-between items-start py-6 border-b-[1px] border-muted ${
							index === 0 ? "border-t-[1px]" : ""
						}`}
					>
						<div className="space-y-3 w-2/3">
							<div className="h-5 bg-gray-200 rounded w-full"></div>
							<div className="h-5 bg-gray-200 rounded w-1/2"></div>
							<div className="h-4 bg-gray-200 rounded w-1/3"></div>
							<div className="h-4 bg-gray-200 rounded w-1/4"></div>
						</div>
						<div className="h-6 bg-gray-200 rounded w-[80px]"></div>
					</div>
				))}
			</div>
			<div className="grid grid-cols-3 py-8">
				<div className="col-start-1 col-span-3 lg:col-start-2 lg:col-span-2 space-y-4">
					<div className="flex justify-between">
						<div className="h-5 bg-gray-200 rounded w-1/4"></div>
						<div className="h-5 bg-gray-200 rounded w-[90px]"></div>
					</div>
					<div className="flex justify-between">
						<div className="h-5 bg-gray-200 rounded w-1/3"></div>
						<div className="h-5 bg-gray-200 rounded w-[90px]"></div>
					</div>
					<div className="flex justify-between">
						<div className="h-5 bg-gray-200 rounded w-1/4"></div>
						<div className="h-5 bg-gray-200 rounded w-[90px]"></div>
					</div>
					<div className="flex justify-between">
						<div className="h-5 bg-gray-200 rounded w-1/5"></div>
						<div className="h-5 bg-gray-200 rounded w-[90px]"></div>
					</div>
					<div className="flex justify-between">
						<div className="h-7 bg-gray-200 rounded w-1/3"></div>
						<div className="h-7 bg-gray-200 rounded w-[100px]"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

const CheckoutSummary = ({ from }: { from?: string }) => {
	const { items, price } = useCartStore();
	const { orderItem } = useOrderHistoryStore();
	const { siteMessages } = useSiteSettingsStore();
	const { stock } = useStockStore();

	useFetchStock(items.map((item) => item.productId as string));

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check if data is available based on the current view
		if (from !== "OrderConfirmation") {
			// For regular checkout view, check if items and stock data are available
			if (items && items.length > 0 && stock) {
				setIsLoading(false);
			}
		} else {
			// For order confirmation view, check if orderItem and its orderLines are available
			if (orderItem && orderItem.orderLines && orderItem.orderLines.length > 0) {
				setIsLoading(false);
			}
		}
	}, [items, orderItem, stock, from]);

	// If still loading, show the skeleton
	if (isLoading) {
		return <CheckoutSummarySkeleton isOrderConfirmation={from === "OrderConfirmation"} />;
	}

	if (from !== "OrderConfirmation") {
		return (
			<div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-6">
				<div className="flex justify-between">
					<h2 className="text-2xl lg:text-xl font-semibold text-blue">ORDER SUMMARY</h2>
					<SmartLink
						title="edit basket"
						href="/cart"
						className="flex items-center text-blue font-medium text-sm lg:text-md"
					>
						<PenLine size={20} className="mr-2" />
						EDIT BASKET
					</SmartLink>
				</div>

				<div className="max-h-[440px] overflow-y-auto">
					{items?.map((item, index) => (
						<div
							key={item.id}
							className={`flex gap-10 justify-between items-start py-6 border-b-[1px] border-muted ${
								index === 0 ? "border-t-[1px]" : ""
							}`}
						>
							<div className="space-y-1">
								<h3 className="font-medium text-blue text-lg uppercase">{item.name}</h3>
								<div className="text-md lg:text-xl text-tertiary">
									{item.pricing?.actualPriceDisplay || item.priceDisplay}
								</div>
								<p className="text-xs lg:text-sm text-muted font-lora">Product Code: {item.code}</p>
								<p className="text-lg">{item.quantity}</p>
							</div>
							{(item?.pricing?.actualPrice || item?.price) && (
								<p className="font-medium text-xl lg:text-lg text-tertiary">
									£
									{(
										(item?.pricing?.actualPrice || item.price || 0) * (item?.quantity || 1)
									).toFixed(2)}
								</p>
							)}
						</div>
					))}
				</div>
				<div className="grid grid-cols-3 py-8">
					<div className="col-start-1 col-span-3 lg:col-start-2 lg:col-span-2 space-y-2">
						<div className="flex justify-between">
							<p className="text-sm lg:text-lg text-blue">SUBTOTAL</p>
							<p className="font-medium text-md lg:text-xl text-tertiary">{price?.subTotal}</p>
						</div>
						<div className="flex justify-between">
							<p className="text-sm lg:text-lg text-blue">SHIPPING FEE</p>
							<p className="font-medium text-md lg:text-xl text-tertiary">{price?.shippingFee}</p>
						</div>
						<div className="flex justify-between ">
							<p className="text-sm lg:text-lg text-blue">DISCOUNT</p>
							<p className="font-medium text-md lg:text-xl text-tertiary">{price?.discount}</p>
						</div>
						<div className="flex justify-between ">
							<p className="text-sm lg:text-lg text-blue">TAX</p>
							<p className="font-medium text-md lg:text-xl text-tertiary">
								{price?.tax === "TBD" ? "£0.00" : price?.tax}
							</p>
						</div>
						<div className="flex justify-between text-xl lg:text-2xl font-bold text-blue">
							<p>TOTAL INC VAT</p>
							<p className="text-tertiary">{price.totalIncVat}</p>
						</div>
					</div>
				</div>

				{stock?.find((s) => items.find((p) => (p.quantity as number) > s.qtyOnHand)) && (
					<div
						className="text-red [&_a]:text-blue [&_a]:underline"
						dangerouslySetInnerHTML={{
							__html:
								siteMessages.find((m) => m.Key === "ReviewAndPay_NotEnoughInventoryForPickup")
									?.Value || "",
						}}
					/>
				)}
			</div>
		);
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-6">
			<div className="flex justify-between">
				<h2 className="text-2xl lg:text-xl font-semibold text-blue">ORDER SUMMARY</h2>
			</div>

			<div className="max-h-[440px] overflow-y-auto">
				{orderItem?.orderLines?.map((item, index) => (
					<div
						key={item.id}
						className={`flex gap-10 justify-between items-start py-6 border-b-[1px] border-muted ${
							index === 0 ? "border-t-[1px]" : ""
						}`}
					>
						<div className="space-y-1">
							<h3 className="font-medium text-blue text-lg uppercase">{item.description}</h3>
							<div className="text-md lg:text-xl text-tertiary">{item.unitPriceDisplay}</div>
							<p className="text-xs lg:text-sm text-muted font-lora">
								Product Code: {item.productErpNumber}
							</p>
							<p className="text-lg">{item.qtyOrdered}</p>
						</div>

						<p className="font-medium text-xl lg:text-lg text-tertiary">
							{item.totalRegularPriceDisplay}
						</p>
					</div>
				))}
			</div>
			<div className="grid grid-cols-3 py-8">
				<div className="col-start-1 col-span-3 lg:col-start-2 lg:col-span-2 space-y-2">
					<div className="flex justify-between">
						<p className="text-sm lg:text-lg text-blue">SUBTOTAL</p>
						<p className="font-medium text-md lg:text-xl text-tertiary">
							{orderItem?.orderSubTotalDisplay}
						</p>
					</div>
					<div className="flex justify-between">
						<p className="text-sm lg:text-lg text-blue">SHIPPING FEE</p>
						<p className="font-medium text-md lg:text-xl text-tertiary">
							{orderItem?.shippingChargesDisplay}
						</p>
					</div>
					<div className="flex justify-between ">
						<p className="text-sm lg:text-lg text-blue">DISCOUNT</p>
						<p className="font-medium text-md lg:text-xl text-tertiary">
							{orderItem?.discountAmountDisplay}
						</p>
					</div>
					<div className="flex justify-between ">
						<p className="text-sm lg:text-lg text-blue">TAX</p>
						<p className="font-medium text-md lg:text-xl text-tertiary">
							{orderItem?.taxAmountDisplay === "TBD" ? "£0.00" : orderItem?.taxAmountDisplay}
						</p>
					</div>
					<div className="flex justify-between text-xl lg:text-2xl font-bold text-blue">
						<p>TOTAL INC VAT</p>
						<p className="text-tertiary">{orderItem.orderTotalDisplay}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutSummary;
