import React from "react";
import { OrderConfirmationTotalProps } from "./types";
import CheckoutSummary from "@/app/checkout/address/CheckoutSummary";

const OrderConfirmationTotal: React.FC<OrderConfirmationTotalProps> = () => {
	return <CheckoutSummary from="OrderConfirmation" />;
};

export default OrderConfirmationTotal;
