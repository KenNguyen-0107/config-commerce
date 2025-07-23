import React from "react";
import { BasicNavigationListProps } from "./types";
import { SmartLink } from "@/components/shared/smartLink";

const BasicNavigationList: React.FC<BasicNavigationListProps> = (props) => {
	return (
		<div className="md:px-0 md:w-[256px]">
			<h2 className="text-blue text-3xl mb-4 lg:mb-6">QUICK LINKS</h2>
			<nav className="flex flex-col">
				<SmartLink href="/my-account/address" className="text-blue my-3">
					ADDRESSES
				</SmartLink>
				<SmartLink href="/my-account/orders" className="text-blue my-3">
					ORDER HISTORY
				</SmartLink>
			</nav>
		</div>
	);
};

export default BasicNavigationList;
