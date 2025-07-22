
import React from 'react';
import { OrderPoProps } from './types';

const OrderPo: React.FC<OrderPoProps> = (props) => {
  console.log(`OrderPo props:`, props);
  return (
    <>
      <h1>OrderPo</h1>
      {/* Render more fields from OrderPoData here */}
    </>
  );
};

export default OrderPo;
