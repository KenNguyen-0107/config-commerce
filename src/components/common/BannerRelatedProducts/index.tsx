"use client";

import CustomSwiper from "@/components/common/CustomSwiper";
import { SmartLink } from "@/components/shared/smartLink";
import { getProductThumbnail } from "@/components/utils";
import { ProductProps } from "@/components/widgets/Product/types";
import { ProductImage } from "@/gql/graphql";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { SwiperSlide } from "swiper/react";

const BannerRelatedProducts: React.FC<{ data?: ProductProps[]; envPrefix?: string }> = (props) => {
	const { data, envPrefix } = props;
	const BannerRelatedProductsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!!data?.length) return;
		const parentNode = BannerRelatedProductsRef.current?.closest(
			`[data-component="${envPrefix}BasicGrid"]`
		);
		const closestBasicBanner = parentNode?.querySelector(
			`[data-component="${envPrefix}BasicBanner"]`
		);
		if (closestBasicBanner) {
			parentNode?.remove();
		}
		// 	closestBasicBanner.remove();
		// 	BannerRelatedProductsRef.current?.remove();
	}, [data, envPrefix]);

	if (!data?.length) return <div ref={BannerRelatedProductsRef}></div>;

	return (
		<div
			ref={BannerRelatedProductsRef}
			className={`py-0 flex flex-col lg:flex-row gap-4 lg:gap-8 w-full max-w-[100vw] lg:max-w-[1120px] mx-auto lg:p-0`}
		>
			<div className="lg:max-w-[700px] max-w-full mx-auto relative">
				<CustomSwiper
					slidesPerView={2}
					slidesPerGroup={1}
					breakpoints={{
						1025: {
							slidesPerView: 2,
							grid: {
								rows: 1,
								fill: "row",
							},
							pagination: {
								clickable: true,
								modifierClass: "modifierPorpularbullets",
							},
							spaceBetween: 32,
						},
					}}
					navigation={data.length > 2}
					loop={data.length > 2}
					spaceBetween={16}
					buttonPrevClass={"-right-11 top-[calc(50%-16px)]"}
					buttonNextClass={"-right-11 top-[calc(50%+32px)]"}
				>
					{data.map((product, index: number) => {
						return (
							<SwiperSlide key={index}>
								<div className="relative flex items-center justify-center h-[167px] lg:h-[334px] p-1 lg:p-2">
									<Image
										src={getProductThumbnail(product.ImageContainer?.Images as ProductImage[])}
										alt={
											(product.ImageContainer?.Images?.[0]?.ImageAltText as string) ||
											product.ProductTitle ||
											"product image"
										}
										width={150}
										height={150}
										className="absolute top-0 left-0 w-full h-full"
									/>

									<div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
									<h2 className="text-white text-center relative z-[1] uppercase">
										{product.ProductTitle}
									</h2>
									<SmartLink
										href={product.Url || ""}
										title={product.ProductTitle || ""}
										className="absolute top-0 left-0 right-0 bottom-0 z-[2]"
									/>
								</div>
							</SwiperSlide>
						);
					})}
				</CustomSwiper>
			</div>
		</div>
	);
};

export default BannerRelatedProducts;
