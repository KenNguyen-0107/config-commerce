import { SmartLink } from "@/components/shared/smartLink";
import { LinkFields } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { Fragment } from "react";
import MegaMenu from "./MegaMenu";
import { HeaderMainNavigationProps } from "./types";

const MegaMenuMobile = dynamic(() => import("./Mobile/MegaMenu/MegaMenuMobile"));
export interface ISubLinks {
	Id?: string;
	Level?: number;
	Title?: string;
	Url?: string;
	Type?: string;
	SortOrder?: number;
	children?: ISubLinks[];
	bgImgSrc?: string;
	properties?: any;
	altText?: string;
}

const HeaderMainNavigation: React.FC<HeaderMainNavigationProps> = (props) => {
	const { Section, Zone } = props;

	const data = props.Links?.LinkItems;

	if (!data?.length || !Section) return null;

	if (Section === "NavMenuItem") {
		return (
			<>
				<MegaMenu linkItems={data as LinkFields[]} />
				<MegaMenuMobile linkItems={data as LinkFields[]} />
			</>
		);
	}

	return (
		<div data-zone={Zone} className="container mx-auto">
			<nav className="flex items-center justify-between gap-4">
				{data?.map((item, index) => (
					<Fragment key={index}>
						{index === 0 && Section === "NavSecondary" && (
							<img
								src={`/icons/wrench.svg`}
								alt="search"
								width={24}
								height={24}
								className="hidden lg:inline-block"
							/>
						)}
						<SmartLink
							title={item?.Title || "link title"}
							href={item?.Destination?.Url || ""}
							className={cn(
								"flex items-center space-x-1 border-b border-transparent hover:border-b-blue",
								"text-xs md:text-base",
								"text-center md:text-left",
								"text-blue hover:text-blue/80",
								index > 4 && "hidden md:block"
							)}
						>
							{item?.Title}
						</SmartLink>
					</Fragment>
				))}
			</nav>
		</div>
	);
};

export default HeaderMainNavigation;
