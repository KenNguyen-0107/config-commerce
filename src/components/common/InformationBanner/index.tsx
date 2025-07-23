import React from "react";
import Image from "next/image";
import { Button, ButtonVariant } from "@/components/ui/button";
import { SmartLink } from "@/components/shared/smartLink";

export interface IInformationBannerProps {
	data: {
		heading?: string;
		description?: string;
		ctaText?: string;
		ctaHref?: string;
		imgSrc?: string;
		imgAltText?: string;
	};
	styleConfig: {
		wrapperStyle: string;
		ctaType: ButtonVariant;
		ctaClass: string;
		imageStyle: string;
		headingStyle: string;
		descriptionStyle: string;
	};
}
const InformationBanner = ({ data, styleConfig }: IInformationBannerProps) => {
	return (
		<div className={styleConfig?.wrapperStyle}>
			{data?.imgSrc && (
				<Image
					src={data.imgSrc}
					alt={data.imgAltText || "alt text"}
					width={200}
					height={85}
					className="w-auto max-h-[200px] mx-auto"
				/>
			)}
			{styleConfig?.headingStyle && (
				<h2 className={styleConfig?.headingStyle || ""}>{data.heading}</h2>
			)}
			{styleConfig?.descriptionStyle && (
				<p className={styleConfig?.descriptionStyle || ""}>{data.description}</p>
			)}
			{data.ctaText && (
				<div className="text-center">
					<Button
						variant={styleConfig?.ctaType || "stroke-blue"}
						size="default"
						className={styleConfig?.ctaClass || ""}
						buttonLabel={data.ctaText}
					>
						<SmartLink href={data?.ctaHref || "#"}>{data.ctaText}</SmartLink>
					</Button>
				</div>
			)}
		</div>
	);
};

export default InformationBanner;
