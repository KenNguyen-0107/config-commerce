import React from "react";
import { OrderDateProps } from "./types";
import RenderOrderDate from "@/app/my-account/orders/[orderId]/RenderOrderDate";

const OrderDate: React.FC<OrderDateProps> = (props) => {
  return <RenderOrderDate />;
};

export default OrderDate;
