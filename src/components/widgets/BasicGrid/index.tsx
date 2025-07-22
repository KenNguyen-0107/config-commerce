import React from "react";
import { BasicGridProps } from "./types";
import { cn } from "@/lib/utils";
import {
  lgColumnClassMap,
  mdColumnClassMap,
  rowClassMap,
  smColumnClassMap,
  xlColumnClassMap,
  xsColumnClassMap,
} from "./gridMap";

const BasicGrid: React.FC<BasicGridProps> = (props) => {
  const {
    Section,
    children,
    __typename,
    Id,
    ExtraLargeColumnCount,
    ExtraLargeRowCount,
    LargeColumnCount,
    MediumColumnCount,
    SmallColumnCount,
    ExtraSmallColumnCount,
    IsFullWidth,
    CssClass,
    Info,
  } = props;

  if (!children) return null;

  const extraSmallClass = ExtraSmallColumnCount
    ? xsColumnClassMap[ExtraSmallColumnCount]
    : "";
  const smallClass = SmallColumnCount ? smColumnClassMap[SmallColumnCount] : "";
  const mediumClass = MediumColumnCount
    ? mdColumnClassMap[MediumColumnCount]
    : "";
  const largeClass = LargeColumnCount ? lgColumnClassMap[LargeColumnCount] : "";
  const extraLargeClass = ExtraLargeColumnCount
    ? xlColumnClassMap[ExtraLargeColumnCount]
    : "";
  const extraLargeRowClass = ExtraLargeRowCount
    ? rowClassMap[ExtraLargeRowCount]
    : "";

  let customClass = '';
  switch (Section) {
    case 'InstallationAdvice':
      customClass = "gap-4 lg:gap-8"
      break;
    case 'TopSellingProducts':
      customClass = 'gap-10'
      break;
    case 'BannerItem':
      // customClass = 'lg:pr-0 py-10 lg:my-0 px-4 lg:p-0'
      customClass = 'pr-0 gap-4 lg:gap-8'
      break;
    case 'NavPrimary':
      customClass = 'place-items-center'
      break;
    case 'CategoryBlock':
      customClass = 'container grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-6 lg:gap-y-10 -mt-[32px] lg:-mt-20 pb-10 lg:pb-20'
      break;
    case 'HorizontalBanner':
      customClass = 'bg-red-brown flex gap-6 p-8 text-white items-center'
      break;
    case "PdpServiceCard":
      customClass = 'gap-0'
      break;
    case "PdpTechSpecs":
      customClass = "flex flex-col lg:flex-row justify-start gap-[128px]"
      break;
    case "PdpStickyNav":
      customClass = 'flex gap-4 p-0 grow'
      break;
    case "USP":
      customClass = Info?.ProductNumber && "flex justify-between items-center text-blue uppercase"
      break;
    case "Guarantee":
      customClass = "gap-4 lg:gap-8"
      break;
    case "Promotions":
      customClass = "gap-4 lg:gap-8"
      break;
    default:
      break;
  }

  if (Info?.Name === "Cart" && Section === "ImageList") {
    customClass = "flex gap-4 items-center whitespace-nowrap flex-wrap lg:flex-nowrap"
  }

  return (
    <div
      data-component={__typename}
      data-component-id={Id}
      className={cn(
        "grid gap-8",
        extraSmallClass,
        smallClass,
        mediumClass,
        largeClass,
        extraLargeClass,
        // extraLargeRowClass,
        IsFullWidth ? "w-full" : "container mx-auto",
        CssClass,
        customClass
      )}
    >
      {children}
    </div>
  );
};

export default BasicGrid;
