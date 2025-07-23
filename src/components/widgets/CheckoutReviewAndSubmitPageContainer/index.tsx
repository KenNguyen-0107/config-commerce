import React from "react";
import { CheckoutReviewAndSubmitPageContainerProps } from "./types";
import { cn } from "@/lib/utils";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";

const CheckoutReviewAndSubmitPageContainer: React.FC<CheckoutReviewAndSubmitPageContainerProps> = (
	props
) => {
	const { children } = props;

	return (
		<div className="bg-muted-background py-8 px-4 lg:px-6">
			<DefaultPageSeo info={{ Title: "Payment and Review Page" }} />
			<div className={cn("container")}>{children}</div>
		</div>
	);
};

export default CheckoutReviewAndSubmitPageContainer;
