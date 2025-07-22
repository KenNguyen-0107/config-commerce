
import React from 'react';
import { OrderCancelNotificationProps } from './types';

const OrderCancelNotification: React.FC<OrderCancelNotificationProps> = (props) => {
  console.log(`OrderCancelNotification props:`, props);
  return (
    <>
      <h1>OrderCancelNotification</h1>
      {/* Render more fields from OrderCancelNotificationData here */}
    </>
  );
};

export default OrderCancelNotification;
