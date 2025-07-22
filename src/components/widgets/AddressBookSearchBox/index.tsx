import React from 'react';
import { AddressBookSearchBoxProps } from './types';
import SearchBox from '@/app/my-account/address/SearchBox';

const AddressBookSearchBox: React.FC<AddressBookSearchBoxProps> = (props) => {
  console.log(`AddressBookSearchBox props:`, props);
  return (
    <SearchBox />
  );
};

export default AddressBookSearchBox;
