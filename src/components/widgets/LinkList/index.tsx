import React from "react";
import { LinkListProps } from "./types";
import LinkListTitle from "./title";
import Link from "next/link";
import { CollapsibleSection } from "@/components/layout/footer/CollapsibleSection";

const LinkList: React.FC<LinkListProps> = (props) => {
	const { Title, TitleLink, Links } = props;

	return (
		<>
			<div className="flex flex-col lg:hidden">
				<CollapsibleSection title={Title ?? ""}>
					{Links?.LinkItems?.map((link, index) => (
							<Link
                key={index}
								className="text-muted text-sm"
								href={link?.Destination?.Value ?? "/"}
								target={`${link?.OpenInNewWindow ? "_blank" : "_self"}`}
							>
								{link?.OverriddenTitle || link?.OverrideTitle || ""}
							</Link>
					))}
				</CollapsibleSection>
			</div>

			<div className="hidden lg:grid gap-4">
				<LinkListTitle text={Title ?? ""} href={TitleLink?.Value ?? ""} />
				<ul className="space-y-4">
					{Links?.LinkItems?.map((link, index) => (
						<li key={index}>
							<Link
								className="text-muted"
								href={link?.Destination?.Value ?? "/"}
								target={`${link?.OpenInNewWindow ? "_blank" : "_self"}`}
							>
								{link?.OverriddenTitle || link?.OverrideTitle || ""}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default LinkList;
