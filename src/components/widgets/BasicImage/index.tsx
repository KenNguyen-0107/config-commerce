import React from "react";
import { BasicImageProps } from "./types";
import { cn } from "@/lib/utils";
import { getImgSrc } from "@/components/utils";
import CommonImage from "@/components/shared/CommonImage";
import { SmartLink } from "@/components/shared/smartLink";

const BasicImage: React.FC<BasicImageProps> = (props) => {
	const {
		__typename,
		Id,
		ImageUrl,
		AltText,
		CssClass,
		Section,
		ImageLink,
		ImageLoading,
		ImageWidth,
		ImageHeight,
	} = props;
	const envPrefix = process.env.GRAPH_ENV || "";
	if (!ImageUrl) return null;
	const ImgProps = {
		width: 1000,
		height: 1000,
		CustomClass: "",
	};

	switch (Section) {
		case "NavPrimary":
			ImgProps.width = 356;
			ImgProps.height = 36;
			ImgProps.CustomClass = "";
			break;
		case `${envPrefix}FooterContainer`:
			ImgProps.width = 356;
			ImgProps.height = 36;
			ImgProps.CustomClass = "h-6 w-auto";
			break;
		case "ImageList":
			ImgProps.CustomClass = "min-h-[30px] lg:min-h-0 lg:max-h-[50px] w-auto";
			break;
		case "HorizontalBanner":
			ImgProps.CustomClass = "max-h-[61px] w-auto";
			break;
		case "InstallationAdvice":
			ImgProps.CustomClass = "lg:h-full object-cover";
			break;
		default:
			break;
	}

	const ImageComponent = () => (
		<CommonImage
			loading={ImageLoading || "lazy"}
			data-component={__typename}
			data-component-id={Id}
			src={getImgSrc(ImageUrl)}
			alt={AltText || "product image"}
			width={(ImageWidth as number) || ImgProps.width}
			height={(ImageHeight as number) || ImgProps.height}
			className={cn("object-contain", CssClass, ImgProps.CustomClass)}
		/>
	);

	return !!ImageLink ? (
		<SmartLink href={ImageLink.Url || ""} title={AltText || "link title"}>
			{ImageComponent()}
		</SmartLink>
	) : (
		ImageComponent()
	);
};

export default BasicImage;
