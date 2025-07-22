import React from "react";
import Link from "next/link";
import { getImgSrc } from "@/components/utils";
import { BasicBannerProps } from "./types";
import { cn } from "@/lib/utils";
import LazyImage from "@/components/shared/lazyImage";

const CategoryBanner: React.FC<BasicBannerProps> = (props) => {
  const { Image, Heading, ButtonLink, Loading } = props;

  return (
    <div
      className={cn(
        "flex flex-col",
        "relative",
        "px-2 pt-4 pb-8 lg:px-6 lg:py-10 h-full",
        "border-b border-blue bg-white shadow-lg text-center"
      )}
    >
      <LazyImage
        src={getImgSrc(Image || "")}
        alt={"category image"}
        loading={Loading || 'lazy'}
        width={214}
        height={162}
      />

      {Heading && (
        <div
          className="uppercase text-blue mt-4"
          dangerouslySetInnerHTML={{ __html: Heading }}
        />
      )}
      {!!ButtonLink?.Url && (
        <Link
          href={ButtonLink.Url || "#"}
          className="absolute top-0 left-0 right-0 bottom-0"
          aria-label={Heading || "category link"}
        />)}
    </div>
  );
};

export default CategoryBanner;
