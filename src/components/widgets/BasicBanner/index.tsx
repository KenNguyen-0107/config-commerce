"use client";

import React, { useRef } from "react";
import { BasicBannerProps } from "./types";
import { Button, ButtonVariant } from "@/components/ui/button";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { getImgSrc } from "@/components/utils";
import CollapseText from "@/components/common/CollapseText";
import CategoryBanner from "./CategoryBanner";
import LazyImage from "@/components/shared/lazyImage";

const BasicBanner: React.FC<BasicBannerProps> = (props) => {
  const {
    __typename,
    Id,
    Background,
    BackgroundColor,
    BackgroundImage,
    Heading,
    Subheading,
    Description,
    Variant,
    Image,
    ImageWidth,
    ImageHeight,
    ImageOverlay,
    ButtonLabel,
    ButtonLink,
    Section,
    SiteHost,
    Info,
    Loading,
  } = props;

  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  if (Section === "CategoryBlock") {
    return (
      <CategoryBanner {...props} />
    );
  }

  const bgImgSrc =
    BackgroundImage && getImgSrc(BackgroundImage, SiteHost || "");
  const imgSrc = Image && getImgSrc(Image, SiteHost || "");
  const ProductHeading = Section === "TopSellingProducts" && Info?.ProductTitle && Heading ? Heading.replace(/<\/\w+?\d+?>/g, ` ${Info.ProductTitle}`) : "";

  const CustomClass: {
    Wrapper: string;
    Heading: string;
    SubHeading: string;
    Description: string;
    Image: string;
    Loading: "lazy" | "eager" | undefined;
    CtaButton: string;
  } = {
    Wrapper: "px-4",
    Heading: "",
    SubHeading: "",
    Description: "",
    Image: "",
    Loading: "lazy",
    CtaButton: "",
  };

  if (Section === "CollapseText") {
    return <CollapseText {...props} />;
  }

  switch (Section) {
    case "Videos":
      CustomClass.Wrapper = "px-6 py-8";
      CustomClass.Heading = "uppercase text-white";
      CustomClass.Description = "text-white";
      break;
    case "TopSellingProducts":
      CustomClass.Wrapper = "gap-2";
      CustomClass.Heading = "uppercase text-blue";
      CustomClass.Description = "text-muted text-lg font-lora";
      break;
    case "HeroBanner":
      CustomClass.Wrapper = Info?.ProductNumber ? "text-white h-auto gap-6" : "text-white h-[400px] lg:h-[700px] gap-6";
      CustomClass.Description = "font-lora text-lg max-w-[720px]";
      CustomClass.CtaButton = Info?.ProductNumber ? "w-[240px]" : ""
      break;
    case "SubHeroBanner":
      CustomClass.Wrapper = "text-white py-14 lg:py-0 lg:h-[500px] gap-4 lg:gap-6";
      CustomClass.Heading = "[&_h2]:text-3xl [&_h2]:lg:text-[40px]";
      break;
    case "Guarantee":
      CustomClass.Wrapper = "py-6 px-4 flex flex-col gap-4 lg:p-10";
      CustomClass.Heading =
        "text-xl lg:text-2xl leading-[30px] text-center text-blue font-normal lg:h-[60px]";
      CustomClass.Description =
        "lg:text-[18px] leading-[28px] text-center text-muted font-medium font-lora";
      CustomClass.Image = "w-auto h-[85px] object-cover";
      break;
    case "Promotions":
      CustomClass.Wrapper = "text-white gap-2 p-10 min-h-[250px] lg:min-h-[334px]";
      CustomClass.Description = "font-lora";
      break;
    case "BannerItem":
      CustomClass.Wrapper = "text-white gap-4 p-6 lg:min-h-[334px]";
      CustomClass.Description = "font-lora";
      break;
    case "InstallationAdvice":
      CustomClass.Wrapper = "text-white gap-4 px-4 py-6 lg:p-10";
      CustomClass.Description = "font-lora";
      CustomClass.Image = "h-[56px] lg:h-[85px] w-auto object-contain"
      break;
    case "PdpInformationBanner":
      CustomClass.Wrapper = "text-white gap-4 p-10 justify-start";
      CustomClass.Description = "font-lora text-lg";
      CustomClass.Image = "h-[85px] w-auto object-contain"
      break;
    case "PdpServiceCard":
      CustomClass.Wrapper = "text-white text-left gap-2 px-6 py-8 bg-blue items-start";
      CustomClass.Description = "font-lora";
      break;
    case "PdpTechSpecs":
      CustomClass.Wrapper = "text-white text-left gap-4 p-10 max-w-[450px] lg:h-[500px]";
      CustomClass.Description = "font-lora text-center";
      CustomClass.Image = "h-[85px] w-auto object-contain"
      break;
    default:
      break;
  }

  if (Info?.Name === "Cart") {
    CustomClass.Wrapper = "container gap-6 h-auto text-white";
    CustomClass.Heading = "font-lora";
    CustomClass.Description = "font-frutiger-bold";
  }

  return (
    <div
      data-component={__typename}
      data-component-id={Id}
      className={cn(
        "text-center h-full flex flex-col justify-center items-center px-4",
        `${ImageOverlay || bgImgSrc ? "relative" : ""}`,
        CustomClass.Wrapper
      )}
      style={{
        backgroundColor: BackgroundColor || undefined,
      }}
      ref={ref}
    >
      {Background === "backgroundImage" && bgImgSrc && (
        <LazyImage
          alt={"background image"}
          src={bgImgSrc}
          width={2100}
          height={2100}
          sizes="100vw"
          className={cn("absolute top-0 left-0 z-0 w-full h-full object-cover")}
          loading={Loading || CustomClass.Loading}
        />
      )}

      {imgSrc && (
        <LazyImage
          alt={"image alt text"}
          src={imgSrc}
          width={parseInt(ImageWidth || "300")}
          height={parseInt(ImageHeight || "100")}
          className={CustomClass.Image}
          loading={Loading || CustomClass.Loading}
        />
      )}

      {Background === "backgroundImage" && ImageOverlay && (
        <div
          className={cn("absolute z-[2] top-0 left-0 w-full h-full")}
          style={{ background: ImageOverlay }}
        />
      )}

      {Subheading && (
        <div
          className={cn(
            `${ImageOverlay || bgImgSrc ? "relative z-[2]" : ""}`,
            CustomClass.SubHeading
          )}
          dangerouslySetInnerHTML={{
            __html: Subheading,
          }}
        />
      )}

      {Heading && (
        <div
          className={cn(
            `${ImageOverlay || bgImgSrc ? "relative z-[2]" : ""} `,
            CustomClass.Heading
          )}
          dangerouslySetInnerHTML={{
            __html: !!ProductHeading ? ProductHeading : Heading || "",
          }}
        />
      )}

      {Description && (
        <div
          className={cn(
            `${ImageOverlay || bgImgSrc ? "relative z-[2]" : ""}`,
            CustomClass.Description
          )}
          dangerouslySetInnerHTML={{
            __html: Description || "",
          }}
        />
      )}

      {ButtonLabel && ButtonLink && (
        <div>
          <Button
            variant={(Variant as ButtonVariant) || "primary"}
            href={ButtonLink.Url || "#"}
            className={cn(
              `${ImageOverlay || bgImgSrc ? "relative z-[2]" : ""}`,
              CustomClass.CtaButton
            )}
          >
            {ButtonLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BasicBanner;
