
import React from 'react';
import { CheckoutReviewAndSubmitCartTotalProps } from './types';
import CheckoutSummary from '@/app/checkout/address/CheckoutSummary';

const CheckoutReviewAndSubmitCartTotal: React.FC<CheckoutReviewAndSubmitCartTotalProps> = (props) => {
  return (
    <CheckoutSummary />
  );
};

export default CheckoutReviewAndSubmitCartTotal;
