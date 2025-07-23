"use client";

import { Button, ButtonVariant } from "@/components/ui/button";
import { BasicBannerProps } from "@/components/widgets/BasicBanner/types";
import { cn } from "@/lib/utils";
import React from "react";

const CollapseText: React.FC<BasicBannerProps> = (props) => {
	const { Id, Heading, Subheading, Description, Variant, ButtonLabel } = props;

	const CustomClass = {
		Wrapper: "bg-transparent text-left items-start",
		Heading: "text-blue",
		SubHeading: "",
		Description: "font-lora text-muted",
		CtaButton:
			"bg-transparent border-0 p-0 lg:p-0 mt-2 text-blue hover:bg-transparent hover:text-blue hover:underline",
		ClampText: "line-clamp-3",
	};

	const [collapseClass, setCollapseClass] = React.useState(CustomClass.ClampText);

	return (
		<div
			data-component="CollapseText"
			data-component-id={Id}
			className={cn(
				"text-center h-full flex flex-col justify-center items-center",
				CustomClass.Wrapper
			)}
		>
			{Subheading && (
				<div
					className={CustomClass.SubHeading}
					dangerouslySetInnerHTML={{
						__html: Subheading,
					}}
				/>
			)}

			{Heading && (
				<div
					className={CustomClass.Heading}
					dangerouslySetInnerHTML={{
						__html: Heading || "",
					}}
				/>
			)}

			{Description && (
				<div
					className={cn(collapseClass, CustomClass.Description)}
					dangerouslySetInnerHTML={{
						__html: Description || "",
					}}
				/>
			)}

			{ButtonLabel && (
				<div>
					<Button
						buttonLabel={ButtonLabel}
						variant={(Variant as ButtonVariant) || "primary"}
						className={CustomClass.CtaButton}
						onClick={() => {
							setCollapseClass(!!collapseClass ? "" : CustomClass.ClampText);
						}}
					>
						{ButtonLabel}
					</Button>
				</div>
			)}
		</div>
	);
};

export default CollapseText;
