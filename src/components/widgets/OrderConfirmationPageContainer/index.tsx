import React from "react";
import { OrderConfirmationPageContainerProps } from "./types";
import { cn } from "@/lib/utils";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";

const OrderConfirmationPageContainer: React.FC<OrderConfirmationPageContainerProps> = (props) => {
	const { children } = props;

	return (
		<div className="bg-muted-background py-8 px-4 lg:px-6">
			<DefaultPageSeo info={{ Title: "Order Confirmation Page" }} />
			<div className={cn("container")}>{children}</div>
		</div>
	);
};

export default OrderConfirmationPageContainer;
