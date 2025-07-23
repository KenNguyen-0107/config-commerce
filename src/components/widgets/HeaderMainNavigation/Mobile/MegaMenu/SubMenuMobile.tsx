"use client";

import { LinkFields } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ISubLinks } from "../..";
import CategoryLevelOne from "../Category/LevelOne";
import { SmartLink } from "@/components/shared/smartLink";

const SubMenuMobile = ({
	linksByLevel,
	item,
}: {
	linksByLevel: ISubLinks[];
	item: LinkFields;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
      {linksByLevel?.length < 1 &&
        <SmartLink href={item?.Destination?.Url || ""}
          className="w-full flex items-center justify-between pl-6 pr-4 py-3"
        >
          <h4 className="uppercase text-blue">
            {item?.OverrideTitle || item?.OverriddenTitle || item?.Title}
          </h4>
        </SmartLink>
      }
      {linksByLevel?.length > 0 && (
        <div
          className={cn(
            isExpanded && "absolute top-0 right-0 w-full h-screen bg-white",
          )}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "w-full flex items-center justify-between pl-6 pr-4 py-3 transition-all",
              isExpanded && "mb-2 bg-muted-background gap-4 justify-start",
            )}
          >
            {isExpanded && <ChevronLeft size={20} />}

            <h4 className="uppercase text-blue">
              {item?.OverrideTitle || item?.OverriddenTitle || item?.Title}
            </h4>

            {!isExpanded && <ChevronRight size={20} />}
          </button>
          <div className={cn(
            "transition-all ease-in-out",
            isExpanded ? "opacity-100 visible block" : "opacity-0 invisible hidden"
          )}>
            <SmartLink
              href={item.Destination?.Url || ""}
              className="pl-6 pr-4 py-3 flex"
            >
              <h4 className="uppercase text-blue">
                View all
              </h4>
            </SmartLink>
            <CategoryLevelOne linksByLevel={linksByLevel} />
          </div>
        </div>
      )}
		</>
	);
};

export default SubMenuMobile;
