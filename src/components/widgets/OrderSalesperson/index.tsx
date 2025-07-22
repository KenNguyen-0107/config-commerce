
import React from 'react';
import { OrderSalespersonProps } from './types';

const OrderSalesperson: React.FC<OrderSalespersonProps> = (props) => {
  console.log(`OrderSalesperson props:`, props);
  return (
    <>
      <h1>OrderSalesperson</h1>
      {/* Render more fields from OrderSalespersonData here */}
    </>
  );
};

export default OrderSalesperson;
