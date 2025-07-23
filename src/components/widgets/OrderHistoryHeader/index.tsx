"use client";

import { useOrderHistoryStore } from "@/store/order-history-store";
import { OrderHistoryHeaderProps } from "./types";
import { useState, useEffect } from "react";
import LineSkeleton from "@/components/common/LineSkeleton";

const OrderHistoryHeader: React.FC<OrderHistoryHeaderProps> = () => {
	const { totalItemCount, orders, isLoading } = useOrderHistoryStore();

	const [isWaitingFetchingData, setIsWaitingFetchingData] = useState(true);

	useEffect(() => {
		setIsWaitingFetchingData(false);
	}, [orders]);

	return isLoading || isWaitingFetchingData ? (
		<LineSkeleton customClass="mb-4" height={29} />
	) : (
		<h5 className="text-duck mb-4 text-lg">{totalItemCount || 0} ORDERS</h5>
	);
};

export default OrderHistoryHeader;
