"use client";
import { useOrderHistoryStore } from "@/store/order-history-store";
import React, { useEffect } from "react";

const OrderDetail = ({ orderId }: { orderId: string }) => {
	const { setLoading, setOrderItem } = useOrderHistoryStore();

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true);
				const data = await fetch(`/api/orders/${orderId}`, {
					method: "GET",
				});
				if (data.status !== 200) return;
				const resOrders = JSON.parse(await data.text());
				setOrderItem(resOrders);
			} catch (error) {
				throw new Error(error as unknown as string);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

	return <></>;
};

export default OrderDetail;
