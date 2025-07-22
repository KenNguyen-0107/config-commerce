"use client";

import CardInformation from "@/components/common/CardInformation";
import CustomSwiper from "@/components/common/CustomSwiper";
import { SwiperSlide } from "swiper/react";
// import "./styles.css";
import { SlideItem } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import PLPTopSlide from "./PLPTopSlide";

export default function AppPlanningTool({
  data,
  type,
  section,
}: {
  data: SlideItem[];
  type?: string;
  section?: string;
}) {
  return (
    <CustomSwiper
      slidesPerView={1}
      loop={true}
      breakpoints={{
        1025: {
          slidesPerView: section == "USP" ? 4 : 3,
          slidesPerGroup: 1,
          grid: {
            rows: 1,
            fill: "row",
          },
          pagination: false,
        },
      }}
      spaceBetween={32}
      navigation={false}
      pagination={{
        clickable: true,
        modifierClass: "modifierAppPlanningPagination",
      }}
    >
      {data && data.map((slide: SlideItem, index: number) => (
        <SwiperSlide key={index} className={cn("h-full", section == "USP" ? 'md:max-w-[calc((100%-96px)/4)] py-6 mr-8' : '')}>
          <CardInformation
            order={index}
            {...slide}
            type={type || ""}
            section={section}
          />
        </SwiperSlide>
      ))}
    </CustomSwiper>
  );
}
