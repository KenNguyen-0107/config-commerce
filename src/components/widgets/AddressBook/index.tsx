
import React from 'react';
import { AddressBookProps } from './types';
import ListShippingAddress from '@/app/my-account/address/ListShippingAddress';

const AddressBook: React.FC<AddressBookProps> = (props) => {
  console.log(`AddressBook props:`, props);
  return (
    <ListShippingAddress />
  );
};

export default AddressBook;
