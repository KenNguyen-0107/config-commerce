"use client";

import { SmartLink } from "@/components/shared/smartLink";
import { convertDate } from "@/components/utils";
import { useFetchOrdersHistory } from "@/hook/useFetchOrdersHistory";
import { useOrderHistoryStore } from "@/store/order-history-store";
import React, { Fragment, useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import { CommonRecentOrdersProps } from "./types";

const CommonRecentOrders: React.FC<CommonRecentOrdersProps> = () => {
	const { orders, isLoading } = useOrderHistoryStore();
	const [isWaitingFetchingData, setIsWaitingFetchingData] = useState(true);
	useFetchOrdersHistory();

	useEffect(() => {
		setIsWaitingFetchingData(false);
	}, [orders]);

	const MINIMUM_QUANTITY = 5;

	return (
		<div>
			<div className="flex justify-between items-center bg-secondary-background px-4 py-2 lg:px-6 lg:py-4">
				<h5 className="text-blue">RECENT ORDERS</h5>
				<SmartLink
					href="/my-account/orders"
					className="text-blue text-sm lg:text-base hover:underline"
				>
					VIEW ALL
				</SmartLink>
			</div>

			<div className="bg-white px-4 lg:px-6 py-6 lg:py-[30px]">
				{orders?.length < 1 && !isLoading && !isWaitingFetchingData && (
					<p className="text-blue font-lora">You have not placed any order!</p>
				)}
				{(isLoading || isWaitingFetchingData) && <Skeleton />}
				{!(isLoading || isWaitingFetchingData) &&
					orders?.slice(0, 5).map((order, index) => (
						<Fragment key={index}>
							{index !== 0 && <div className="h-[1px] w-full bg-muted my-6"></div>}
							<div className="grid grid-cols-2 lg:grid-cols-4 lg:items-center gap-4">
								<div className="flex flex-col gap-2">
									<h6 className="text-blue text-xs lg:text-base">ORDER DATE</h6>
									<p className="text-tertiary font-lora font-medium text-sm lg:text-base">
										{convertDate(order.orderDate)}
									</p>
								</div>
								<div className="flex flex-col gap-2">
									<h6 className="text-blue text-xs lg:text-base">ORDER NUMBER #</h6>
									<SmartLink
										className="text-tertiary font-lora font-medium text-sm lg:text-base hover:underline"
										href={`/my-account/orders/${order.webOrderNumber}`}
									>
										{order.webOrderNumber}
									</SmartLink>
								</div>
								<div className="flex flex-col gap-2">
									<h6 className="text-blue text-xs lg:text-base">STATUS</h6>
									<p className="text-tertiary font-lora font-medium text-sm lg:text-base">
										{order.statusDisplay}
									</p>
								</div>
								<div className="flex flex-col gap-2 lg:text-right">
									<h6 className="text-blue text-xs lg:text-base">TOTAL</h6>
									<p className="text-tertiary font-lora font-medium text-sm lg:text-base">
										{order.orderTotalDisplay}
									</p>
								</div>
							</div>
						</Fragment>
					))}
				{!(isLoading || isWaitingFetchingData) &&
					orders.length < MINIMUM_QUANTITY &&
					Array.from({
						length: Math.max(0, MINIMUM_QUANTITY - orders.length),
					}).map((order, index) => (
						<Fragment key={index}>
							<div className="h-[1px] w-full my-6"></div>
							<div className="grid grid-cols-2 lg:grid-cols-4 lg:items-center gap-4">
								<div className="flex flex-col gap-2">
									<div className="h-6 rounded animate-pulse w-24"></div>
									<div className="h-6 rounded animate-pulse w-24"></div>
								</div>
								<div className="flex flex-col gap-2">
									<div className="h-6 rounded animate-pulse w-32"></div>
									<div className="h-6 rounded animate-pulse w-24"></div>
								</div>
								<div className="flex flex-col gap-2">
									<div className="h-6 rounded animate-pulse w-16"></div>
									<div className="h-6 rounded animate-pulse w-24"></div>
								</div>
								<div className="flex flex-col gap-2">
									<div className="h-6 rounded animate-pulse w-16 ml-auto"></div>
									<div className="h-6 rounded animate-pulse w-16 ml-auto"></div>
								</div>
							</div>
						</Fragment>
					))}
			</div>
		</div>
	);
};

export default CommonRecentOrders;
