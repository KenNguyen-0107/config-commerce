"use client"

import Link from "next/link";
import RightBanner from "./RightBanner";
import Icon from "@/components/shared/icons";
import { ISubLinks } from ".";
import { LinkFields } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const SubMenu = ({ linksByLevel, item }: { linksByLevel: ISubLinks[], item: LinkFields }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className={cn(
        "absolute z-10 top-full left-0 right-0 bg-muted-background shadow-lg h-[500px]",
        "transform transition-all duration-500 ease-in-out",
        "invisible opacity-0 group-hover:visible group-hover:opacity-100"
      )}
      onMouseEnter={() => setIsVisible(true)}
    >
      <h4 className="uppercase container text-blue mt-10 mb-6">
        {item?.Title || ""}
      </h4>
      <div className="container relative">
        {linksByLevel?.map((subLink, index) => (
          <div
            key={index}
            className="group/item pb-2 font-frutiger-bold w-content"
          >
            <div className="flex items-center gap-[6px] text-muted hover:text-blue cursor-pointer z-10 relative">
              <Link href={subLink.Url || ""} title={subLink.Title}>
                {subLink.Title}
              </Link>
              <Icon
                iconName="arrowhover"
                size={12}
                viewSize={10}
                className="hidden group-hover/item:block"
              />
            </div>
            {!!subLink?.children && (
              <div
                className={cn(
                  "absolute left-[170px] pl-[calc(20%-80px)] pr-[165px] h-full top-0 space-y-2 z-20 w-content",
                  "transform transition-all duration-500 ease-in-out",
                  "invisible opacity-0 group-hover/item:opacity-100 group-hover/item:visible"
                )}
              >
                {subLink?.children.length > 0 ? subLink?.children.map((sub) => (
                  <div key={sub.Id}>
                    <Link
                      title={sub.Title}
                      href={sub.Url || "/"}
                      className="text-muted inline-block lg:min-w-48"
                    >
                      <div
                        className="border-b-[2px] border-transparent hover:border-yellow w-content"
                        key={sub.Id}
                      >
                        {sub.Title}
                      </div>
                    </Link>
                  </div>
                )) : <div className="lg:min-w-48"></div>}
              </div>
            )}
            <RightBanner isVisible={isVisible} url={subLink?.Url as string} bgImgSrc={subLink?.bgImgSrc || ""} properties={subLink?.properties} altText={subLink?.AltText || ""} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubMenu;
