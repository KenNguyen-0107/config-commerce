
import React from 'react';
import { CheckoutShippingAddressesProps } from './types';
import UserAddressInfo, { AddressDataProps } from '@/app/checkout/address/UserAddressInfo';
import { getSdk } from '@/sdk';
import { getFirstIfExists } from '@/components/utils';

const CheckoutShippingAddresses: React.FC<CheckoutShippingAddressesProps> = async () => {
  const sdk = getSdk();
  const data = getFirstIfExists((await sdk.getAddress()).Website?.items) as unknown as AddressDataProps ;
  
  return (
    <UserAddressInfo data={data} />
  );
};

export default CheckoutShippingAddresses;
