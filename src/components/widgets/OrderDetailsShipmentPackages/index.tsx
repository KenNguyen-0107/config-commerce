
import React from 'react';
import { OrderDetailsShipmentPackagesProps } from './types';

const OrderDetailsShipmentPackages: React.FC<OrderDetailsShipmentPackagesProps> = (props) => {
  console.log(`OrderDetailsShipmentPackages props:`, props);
  return (
    <>
      <h1>OrderDetailsShipmentPackages</h1>
      {/* Render more fields from OrderDetailsShipmentPackagesData here */}
    </>
  );
};

export default OrderDetailsShipmentPackages;
