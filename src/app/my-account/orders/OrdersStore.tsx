"use client";

import { useFetchOrdersHistory } from "@/hook/useFetchOrdersHistory";

const OrdersStore = () => {
	useFetchOrdersHistory();
	return <></>;
};

export default OrdersStore;
