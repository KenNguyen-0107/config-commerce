import React from "react";
import { BasicBreadcrumbsProps } from "./types";
import { SmartLink } from "@/components/shared/smartLink";

interface BreadcrumbItem {
	PageId: string;
	PageTitle: string;
	PageUrl: string;
}
const BasicBreadcrumbs: React.FC<BasicBreadcrumbsProps> = (props) => {
	const { Info } = props;
	const data = Info?.BreadcrumbContainer?.BreadCrumbs as BreadcrumbItem[];

	return (
		<>
			{data && (
				<div className=" bg-secondary-background py-2">
					<div className="flex items-center gap-2 text-sm container">
						{data.map((item: BreadcrumbItem, index: number) => (
							<div key={item.PageId}>
								<SmartLink
									title={item.PageTitle}
									href={item.PageUrl || "/"}
									className="text-muted inline-block lg:min-w-48"
								>
									<div className="font-lora text-sm font-medium transition-colors">
										{item.PageTitle}
									</div>
								</SmartLink>
								{/* <a href={item.PageUrl} className="font-lora text-sm font-medium transition-colors">
									{item.PageTitle}
								</a> */}
								{index < data.length - 1 && <div className="pl-2 inline-block">/</div>}
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default BasicBreadcrumbs;
