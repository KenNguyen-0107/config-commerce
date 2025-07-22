
import React from 'react';
import { OrderDetailsSummaryTableProps } from './types';

const OrderDetailsSummaryTable: React.FC<OrderDetailsSummaryTableProps> = (props) => {
  console.log(`OrderDetailsSummaryTable props:`, props);
  return (
    <>
      <h1>OrderDetailsSummaryTable</h1>
      {/* Render more fields from OrderDetailsSummaryTableData here */}
    </>
  );
};

export default OrderDetailsSummaryTable;
