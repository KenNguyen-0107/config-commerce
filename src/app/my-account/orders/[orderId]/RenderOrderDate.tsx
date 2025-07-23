"use client";
import LineSkeleton from "@/components/common/LineSkeleton";
import { convertDate } from "@/components/utils";
import { useOrderHistoryStore } from "@/store/order-history-store";
import React from "react";

const RenderOrderDate = () => {
	const { orderItem } = useOrderHistoryStore();
	return (
		<div className="bg-secondary-background px-4 lg:px-6 py-4">
			<div className="flex flex-wrap gap-y-4">
				<div className="w-1/2 lg:w-48 space-y-2">
					<h3 className="text-blue text-xs lg:text-base mb-0 lg:mb-1">ORDER DATE</h3>
					{orderItem.orderDate ? (
						<p className="text-tertiary font-lora font-medium text-sm lg:text-base">
							{convertDate(orderItem.orderDate || "")}
						</p>
					) : (
						<LineSkeleton width={150} height={24} />
					)}
				</div>
				<div className="w-1/2 lg:w-48 space-y-2">
					<h3 className="text-blue text-xs lg:text-base mb-0 lg:mb-1">PO NUMBER</h3>
					{orderItem.customerPO ? (
						<p className="text-tertiary font-lora font-medium text-sm lg:text-base">
							{orderItem.customerPO}
						</p>
					) : (
						<LineSkeleton width={150} height={24} />
					)}
				</div>
				<div className="w-1/2 lg:w-48 space-y-2">
					<h3 className="text-blue text-xs lg:text-base mb-0 lg:mb-1">STATUS</h3>
					{orderItem.statusDisplay ? (
						<p className="text-tertiary font-lora font-medium text-sm lg:text-base">
							{orderItem.statusDisplay}
						</p>
					) : (
						<LineSkeleton width={150} height={24} />
					)}
				</div>
				<div className="w-1/2 lg:w-48 space-y-2">
					<h3 className="text-blue text-xs lg:text-base mb-0 lg:mb-1">TERM</h3>

					{orderItem.terms ? (
						<p className="text-tertiary font-lora font-medium text-sm lg:text-base">
							{orderItem.terms}
						</p>
					) : (
						<LineSkeleton width={150} height={24} />
					)}
				</div>
			</div>
		</div>
	);
};

export default RenderOrderDate;
