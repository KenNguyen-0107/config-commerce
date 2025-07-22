"use client";

import PDPRatingItem from "./PDPRatingItem";
import { RatingCardProps } from "../RatingBlock/RatingCardCarousel";
import Icon from "@/components/shared/icons";
import Link from "next/link";
import Image from "next/image";
import { getImgSrc } from "@/components/utils";

export default function PLPRatingBlock({ data }: { data: RatingCardProps[] }) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-duck">
      <div className="text-center">
        <h2 className="font-bold tracking-tight text-white">TRUSTPILOT</h2>
        <div className="flex items-center justify-center gap-2 mt-10">
          <span className="text-[28px] font-medium text-white">Excellent</span>
          <div className="flex gap-[2px]">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} iconName="star" size={40} viewSize={18} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-white text-xs font-helvetical">
            Based on{" "}
            <Link href="#" className="underline font-medium">
              3,405 reviews
            </Link>
          </span>
          <Image
              src={getImgSrc("/UserFiles/Homepage/trupilot.png?width=128&height=30")}
              alt="Trustpilot"
              className=""
              width={102}
              height={24}
            />
        </div>
      </div>

      <div className="mt-10 space-y-4 h-[452px] overflow-auto">
        {data.map((item, index) => (
          <PDPRatingItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
