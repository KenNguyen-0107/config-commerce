import React from "react";
import { BasicRichContentProps } from "./types";
import { cn } from "@/lib/utils";
import RichContentVideo from "./RichContentVideo";
import RichContentStickyNav from "./RichContentStickyNav";

// Basic dynamic import
// const RichContentVideo = dynamic(() => import('./RichContentVideo'));

const BasicRichContent: React.FC<BasicRichContentProps> = (props) => {
	const { __typename, Id, Content, BackgroundColor, Padding, CssClass, Section } = props;
	const envPrefix = process.env.GRAPH_ENV || "";
	if (!Content) return null;
	if (Section && ["Videos", "PdpServiceCard"].includes(Section))
		return <RichContentVideo {...props} />;
	if (Section === "PdpStickyNav") return <RichContentStickyNav {...props} />;

	let customCss = "";
	switch (Section) {
		case "NavPrimary":
			customCss = "w-full hidden lg:block";
			break;
		case "HorizontalBanner":
			customCss = "flex-grow";
			break;
		case "PDPContent":
			customCss = "bg-muted-background border-l-4 border-duck space-y-2 p-6 mt-10";
			break;
		case "InstallationAdvice":
			customCss = "space-y-2 max-w-[720px] mx-auto";
			break;
		default:
			break;
	}

	return (
		<div
			data-component={__typename}
			data-component-id={Id}
			dangerouslySetInnerHTML={{ __html: Content || "" }}
			style={{
				backgroundColor: BackgroundColor || undefined,
				padding: Padding || undefined,
			}}
			className={cn(
				Section &&
					![`${envPrefix}FooterContainer`, "NavPrimary", "NavSecondary"].includes(Section) &&
					"px-4",
				CssClass,
				customCss
			)}
		/>
	);
};

export default BasicRichContent;
