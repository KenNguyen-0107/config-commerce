
import React from 'react';
import { CheckoutReviewAndSubmitPaymentDetailsProps } from './types';
import PaymentDetail from '@/app/checkout/review/PaymentDetail';

const CheckoutReviewAndSubmitPaymentDetails: React.FC<CheckoutReviewAndSubmitPaymentDetailsProps> = (props) => {
  console.log(`CheckoutReviewAndSubmitPaymentDetails props:`, props);
  return (
    <PaymentDetail />
  );
};

export default CheckoutReviewAndSubmitPaymentDetails;
