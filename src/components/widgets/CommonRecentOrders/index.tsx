"use client";

import { HttpMethod } from "@/app/api/clientApi";
import { convertDate } from "@/components/utils";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { CommonRecentOrdersProps, IOrder } from "./types";

const CommonRecentOrders: React.FC<CommonRecentOrdersProps> = () => {
	const [orders, setOrders] = useState<IOrder[]>([]);

	useEffect(() => {
		const getRecentOrders = async () => {
			const reqCurrentSession = await fetch("/api/sessions/current");
			if (reqCurrentSession.status !== 200) return;

			const reqOrders = await fetch("/api/orders/history", { method: HttpMethod.GET });
			if (reqOrders.status !== 200) return;

			const resOrders = JSON.parse(
				await reqOrders.text()
			).orders as unknown as IOrder[];
			setOrders(Array.from(resOrders));
		};

		getRecentOrders();
	}, []);

	if (orders.length === 0) return null;

	return (
		<div>
			<div className="flex justify-between items-center bg-secondary-background px-6 py-4">
				<h5 className="text-blue font-bold">RECENT ORDERS</h5>
				<Link href="/my-account/order-history" className="text-blue font-bold">
					VIEW ALL
				</Link>
			</div>

			<div className="bg-white px-4 lg:px-6 py-6 lg:py-[30px]">
				{orders.map((order, index) => (
					<Fragment key={index}>
						{index !== 0 && (
							<div className="h-[1px] w-full bg-muted my-6"></div>
						)}
						<div className="grid grid-cols-2 md:grid-cols-4 md:items-center">
							<div className="flex flex-col gap-2">
								<h6 className="text-blue font-bold text-base">ORDER DATE</h6>
								<p className="text-tertiary font-lora font-medium">
									{convertDate(order.orderDate)}
								</p>
							</div>
							<div className="flex flex-col gap-2">
								<h6 className="text-blue font-bold text-base">
									ORDER NUMBER #
								</h6>
								<Link
									className="text-tertiary font-lora font-medium hover:underline"
									href={`/my-account/order-history/${order.webOrderNumber}`}
								>
									{order.webOrderNumber}
								</Link>
							</div>
							<div className="flex flex-col gap-2">
								<h6 className="text-blue font-bold text-base">STATUS</h6>
								<p className="text-tertiary font-lora font-medium">{order.statusDisplay}</p>
							</div>
							<div className="flex flex-col gap-2 text-right">
								<h6 className="text-blue font-bold text-base">TOTAL</h6>
								<p className="text-tertiary font-lora font-medium">{order.orderTotalDisplay}</p>
							</div>
						</div>
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default CommonRecentOrders;