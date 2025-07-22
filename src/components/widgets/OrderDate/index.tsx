
import React from 'react';
import { OrderDateProps } from './types';

const OrderDate: React.FC<OrderDateProps> = (props) => {
  console.log(`OrderDate props:`, props);
  return (
    <>
      <h1>OrderDate</h1>
      {/* Render more fields from OrderDateData here */}
    </>
  );
};

export default OrderDate;
