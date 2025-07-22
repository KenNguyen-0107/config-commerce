"use client";
import CustomSwiper from "@/components/common/CustomSwiper";
import Icon from "@/components/shared/icons";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";

export interface  RatingCardProps {
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
  WebsiteId: string
}

const RatingCardCarousel = ( {data}: {data: RatingCardProps[]}) => {
  const [, setIsHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setIsHoveredIndex(index);
  };
  const handleMouseLeave = () => {
    setIsHoveredIndex(null);
  };

  return (
    <CustomSwiper
      wrapperClass="pl-8 pr-[56px]"
      slidesPerView={3}
      breakpoints={{
        1025: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      }}
      buttonPrevClass={"-left-6"}
      buttonNextClass={"right-0"}
      navigation={data.length > 3}
    >
      {data.map((review, index) => (
        <SwiperSlide
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          key={index}
        >
          <Card className="font-helvetical h-full">
            <div className="flex items-center mb-4 gap-[2px]">
              {[...Array(review.Rating)].map((_, i) => (
                <Icon iconName="star" key={i} size={18} className="w-[18px] h-[18px]" />
              ))}
              <div className="flex items-center ml-2 text-muted">
                <Icon iconName="greytick" size={16} viewSize={16} />
                <span className="text-sm ml-1">Verified</span>
              </div>
            </div>
            <h3 className="font-bold helvetical-bold text-[18px] mb-2">{review.Title}</h3>
            <div className="text-[14px] font-normal mb-4" dangerouslySetInnerHTML={{ __html:review.Body }}></div>
            <div className="flex items-center text-muted text-xs">
              <span className="font-medium mr-2 text-black">Gillygate, </span>
              <span>15 hours ago</span>
            </div>
          </Card>
        </SwiperSlide>
      ))}
    </CustomSwiper>
  );
};

export default RatingCardCarousel;
