"use client";

import type React from "react";
import { useState, lazy, Suspense } from "react";
import CommonImage from "@/components/shared/CommonImage";
import useDevice from "@/hook/useDevice";
import { useIntersectionObserver } from "@/hook/useIntersectionObserver";

// Lazy load both Swiper components together
const SwiperComponents = lazy(() =>
	Promise.all([import("@/components/common/CustomSwiper"), import("swiper/react")]).then(
		([CustomSwiperModule, SwiperReactModule]) => ({
			default: (props: any) => {
				const CustomSwiper = CustomSwiperModule.default;
				const { SwiperSlide } = SwiperReactModule;
				return (
					<CustomSwiper {...props.swiperProps}>
						{props.reviews.map((review: any, index: number) => (
							<SwiperSlide
								onMouseEnter={() => props.onMouseEnter(index)}
								onMouseLeave={props.onMouseLeave}
								key={index}
							>
								<div className="flex items-center mb-4 gap-[2px]">
									{[...Array(review.Rating)].map((_, i) => (
										<CommonImage
											src={`/icons/star.svg`}
											alt="star"
											width={18}
											height={18}
											key={i}
											unoptimized
										/>
									))}
									<div className="flex items-center ml-2 text-muted">
										<CommonImage
											src={`/icons/check-round.svg`}
											alt="check"
											width={14}
											height={14}
											unoptimized
										/>
										<span className="text-sm ml-1">Verified</span>
									</div>
								</div>
								<h3 className="font-bold helvetical-bold text-[18px] mb-2">{review.Title}</h3>
								<div
									className="text-[14px] font-normal mb-4"
									dangerouslySetInnerHTML={{ __html: review.Body }}
								></div>
								<div className="flex items-center text-muted text-xs">
									<span className="font-medium mr-2 text-black">Gillygate, </span>
									<span>15 hours ago</span>
								</div>
							</SwiperSlide>
						))}
					</CustomSwiper>
				);
			},
		})
	)
);

export interface RatingCardProps {
	Body: string;
	ExcludeFromNavigation: boolean;
	ExcludeFromSignInRequired: boolean;
	HideBreadcrumbs: boolean;
	HideFooter: boolean;
	HideHeader: boolean;
	HorizontalRule: string | null;
	Id: string;
	LayoutPage: string | null;
	LayoutPageId: string | null;
	MetaDescription: string | null;
	MetaKeywords: string | null;
	Name: string;
	NodeId: string;
	OpenGraphImage: string | null;
	OpenGraphTitle: string | null;
	OpenGraphUrl: string | null;
	ParentId: string;
	Rating: number;
	SortOrder: number;
	Status: string;
	StructuredPageData: string | null;
	TemplateHash: string;
	Title: string;
	Type: string;
	Url: string;
	UrlSegment: string;
	VariantName: string | null;
	Verified: boolean;
	WebsiteId: string;
}

const RatingCardCarousel = ({ data }: { data: RatingCardProps[] }) => {
	const [, setIsHoveredIndex] = useState<number | null>(null);
	const { isMobile } = useDevice();
	const { elementRef, hasBeenVisible } = useIntersectionObserver();

	const handleMouseEnter = (index: number) => {
		setIsHoveredIndex(index);
	};

	const handleMouseLeave = () => {
		setIsHoveredIndex(null);
	};

	if (isMobile) {
		return null;
	}

	// Render static HTML first
	const renderStaticReviews = () => {
		// Show only the first 3 reviews in static mode
		return data.slice(0, 3).map((review, index) => (
			<div key={index} className="inline-block w-1/3 px-2">
				<div className="flex items-center mb-4 gap-[2px]">
					{[...Array(review.Rating)].map((_, i) => (
						<CommonImage
							src={`/icons/star.svg`}
							alt="star"
							width={18}
							height={18}
							key={i}
							unoptimized
						/>
					))}
					<div className="flex items-center ml-2 text-muted">
						<CommonImage
							src={`/icons/check-round.svg`}
							alt="check"
							width={14}
							height={14}
							unoptimized
						/>
						<span className="text-sm ml-1">Verified</span>
					</div>
				</div>
				<h3 className="font-bold helvetical-bold text-[18px] mb-2">{review.Title}</h3>
				<div
					className="text-[14px] font-normal mb-4"
					dangerouslySetInnerHTML={{ __html: review.Body }}
				></div>
				<div className="flex items-center text-muted text-xs">
					<span className="font-medium mr-2 text-black">Gillygate, </span>
					<span>15 hours ago</span>
				</div>
			</div>
		));
	};

	// Render the interactive Swiper when in view
	const renderSwiper = () => {
		const swiperProps = {
			wrapperClass: "pl-8 pr-[56px]",
			slidesPerView: 3,
			breakpoints: {
				1025: {
					slidesPerView: 3,
					slidesPerGroup: 3,
				},
			},
			buttonPrevClass: "-left-6",
			buttonNextClass: "right-0",
			navigation: data.length > 3,
		};

		return (
			<Suspense fallback={<div className="pl-8 pr-[56px] flex">{renderStaticReviews()}</div>}>
				<SwiperComponents
					swiperProps={swiperProps}
					reviews={data}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
			</Suspense>
		);
	};

	return (
		<div ref={elementRef as React.RefObject<HTMLDivElement>}>
			{hasBeenVisible ? (
				renderSwiper()
			) : (
				<div className="pl-8 pr-[56px] flex">{renderStaticReviews()}</div>
			)}
		</div>
	);
};

export default RatingCardCarousel;
