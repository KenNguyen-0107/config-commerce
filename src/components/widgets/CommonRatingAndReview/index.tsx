import PLPRatingBlock from "@/components/cms/PLPRatingBlock";
import RatingCardCarousel, {
  RatingCardProps,
} from "@/components/cms/RatingBlock/RatingCardCarousel";
import Icon from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { getSdk } from "@/sdk";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CommonRatingAndReviewProps } from "./types";
import { getImgSrc } from "@/components/utils";
import LazyImage from "@/components/shared/lazyImage";

const CommonRatingAndReview: React.FC<CommonRatingAndReviewProps> = async (
  props
) => {
  const { Section } = props;

  const url = props.Info?.Url;
  const isPdpPage = props.Info?.Url !== "/";
  const sdk = getSdk();
  const data = await sdk.getRatingReview({ url });
  const ratingData = data.RatingAndReviewPage?.items as RatingCardProps[];

  if (Section === "PdpRatingDetail") {
    return <PLPRatingBlock data={ratingData} />;
  }

  return (
    <section
      className={cn(
        "font-helvetical w-full bg-muted-background overflow-hidden",
        isPdpPage && "bg-white px-4 py-10 lg:px-0 lg:pt-10 lg:pb-[120px]"
      )}
    >
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex gap-[56px] justify-center lg:justify-normal">
          <div className="lg:mx-0 lg:mb-0 text-center shrink-0">
            <div className="text-2xl font-bold mb-2">Excellent</div>
            <div className="flex items-center mb-2 gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <Icon iconName="star" key={i} size={30} className="w-[30px] h-[30px]" />
              ))}
            </div>
            <div className="text-muted text-xs">
              Based on{" "}
              <Link href="#" className="underline text-black font-medium">
                3,405 reviews
              </Link>
            </div>
            <LazyImage
              src={getImgSrc("/UserFiles/Homepage/trupilot.png?width=128&height=30")}
              alt="Trustpilot"
              className="mt-2"
              width={128}
              height={30}
            />
          </div>
          {ratingData && ratingData.length > 0 && (
            <div className="hidden lg:block max-w-[calc(100%-2rem)] lg:max-w-[906px]">
              <div className=" relative">
                <RatingCardCarousel data={ratingData} />
              </div>
              <div className="hidden lg:block text-xs text-muted mt-4 ml-8">
                Showing our 4 & 5 star review
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommonRatingAndReview;
