"use client";

import { SmartLink } from "@/components/shared/smartLink";
import { convertDate } from "@/components/utils";
import { useOrderHistoryStore } from "@/store/order-history-store";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "./TableSkeleton";

const TableBody = () => {
	const { orders, sortDirection, sortField, isLoading } = useOrderHistoryStore();
	const [isWaitingFetchingData, setIsWaitingFetchingData] = useState(true);
	const MINIMUM_QUANTITY_ITEMS = 6;
	useEffect(() => {
		setIsWaitingFetchingData(false);
	}, [orders]);

	const sortedAndPaginatedOrders = useMemo(() => {
		if (orders.length < 1) return [];
		const sorted = [...orders].sort((a, b) => {
			let comparison = 0;

			if (sortField === "date") {
				const [monthA, dayA, yearA] = convertDate(a.orderDate).split("/");
				const [monthB, dayB, yearB] = convertDate(b.orderDate).split("/");

				const dateA = new Date(
					Number.parseInt(yearA),
					Number.parseInt(monthA) - 1,
					Number.parseInt(dayA)
				);
				const dateB = new Date(
					Number.parseInt(yearB),
					Number.parseInt(monthB) - 1,
					Number.parseInt(dayB)
				);

				comparison = dateA.getTime() - dateB.getTime();
			} else if (sortField === "total") {
				const totalA = a.orderTotal;
				const totalB = b.orderTotal;
				comparison = totalA - totalB;
			} else if (sortField === "poNumber") {
				comparison = a.customerPO.localeCompare(b.customerPO);
			} else if (sortField === "status") {
				comparison = a.status.localeCompare(b.status);
			} else if (sortField === "address") {
				comparison = a.btAddress1.localeCompare(b.btAddress1);
			} else if (sortField === "order") {
				comparison = a.webOrderNumber.localeCompare(b.webOrderNumber);
			}

			return sortDirection === "asc" ? comparison : -comparison;
		});

		return sorted;
	}, [orders, sortDirection, sortField]);

	return (
		<tbody className="bg-white">
			{(isLoading || isWaitingFetchingData) && <Skeleton />}
			{!isLoading && !isWaitingFetchingData && sortedAndPaginatedOrders.length < 1 && (
				<>
					<tr className="border-b border-muted-background font-lora text-tertiary text-sm lg:text-base h-[86px] lg:h-[89px]">
						<td className="px-4 py-8 text-left" colSpan={6}>
							No orders found.
						</td>
					</tr>
					{Array.from({ length: MINIMUM_QUANTITY_ITEMS }).map((_, idx) => (
						<tr key={`empty-row-${idx}`} className="h-[89px]">
							<td className="" colSpan={6}></td>
						</tr>
					))}
				</>
			)}

			{!isLoading &&
				!isWaitingFetchingData &&
				sortedAndPaginatedOrders?.map((order, index) => (
					<tr
						key={index}
						className="border-b border-muted-background font-lora text-tertiary text-sm lg:text-base"
					>
						<td className="px-4 py-8 text-left lg:w-[240px]">
							<SmartLink
								className="hover:underline"
								href={`/my-account/orders/${order.webOrderNumber}`}
							>
								{order.webOrderNumber}
							</SmartLink>
						</td>
						<td className="px-4 py-8 text-left table-cell">
							<SmartLink
								className="hover:underline"
								href={`/my-account/orders/details?orderNumber=${index}`}
							>
								{convertDate(order.orderDate)}
							</SmartLink>
						</td>
						<td className="px-4 py-8 text-left">{order.orderGrandTotalDisplay}</td>
						<td className="px-4 py-8 text-left table-cell">{order.statusDisplay}</td>
						<td className="px-4 py-8 text-left table-cell lg:w-[240px]">
							{order.btAddress1 || order.btAddress2}
						</td>
						<td className="px-4 py-8 text-left table-cell">{order.customerPO}</td>
					</tr>
				))}
			{!isLoading &&
				!isWaitingFetchingData &&
				sortedAndPaginatedOrders.length > 0 &&
				Array.from({
					length: Math.max(0, MINIMUM_QUANTITY_ITEMS - sortedAndPaginatedOrders.length),
				}).map((_, idx) => (
					<tr
						key={`empty-row-${idx}`}
						className="font-lora text-tertiary text-sm lg:text-base h-[86px] lg:h-[89px]"
					>
						<td className="px-4 py-8 text-left lg:w-[240px]"></td>
						<td className="px-4 py-8 text-left table-cell"></td>
						<td className="px-4 py-8 text-left"></td>
						<td className="px-4 py-8 text-left table-cell"></td>
						<td className="px-4 py-8 text-left table-cell lg:w-[240px]"></td>
						<td className="px-4 py-8 text-left table-cell"></td>
					</tr>
				))}
		</tbody>
	);
};

export default TableBody;
