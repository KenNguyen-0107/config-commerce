"use client"

import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import CustomSwiper from "@/components/common/CustomSwiper";
import { SwiperSlide } from "swiper/react";
import { ProductImage } from "@/gql/graphql";
import { getImgSrc } from "@/components/utils";

interface ProductGalleryProps {
  images: ProductImage[];
  onOpenPopup: () => void;
}

export function ProductGallery({ images, onOpenPopup }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="relative">
      <div className="relative aspect-square lg:aspect-[4/3] overflow-hidden rounded-lg bg-light-gray-background">
        <button
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-10"
          onClick={onOpenPopup}
        >
          <ZoomIn className="w-5 h-5 text-blue" />
        </button>
        <CustomSwiper
          slidesPerView={1}
          loop={false}
          breakpoints={{
            1025: {
              slidesPerView: 1, // mấy col 1 slide
              slidesPerGroup: 1, // 1 lần kéo thì mấy col trượt
              grid: {
                rows: 1,
                fill: "row",
              },
              pagination: false,
            },
          }}
          spaceBetween={32}
          pagination={{
            clickable: true,
            modifierClass: "modifierAppPlanningPagination",
          }}
          buttonPrevClass={"left-4"}
          buttonNextClass={"right-4"}
        >
          {images.map((item, index: number) => (
            <SwiperSlide key={index} className="h-full">
              <Image
                src={getImgSrc(item.LargeImagePath || "")}
                alt={item.ImageAltText || ""}
                width={300}
                height={100}
                className="mx-auto w-full h-auto object-cover"
              />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {images.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden",
              currentImage === index ? "" : " opacity-50"
            )}
            onClick={() => {
              setCurrentImage(index);
            }}
          >
            <Image
              src={getImgSrc(item.SmallImagePath || "")}
              alt={`Thumbnail ${index + 1}`}
              height={100}
              width={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
