
import React from 'react';
import { OrderDetailsSummaryTableProps } from './types';
import RenderOrderSummaryTable from '@/app/my-account/orders/[orderId]/RenderOrderSummaryTable';

const OrderDetailsSummaryTable: React.FC<OrderDetailsSummaryTableProps> = (props) => {
  return (
    <RenderOrderSummaryTable />
  );
};

export default OrderDetailsSummaryTable;
