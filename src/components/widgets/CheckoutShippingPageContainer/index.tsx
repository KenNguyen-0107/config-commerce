import React from "react";
import { CheckoutShippingPageContainerProps } from "./types";
import { cn } from "@/lib/utils";

const CheckoutShippingPageContainer: React.FC<CheckoutShippingPageContainerProps> = (props) => {
	const { children } = props;

	return (
		<div className="bg-muted-background py-8 px-4 lg:px-6">
			<div className={cn("container")}>{children}</div>
		</div>
	);
};

export default CheckoutShippingPageContainer;
