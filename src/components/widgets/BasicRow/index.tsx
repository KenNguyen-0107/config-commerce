import ImageList from "@/app/cart/ImageList";
import StickyNav from "@/components/common/StickyNav";
import NavMenuItem from "@/components/layout/header/NavMenuItem";
import NavPrimary from "@/components/layout/header/NavPrimary";
import PDPContent from "@/components/products/PdpContent";
import { cn } from "@/lib/utils";
import React from "react";
import { RowGridMap } from "./gridMap";
import { BasicRowProps } from "./types";

const BasicRow: React.FC<BasicRowProps> = (props) => {
  const { children, __typename, Id, Columns, Variant, Zone, Info } = props;

  if (Zone == "Breadcrumb" || Zone == "MainNavigation" || !children)
    return null;

  if (Variant === "PDPContent")
    return <PDPContent data={Info}>{children}</PDPContent>;
  if (Variant === "PdpStickyNav") return <StickyNav data={Info}>{children}</StickyNav>;

  if (Variant === "NavPrimary") return <NavPrimary {...props}>{children}</NavPrimary>;
  if (Variant === "NavMenuItem") return <NavMenuItem {...props}>{children}</NavMenuItem>;
  // if (Info?.Name === "Cart" && Variant === "ImageList") return <ImageList {...props}>{children}</ImageList>

  const CustomClass = {
    RowWrapper: "",
    ColWrapper: "",
  };
  let customId = "";
  if(Variant === 'Rating') {
    const rowBg = Info?.Url == '/' ? "bg-muted-background gap-6 lg:gap-10 py-10" : 'bg-white gap-10 pt-10 pb-30'
    CustomClass.RowWrapper = rowBg
  }

  switch (Variant) {
    case "PdpRatingDetail":
      CustomClass.RowWrapper =  "py-20 bg-duck";
      break;
    case "HeroBanner":
      CustomClass.RowWrapper = Info?.ProductNumber ? "bg-blue py-10" : "";
      break;
    case "NavSecondary":
      CustomClass.RowWrapper =
        "h-10 bg-secondary-background flex items-center justify-between px-2 lg:px-4";
      break;
    case "CategoryBlock":
      CustomClass.RowWrapper = "bg-muted-background relative z-[3]";
      CustomClass.ColWrapper = "px-4 lg:px-0";
      break;
    case "HorizontalBanner":
      CustomClass.RowWrapper = "hidden lg:grid bg-muted-background";
      break;
    case "Guarantee":
      CustomClass.RowWrapper = "px-4 py-10 lg:py-10";
      break;
    case "AppsOnlinePlanningTool":
      CustomClass.RowWrapper = "bg-red-brown text-white px-4 py-10 lg:py-20";
      break;
    case "BannerItem":
      CustomClass.RowWrapper = Info?.ProductNumber ? "bg-white py-20 lg:my-0 px-4 lg:p-0" :"bg-muted-background py-20 lg:my-0 px-4 lg:p-0";
      CustomClass.ColWrapper = "flex flex-col lg:py-20 gap-10";
      break;
    case "AppsOnlinePlanningTool":
      CustomClass.RowWrapper = "text-white lg:py-20";
      break;
    case "Promotions":
      CustomClass.RowWrapper = "px-4 py-20";
      break;
    case "InstallationAdvice":
      CustomClass.RowWrapper = Info?.AttributeTypeContainer?.AttributeTypes?.length > 0 ? "bg-white" : "bg-muted-background";
      CustomClass.ColWrapper = "flex flex-col px-4 py-20 gap-10";
      break;
    case "ImageList":
      CustomClass.ColWrapper = "flex justify-between lg:justify-start gap-2 lg:gap-4 mt-4 lg:mt-0";
      break;
    case "ShoppingWithUs":
      CustomClass.RowWrapper = "bg-duck px-4 py-10 lg:py-20";
      CustomClass.ColWrapper = "flex flex-col gap-10";
      break;
    case "PdpTechSpecs":
    case "Subscribe":
      CustomClass.RowWrapper = "bg-muted-background px-4 py-20";
      break;
    case "PdpServiceCard":
        CustomClass.RowWrapper = "bg-muted-background lg:py-20 items-start";
        customId = 'thisisjacksonsfencing'; // scroll to Videos block in PDP page
      break;
    case "Videos":
      CustomClass.RowWrapper = "bg-muted-background py-10";
      break;
    case "QuestionAndAnswer":
    case "CollapseText":
      CustomClass.RowWrapper = "bg-muted-background py-10";
      break;
    case "USP":
      CustomClass.RowWrapper = Info?.ProductNumber ? "bg-muted-background py-6" : "bg-muted-background";
      break;
    case "TopSellingProducts":
      CustomClass.RowWrapper = "bg-muted-background py-10 px-4";
      CustomClass.ColWrapper = "flex flex-col lg:gap-10";
      break;
    case "PdpInformationBanner":
      CustomClass.RowWrapper = "bg-muted-background lg:py-10";
      break;
    default:
      break;
  }

  if (Info?.Name === "Cart" && Variant === "HeroBanner") {
    CustomClass.RowWrapper = "bg-duck py-10";
  }

  return (
    <div
      data-component={__typename}
      data-component-id={Id}
      data-section={Variant}
      id={customId}
      className={cn(
        "grid grid-cols-12 mx-auto gap-8 w-full",
        CustomClass.RowWrapper,
        "scroll-mt-28"
      )}
    >
      {Array.isArray(children) ? (
        children.map((child: any, index: number) => (
          <div
            key={index}
            className={cn(
              RowGridMap[Columns?.[index] ?? 0],
              CustomClass.ColWrapper
            )}
          >
            {child}
          </div>
        ))
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default BasicRow;
