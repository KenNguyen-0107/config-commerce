import Icon from "@/components/shared/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function ProductCardReview({
  reviews,
  className,
}: {
  reviews: number;
  className?: string;
}) {
  const popupData = [
    { rate: "5 stars", quantity: 0 },
    { rate: "4 stars", quantity: 0 },
    { rate: "3 stars", quantity: 0 },
    { rate: "2 stars", quantity: 0 },
    { rate: "1 star", quantity: 0 },
  ];
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row justify-start items-start lg:items-center gap-4 font-lora cursor-pointer",
        className
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex ">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    iconName="star"
                    size={18}
                    viewSize={18}
                    className="mr-[2px]"
                  />
                ))}
              </div>
              <div className="text-black text-base text-sm font-lora inline-flex items-center gap-1">
                {reviews} reviews
                <Icon iconName="review" size={12} viewSize={12} />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm">
              <div className="mb-2">
                <div className="text-lg font-semibold text-gray-800">
                  Rated 5 out of 5 stars
                </div>
              </div>
              <div className="space-y-2" role="table">
                <div role="row" className="flex justify-between mb-2">
                  <div
                    className="sr-only"
                    role="columnheader"
                    id="ratings-header"
                  >
                    Star rating
                  </div>
                  <div className="sr-only" role="columnheader">
                    Number of reviews
                  </div>
                </div>
                <div>
                  <>
                    {popupData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3"
                        role="row"
                      >
                        <div
                          className="w-20 text-sm text-gray-600"
                          id="translation-stars5"
                          role="cell"
                        >
                          {item.rate}
                        </div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            id="colour-5"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <div
                          className="w-10 text-sm text-gray-600 text-right"
                          id="star-score-5"
                          role="cell"
                        >
                          {`(${item.quantity})`}
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
