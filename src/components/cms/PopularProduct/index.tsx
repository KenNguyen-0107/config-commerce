"use client";

import CustomSwiper from "@/components/common/CustomSwiper";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { getImgSrc } from "@/components/utils";
import { SlideItem } from "@/gql/graphql";
import Link from "next/link";
import LazyImage from "@/components/shared/lazyImage";

export default function PopularProduct({ data }: { data: SlideItem[] }) {
  if (!data || data.length <= 0) return null;

  return (
    <div
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
          loop={true}
          spaceBetween={16}
          buttonPrevClass={"hidden lg:block -right-11 top-[calc(50%-16px)]"}
          buttonNextClass={"hidden lg:block -right-11 top-[calc(50%+32px)]"}
        >
          {data.map((slide, index: number) => {
            const renderImage = () => (
              <>
                <LazyImage
                  src={getImgSrc(slide?.Image || "")}
                  alt={slide?.SlideTitle || "product image"}
                  width={150}
                  height={150}
                  className="absolute top-0 left-0 w-full h-full"
                />
                {slide?.ImageOverlay && (
                  <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: slide?.ImageOverlay }}></div>
                )}
              </>
            );
            const imageComponent = () => {
              if (slide?.Image) {
                return !slide.BackgroundLink?.Value?.length ? (
                  renderImage()
                ) : (
                  <Link
                    href={slide?.BackgroundLink?.Url || "/"}
                    title={slide?.BackgroundLink?.Value || "link title"}
                  >
                    {renderImage()}
                  </Link>
                );
              }
              return <></>;
            };

            return (
              <SwiperSlide key={index}>
                <div
                  className="relative flex items-center justify-center h-[167px] lg:h-[334px] p-1 lg:p-2"
                  style={{
                    backgroundColor: slide?.BackgroundColor || "transparent",
                  }}
                >
                  {imageComponent()}
                  <div
                    className="text-white text-center relative z-10 uppercase"
                    dangerouslySetInnerHTML={{ __html: slide?.Heading || "" }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </CustomSwiper>
      </div>
    </div>
  );
}
