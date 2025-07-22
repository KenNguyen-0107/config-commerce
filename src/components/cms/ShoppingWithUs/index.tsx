"use client";

import CustomSwiper from "@/components/common/CustomSwiper";
import { SwiperSlide } from "swiper/react";
import "../AppPlanningTool";

export default function ShoppingWithUs({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-duck py-10 px-4 lg:py-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <h2 className="font-frutiger-bold text-white text-2xl lg:text-[32px] font-bold mb-2">
          Shopping with us
        </h2>
        <p className="font-lora text-white lg:text-lg max-w-3xl mx-auto">
          We offer the longest guarantee in the industry for manufactured timber
          products.
        </p>

        <div className="lg:gap-8 mt-10">
          <div className="px-8 max-w-[1120px] mx-auto">
            <CustomSwiper
              freeMode={true}
              slidesPerView={1}
              breakpoints={{
                1025: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  grid: {
                    rows: 1,
                    fill: "row",
                  },
                },
              }}
              spaceBetween={32}
              navigation={false}
              pagination={{
                clickable: true,
                modifierClass: "modifierAppPlanningPagination",
              }}
            >
              {Array.isArray(children) ? (
                children[0][1].map((child: any, index: number) => (
                  <SwiperSlide key={index} className="h-full">
                    {child}
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide className="h-full">{children}</SwiperSlide>
              )}
            </CustomSwiper>
          </div>
        </div>
      </div>
    </div>
  );
}
