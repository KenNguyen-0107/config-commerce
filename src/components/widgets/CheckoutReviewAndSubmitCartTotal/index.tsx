
import React from 'react';
import { CheckoutReviewAndSubmitCartTotalProps } from './types';
import CheckoutSummary from '@/app/checkout/address/CheckoutSummary';

const CheckoutReviewAndSubmitCartTotal: React.FC<CheckoutReviewAndSubmitCartTotalProps> = (props) => {
  console.log(`CheckoutReviewAndSubmitCartTotal props:`, props);
  return (
    <CheckoutSummary />
  );
};

export default CheckoutReviewAndSubmitCartTotal;
