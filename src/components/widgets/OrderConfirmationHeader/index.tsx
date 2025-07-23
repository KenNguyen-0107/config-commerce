import React from "react";
import { OrderConfirmationHeaderProps } from "./types";
import { Button } from "@/components/ui/button";

const OrderConfirmationHeader: React.FC<OrderConfirmationHeaderProps> = () => {
	return (
		<div className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-center justify-between mb-10">
			<div className="flex justify-start gap-4 items-end">
				<h1 className="text-3xl lg:text-[40px] font-bold text-blue">THANK YOU FOR YOUR ORDER</h1>
				{/* <span className="text-lg text-duck">STEP 2/2</span> */}
			</div>
			<Button title="continue shopping" href="/" className="h-14 w-full lg:w-content">
				CONTINUE SHOPPING
			</Button>
		</div>
	);
};

export default OrderConfirmationHeader;
