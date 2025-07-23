
import React from 'react';
import { AddressBookProps } from './types';
import ListShippingAddress from '@/app/my-account/address/ListShippingAddress';

const AddressBook: React.FC<AddressBookProps> = (props) => {
  return (
    <ListShippingAddress />
  );
};

export default AddressBook;
