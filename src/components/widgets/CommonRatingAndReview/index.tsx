import PLPRatingBlock from "@/components/cms/PLPRatingBlock";
import RatingCardCarousel, {
	RatingCardProps,
} from "@/components/cms/RatingBlock/RatingCardCarousel";
import { cn } from "@/lib/utils";
import { getSdk } from "@/sdk";
import React from "react";
import { CommonRatingAndReviewProps } from "./types";
import { getImgSrc } from "@/components/utils";
import CommonImage from "@/components/shared/CommonImage";
import { SmartLink } from "@/components/shared/smartLink";

const CommonRatingAndReview: React.FC<CommonRatingAndReviewProps> = async (props) => {
	const { Section } = props;

	const url = props.Info?.Url;
	const isPdpPage = props.Info?.Url !== "/";
	const sdk = getSdk();
	const data = await sdk.getRatingReview({ url, languageCode: process.env.SITE_LANGUAGE });
	const ratingData = data.RatingAndReviewPage?.items as RatingCardProps[];

	if (Section === "PdpRatingDetail") {
		return <PLPRatingBlock data={ratingData} />;
	}

	return (
		<section
			className={cn(
				"font-helvetical w-full bg-muted-background overflow-hidden",
				"container mx-auto px-4 lg:px-0",
				"flex gap-[56px] justify-center lg:justify-normal",
				isPdpPage && "bg-white py-10 lg:pt-10 lg:pb-[120px]"
			)}
		>
			<div className="text-center">
				<div className="text-2xl font-bold mb-2">Excellent</div>
				<div className="flex items-center mb-2 gap-[2px]">
					{[...Array(5)].map((_, i) => (
						<CommonImage
							src={`/icons/star.svg`}
							alt="star"
							width={30}
							height={30}
							key={i}
							unoptimized
						/>
					))}
				</div>
				<div className="text-muted text-xs">
					Based on{" "}
					<SmartLink href="#" className="underline text-black font-medium">
						3,405 reviews
					</SmartLink>
				</div>
				<CommonImage
					src={getImgSrc("/UserFiles/Homepage/trupilot.png?width=128&height=30")}
					alt="Trustpilot"
					className="mt-2"
					width={128}
					height={30}
				/>
			</div>
			{ratingData && ratingData.length > 0 && (
				<div className="hidden lg:block lg:max-w-[906px]">
					<RatingCardCarousel data={ratingData} />
					<div className="text-xs text-muted mt-4 ml-8">Showing our 4 & 5 star review</div>
				</div>
			)}
		</section>
	);
};

export default CommonRatingAndReview;
