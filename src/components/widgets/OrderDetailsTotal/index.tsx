
import React from 'react';
import { OrderDetailsTotalProps } from './types';

const OrderDetailsTotal: React.FC<OrderDetailsTotalProps> = (props) => {
  console.log(`OrderDetailsTotal props:`, props);
  return (
    <>
      <h1>OrderDetailsTotal</h1>
      {/* Render more fields from OrderDetailsTotalData here */}
    </>
  );
};

export default OrderDetailsTotal;
