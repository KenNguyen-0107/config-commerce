
import React from 'react';
import { OrderDetailsVmiLocationProps } from './types';

const OrderDetailsVmiLocation: React.FC<OrderDetailsVmiLocationProps> = (props) => {
  console.log(`OrderDetailsVmiLocation props:`, props);
  return (
    <>
      <h1>OrderDetailsVmiLocation</h1>
      {/* Render more fields from OrderDetailsVmiLocationData here */}
    </>
  );
};

export default OrderDetailsVmiLocation;
