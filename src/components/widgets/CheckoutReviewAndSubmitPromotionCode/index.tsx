import React from "react";
import { CheckoutReviewAndSubmitPromotionCodeProps } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CheckoutReviewAndSubmitPromotionCode: React.FC<
  CheckoutReviewAndSubmitPromotionCodeProps
> = (props) => {
  console.log(`CheckoutReviewAndSubmitPromotionCode props:`, props);
  return (
    <div className="bg-white p-4">
      <label className="text-muted text-lg font-lora font-bold mb-2 block">
        Have a Promotion Code?
      </label>
      <div className="flex">
        <Input className="bg-white border-muted/50 h-14 rounded-none flex-grow" />
        <Button>
          APPLY
        </Button>
      </div>
    </div>
  );
};

export default CheckoutReviewAndSubmitPromotionCode;
