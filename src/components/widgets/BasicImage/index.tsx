import React from "react";
import { BasicImageProps } from "./types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getImgSrc } from "@/components/utils";
import Link from "next/link";
import LazyImage from "@/components/shared/lazyImage";

const BasicImage: React.FC<BasicImageProps> = (props) => {
  const { __typename, Id, ImageUrl, AltText, CssClass, Section, ImageLink } =
    props;

  if (!ImageUrl) return null;

  const ImgProps = {
    width: 1000,
    height: 1000,
    CustomClass: "",
  };

  switch (Section) {
    case "NavPrimary":
      ImgProps.CustomClass = "";
    case "FooterContainer":
      ImgProps.width = 356;
      ImgProps.height = 36;
      ImgProps.CustomClass = "h-6 w-auto lg:h-9 mb-8 lg:mb-0"
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
    <LazyImage
      loading={Section === 'NavPrimary' ? 'eager' : 'lazy'}
      data-component={__typename}
      data-component-id={Id}
      src={getImgSrc(ImageUrl)}
      alt={AltText || "product image"}
      width={ImgProps.width}
      height={ImgProps.height}
      className={cn("object-contain", CssClass, ImgProps.CustomClass)}
    />
  );

  return !!ImageLink ? (
    <Link href={ImageLink.Url || ''} title={ImageLink.Url || 'link title'}>
      {ImageComponent()}
    </Link>
  ) : (
    ImageComponent()
  );
};

export default BasicImage;
