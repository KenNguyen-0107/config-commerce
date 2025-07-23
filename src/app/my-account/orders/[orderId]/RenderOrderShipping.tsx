"use client";
import LineSkeleton from "@/components/common/LineSkeleton";
import { useOrderHistoryStore } from "@/store/order-history-store";
import React from "react";

const RenderOrderShipping = () => {
	const { orderItem, isLoading } = useOrderHistoryStore();

	if (isLoading) {
		return (
			<div className="space-y-6 text-tertiary">
				<div className="space-y-1">
					<div className="text-sm lg:text-lg text-blue">SHIPPING ADDRESS</div>
					<LineSkeleton height={24} customClass="mt-1" />
					<LineSkeleton height={24} customClass="mt-1" />
					<LineSkeleton height={24} customClass="mt-1" />
					<LineSkeleton height={24} customClass="mt-1" />
				</div>

				<div className="space-y-2">
					<div className="text-sm lg:text-base text-blue">SHIPPING METHOD</div>
					<LineSkeleton height={24} customClass="mt-1" />
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6 text-tertiary">
			<div className="space-y-1 lg:min-h-[139px]">
				<div className="text-sm lg:text-lg text-blue">SHIPPING ADDRESS</div>
				{orderItem.stCompanyName && (
					<p className="font-lora text-sm lg:text-base font-medium">{orderItem.stCompanyName}</p>
				)}
				{orderItem.stAddress1 && (
					<p className="font-lora text-sm lg:text-base font-medium">{orderItem.stAddress1}</p>
				)}
				{orderItem.billToCity && (
					<p className="font-lora text-sm lg:text-base font-medium">{orderItem.billToCity}</p>
				)}
				{orderItem.stCountry && (
					<p className="font-lora text-sm lg:text-base font-medium">{orderItem.stCountry}</p>
				)}
			</div>

			{orderItem.shipViaDescription && (
				<div className="space-y-2">
					<div className="text-sm lg:text-base text-blue">SHIPPING METHOD</div>
					{orderItem.shipViaDescription && (
						<div className="font-lora font-medium">{orderItem.shipViaDescription}</div>
					)}
				</div>
			)}
		</div>
	);
};

export default RenderOrderShipping;
