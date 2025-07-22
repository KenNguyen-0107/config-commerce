import Icon from "@/components/shared/icons";
import { LinkFields } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { Fragment } from "react";
import NavMenuItem from "./NavMenuItem";
import { HeaderMainNavigationProps } from "./types";
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
		return <NavMenuItem linkItems={props.Links?.LinkItems as LinkFields[]} />;
	}

	return (
		<div data-zone={Zone} className="hidden border-muted lg:block">
			<div className="container mx-auto">
				<nav className="flex items-center justify-between gap-4">
					{data?.map((item, index) => (
						<Fragment key={index}>
							{index === 0 && Section === "NavSecondary" && (
								<Icon iconName="wrench" size={24} viewSize={24} />
							)}
							<Link
								title={item?.Title || "link title"}
								href={item?.Destination?.Url || ""}
								className={cn(
									"flex items-center space-x-1 text-blue hover:text-blue/80 border-b border-transparent hover:border-b-blue"
								)}
							>
								{item?.Title}
							</Link>
						</Fragment>
					))}
				</nav>
			</div>
		</div>
	);
};

export default HeaderMainNavigation;
