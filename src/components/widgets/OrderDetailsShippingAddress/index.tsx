
import React from 'react';
import { OrderDetailsShippingAddressProps } from './types';
import RenderOrderShipping from '@/app/my-account/orders/[orderId]/RenderOrderShipping';

const OrderDetailsShippingAddress: React.FC<OrderDetailsShippingAddressProps> = (props) => {
  return (
    <RenderOrderShipping />
  );
};

export default OrderDetailsShippingAddress;
