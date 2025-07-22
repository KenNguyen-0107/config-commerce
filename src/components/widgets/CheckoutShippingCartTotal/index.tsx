
import React from 'react';
import { CheckoutShippingCartTotalProps } from './types';
import CheckoutSummary from '@/app/checkout/address/CheckoutSummary';

const CheckoutShippingCartTotal: React.FC<CheckoutShippingCartTotalProps> = () => {
  return (
    <CheckoutSummary />
  );
};

export default CheckoutShippingCartTotal;
