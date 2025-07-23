import React from "react";
import { LinkListProps } from "./types";
import LinkListTitle from "./title";
import { CollapsibleSection } from "@/components/layout/footer/CollapsibleSection";
import { SmartLink } from "@/components/shared/smartLink";

const LinkList: React.FC<LinkListProps> = (props) => {
	const { Title, TitleLink, Links } = props;

	return (
		<>
			<div className="flex flex-col lg:hidden">
				<CollapsibleSection title={Title ?? ""}>
					{Links?.LinkItems?.map((link, index) => (
						<SmartLink
							key={index}
							className="text-muted text-sm"
							href={link?.Destination?.Url ?? "/"}
							target={`${link?.OpenInNewWindow ? "_blank" : "_self"}`}
						>
							{link?.OverriddenTitle || link?.OverrideTitle || ""}
						</SmartLink>
					))}
				</CollapsibleSection>
			</div>

			<div className="hidden lg:grid gap-4">
				<LinkListTitle text={Title ?? ""} href={TitleLink?.Value ?? ""} />
				<ul className="space-y-4">
					{Links?.LinkItems?.map((link, index) => (
						<li key={index}>
							<SmartLink
								className="text-muted"
								href={link?.Destination?.Url ?? "/"}
								target={`${link?.OpenInNewWindow ? "_blank" : "_self"}`}
							>
								{link?.OverriddenTitle || link?.OverrideTitle || ""}
							</SmartLink>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default LinkList;
