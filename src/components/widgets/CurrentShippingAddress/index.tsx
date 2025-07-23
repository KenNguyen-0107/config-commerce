
import React from 'react';
import { CurrentShippingAddressProps } from './types';
import MyShippingAddress from '@/app/my-account/address/MyShippingAddress';

const CurrentShippingAddress: React.FC<CurrentShippingAddressProps> = (props) => {
  return (
    <MyShippingAddress />
  );
};

export default CurrentShippingAddress;
