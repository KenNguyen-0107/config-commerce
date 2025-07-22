
import React from 'react';
import { CheckoutReviewAndSubmitHeaderProps } from './types';

const CheckoutReviewAndSubmitHeader: React.FC<CheckoutReviewAndSubmitHeaderProps> = (props) => {
  console.log(`CheckoutReviewAndSubmitHeader props:`, props);
  return (
      <div className="text-3xl lg:text-[40px] flex items-center justify-between mb-10">
        <div className="flex justify-start gap-4 items-end">
          <h1 className="text-2xl font-bold text-blue">CHECKOUT</h1>
          {/* <span className="text-lg text-duck">STEP 2/2</span> */}
        </div>
        <div className="w-24">
        </div>
      </div>
    );
};

export default CheckoutReviewAndSubmitHeader;
