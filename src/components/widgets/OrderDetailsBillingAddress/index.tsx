
import React from 'react';
import { OrderDetailsBillingAddressProps } from './types';
import RenderOrderBilling from '@/app/my-account/orders/[orderId]/RenderOrderBilling';

const OrderDetailsBillingAddress: React.FC<OrderDetailsBillingAddressProps> = (props) => {
  return (
    <RenderOrderBilling />
  );
};

export default OrderDetailsBillingAddress;
