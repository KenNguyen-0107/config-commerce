"use client";
import LineSkeleton from "@/components/common/LineSkeleton";
import { useOrderHistoryStore } from "@/store/order-history-store";
import React from "react";

const RenderOrderBilling = () => {
	const { isLoading, orderItem } = useOrderHistoryStore();

	if (isLoading) {
		return (
			<div className="space-y-6 text-tertiary">
				<div className="space-y-1 lg:min-h-[139px]">
					<div className="text-sm lg:text-lg text-blue">BILLING ADDRESS</div>
					<LineSkeleton height={24} customClass="mt-1" />
					<LineSkeleton height={24} customClass="mt-1" />
					<LineSkeleton height={24} customClass="mt-1" />
					<LineSkeleton height={24} customClass="mt-1" />
				</div>

				<div className="space-y-2">
					<p className="text-sm lg:text-md font-bold text-blue mb-1">ORDER NOTES</p>
					<LineSkeleton height={24} customClass="mt-1" />
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6 text-tertiary">
			<div className="space-y-1 lg:min-h-[139px]">
				<div className="text-sm lg:text-lg text-blue">BILLING ADDRESS</div>
				{orderItem.btCompanyName && (
					<p className="font-lora text-sm lg:text-base font-medium">{orderItem.btCompanyName}</p>
				)}
				{orderItem.btAddress1 && (
					<p className="font-lora text-sm lg:text-base font-medium">{orderItem.btAddress1}</p>
				)}
				{orderItem.billToCity && (
					<p className="font-lora text-sm lg:text-base font-medium">{orderItem.billToCity}</p>
				)}
				{orderItem.btCountry && (
					<p className="font-lora text-sm lg:text-base font-medium">{orderItem.btCountry}</p>
				)}
			</div>

			{orderItem.notes && (
				<div className="space-y-2">
					<p className="text-sm lg:text-md font-bold text-blue mb-1">ORDER NOTES</p>
					<p className="font-lora text-sm lg:text-base font-medium">{orderItem.notes}</p>
				</div>
			)}
		</div>
	);
};

export default RenderOrderBilling;
