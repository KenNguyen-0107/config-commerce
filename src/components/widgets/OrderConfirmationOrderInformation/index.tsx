import React from "react";
import { OrderConfirmationOrderInformationProps } from "./types";
import OrderInfo from "@/app/checkout/thank-your-order/OrderInfo";

const OrderConfirmationOrderInformation: React.FC<
	OrderConfirmationOrderInformationProps
> = () => {
	return <OrderInfo />;
};

export default OrderConfirmationOrderInformation;
