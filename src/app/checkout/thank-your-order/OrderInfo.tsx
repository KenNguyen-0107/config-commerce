"use client";

import { convertDate } from "@/components/utils";
import { useUpdateCart } from "@/hook/useUpdateCart";
import { useOrderHistoryStore } from "@/store/order-history-store";
import { useYourOrderStore } from "@/store/your-order-store";
import { useEffect, useState } from "react";

const OrderSkeleton = () => {
	return (
		<div className="space-y-10 animate-pulse">
			<div className="h-7 bg-gray-200 rounded w-1/3"></div>

			<div className="grid grid-cols-3 gap-4">
				<div>
					<div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
					<div className="h-5 bg-gray-200 rounded w-1/2"></div>
				</div>
				<div>
					<div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
					<div className="h-5 bg-gray-200 rounded w-1/2"></div>
				</div>
				<div>
					<div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
					<div className="h-5 bg-gray-200 rounded w-1/2"></div>
				</div>
			</div>

			<div className="mb-8">
				<div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
						<div className="h-5 bg-gray-200 rounded w-full mb-1"></div>
						<div className="h-5 bg-gray-200 rounded w-full mb-1"></div>
						<div className="h-5 bg-gray-200 rounded w-2/3 mb-1"></div>
						<div className="h-5 bg-gray-200 rounded w-1/2 mb-1"></div>
						<div className="h-5 bg-gray-200 rounded w-1/2 mb-1"></div>
						<div className="h-5 bg-gray-200 rounded w-1/3"></div>
					</div>
				</div>
			</div>

			<div className="mb-8">
				<div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
						<div className="h-5 bg-gray-200 rounded w-full mb-1"></div>
						<div className="h-5 bg-gray-200 rounded w-full mb-1"></div>
						<div className="h-5 bg-gray-200 rounded w-2/3 mb-1"></div>
						<div className="h-5 bg-gray-200 rounded w-1/2 mb-1"></div>
						<div className="h-5 bg-gray-200 rounded w-1/2 mb-1"></div>
						<div className="h-5 bg-gray-200 rounded w-1/3"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

const OrderInfo = () => {
	const { yourOrder } = useYourOrderStore();
	const { syncCurrentCart } = useUpdateCart();
	const { setOrderItem, orderItem } = useOrderHistoryStore();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!yourOrder?.orderCode) return;
		const getData = async () => {
			setLoading(true);
			try {
				const data = await fetch(`/api/orders/${yourOrder.orderCode}`, {
					method: "GET",
					cache: "no-store",
				});
				if (data.status !== 200) return;
				const resOrders = await data.json();
				setOrderItem(resOrders);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching order data:", error);
				setLoading(false);
				throw new Error(error as unknown as string);
			}
		};
		getData();
	}, [setOrderItem, yourOrder]);

	useEffect(() => {
		syncCurrentCart();
	}, []);

	if (loading) {
		return <OrderSkeleton />;
	}

	if (!orderItem || !Object.keys(orderItem).length) {
		return <div>No order information available</div>;
	}

	return (
		<div className="space-y-10">
			<h2 className="font-bold text-blue">ORDER #{orderItem.webOrderNumber}</h2>

			<div className="grid grid-cols-3 gap-4">
				<div>
					<p className="text-sm font-bold text-blue mb-1">ORDER DATE</p>
					<p className="text-tertiary font-lora">{convertDate(orderItem.orderDate || "")}</p>
				</div>
				<div>
					<p className="text-sm font-bold text-blue mb-1">PO NUMBER</p>
					<p className="text-tertiary font-lora">{orderItem.customerPO}</p>
				</div>
				<div>
					<p className="text-sm font-bold text-blue mb-1">STATUS</p>
					<p className="text-tertiary font-lora">{orderItem.statusDisplay}</p>
				</div>
			</div>

			<div className="mb-8">
				<h4 className="text-duck font-bold mb-4">SHIPPING INFORMATION</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p className="text-sm font-bold text-blue mb-1">SHIPPING ADDRESS</p>
						<p className="text-tertiary font-lora">{orderItem.stCompanyName}</p>
						<p className="text-tertiary font-lora">{orderItem.stAddress1}</p>
						<p className="text-tertiary font-lora">{orderItem.stCountry}</p>
						<p className="text-tertiary font-lora">{orderItem.shipToCity}</p>
						<p className="text-tertiary font-lora">{orderItem.shipToState}</p>
						<p className="text-tertiary font-lora">{orderItem.shipToPostalCode}</p>
					</div>
				</div>
			</div>

			<div className="mb-8">
				<h4 className="text-duck font-bold mb-4">BILLING INFORMATION</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p className="text-sm font-bold text-blue mb-1">SHIPPING ADDRESS</p>
						<p className="text-tertiary font-lora">{orderItem.btCompanyName}</p>
						<p className="text-tertiary font-lora">{orderItem.btAddress1}</p>
						<p className="text-tertiary font-lora">{orderItem.btCountry}</p>
						<p className="text-tertiary font-lora">{orderItem.billToCity}</p>
						<p className="text-tertiary font-lora">{orderItem.billToState}</p>
						<p className="text-tertiary font-lora">{orderItem.billToPostalCode}</p>
					</div>
				</div>
				{orderItem.notes && (
					<div className="mt-4">
						<p className="text-sm font-bold text-blue mb-1">ORDER NOTES</p>
						<p className="text-tertiary font-lora">{orderItem.notes}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderInfo;
