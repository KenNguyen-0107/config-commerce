
import React from 'react';
import { OrderDetailsPaymentTermsProps } from './types';

const OrderDetailsPaymentTerms: React.FC<OrderDetailsPaymentTermsProps> = (props) => {
  console.log(`OrderDetailsPaymentTerms props:`, props);
  return (
    <>
      <h1>OrderDetailsPaymentTerms</h1>
      {/* Render more fields from OrderDetailsPaymentTermsData here */}
    </>
  );
};

export default OrderDetailsPaymentTerms;
