
import React from 'react';
import { OrderHistoryPaginationProps } from './types';

const OrderHistoryPagination: React.FC<OrderHistoryPaginationProps> = (props) => {
  console.log(`OrderHistoryPagination props:`, props);
  return (
    <>
      <h1>OrderHistoryPagination</h1>
      {/* Render more fields from OrderHistoryPaginationData here */}
    </>
  );
};

export default OrderHistoryPagination;
