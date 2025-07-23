import React from "react";
import { BasicLinkProps } from "./types";
import Icon from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import CommonImage from "@/components/shared/CommonImage";
import { SmartLink } from "@/components/shared/smartLink";

const BasicLink: React.FC<BasicLinkProps> = (props) => {
	const { __typename, Id, Destination, OverrideTitle, Section } = props;
	const envPrefix = process.env.GRAPH_ENV || "";
	const LinkProps = {
		CustomClass: "",
		IconName: "",
	};

	switch (Section) {
		case `${envPrefix}FooterContainer`:
			LinkProps.CustomClass = "text-[#555555] hover:underline";
			LinkProps.IconName = "Link";
			break;
		default:
			break;
	}

	return (
		<SmartLink
			data-component={__typename}
			data-component-id={Id}
			href={Destination?.Value || ""}
			title={OverrideTitle || ""}
			className={cn("flex gap-2 items-center", LinkProps.CustomClass)}
		>
			{OverrideTitle || ""}

			{LinkProps.IconName && LinkProps.IconName === "Link" ? (
				<img src={`/icons/Link.svg`} alt="check" width={24} height={24} />
			) : (
				<Icon iconName={LinkProps.IconName} />
			)}
		</SmartLink>
	);
};

export default BasicLink;
