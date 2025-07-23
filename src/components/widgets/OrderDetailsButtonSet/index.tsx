import React from "react";
import { OrderDetailsButtonSetProps } from "./types";
import RenderOrderButtonSet from "@/app/my-account/orders/[orderId]/RenderOrderButtonSet";

const OrderDetailsButtonSet: React.FC<OrderDetailsButtonSetProps> = (props) => {
  return (
    <RenderOrderButtonSet />
  );
};

export default OrderDetailsButtonSet;
