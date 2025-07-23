import React from "react";
import { OrderDetailsTitleProps } from "./types";

const OrderDetailsTitle: React.FC<OrderDetailsTitleProps> = (props) => {
	return (
		<div className="text-[40px] font-bold text-blue px-4 lg:px-0">
			ORDER #{props.Info?.params.orderId}
		</div>
	);
};

export default OrderDetailsTitle;
