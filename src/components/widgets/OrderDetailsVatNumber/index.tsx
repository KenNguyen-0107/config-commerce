
import React from 'react';
import { OrderDetailsVatNumberProps } from './types';

const OrderDetailsVatNumber: React.FC<OrderDetailsVatNumberProps> = (props) => {
  console.log(`OrderDetailsVatNumber props:`, props);
  return (
    <>
      <h1>OrderDetailsVatNumber</h1>
      {/* Render more fields from OrderDetailsVatNumberData here */}
    </>
  );
};

export default OrderDetailsVatNumber;
