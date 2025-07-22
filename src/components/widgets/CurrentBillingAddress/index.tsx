
import React from 'react';
import { CurrentBillingAddressProps } from './types';
import MyShippingAddress from '@/app/my-account/address/MyShippingAddress';

const CurrentBillingAddress: React.FC<CurrentBillingAddressProps> = (props) => {
  console.log(`CurrentBillingAddress props:`, props);
  return (
    <MyShippingAddress />
  );
};

export default CurrentBillingAddress;
