"use client";
import React from "react";
import { SlideShowProps } from "./types";
import PopularProduct from "@/components/cms/PopularProduct";
import RatingBlock from "@/components/cms/RatingBlock";
import AppPlanningTool from "@/components/cms/AppPlanningTool";
import { SlideItem } from "@/gql/graphql";

const SlideShow: React.FC<SlideShowProps> = (props) => {
  const { SlideType, Section } = props;
  const data = props.SlideContainer?.SlideItems || []

  return (
    <>
      {SlideType === "productcarousel" && <PopularProduct data={data as SlideItem[]} />}
      {SlideType === "ratingcarousel" && <RatingBlock />}
      {SlideType && ["planningcarousel", "shoppingcarousel"].includes(SlideType) && <AppPlanningTool data={data as SlideItem[]} type={SlideType} section={Section || ''} />}
    </>
  );
};

export default SlideShow;
