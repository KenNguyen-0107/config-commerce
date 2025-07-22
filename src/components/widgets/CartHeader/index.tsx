
import React from 'react';
import { CartHeaderProps } from './types';

const CartHeader: React.FC<CartHeaderProps> = (props) => {
  // console.log(`CartHeader props:`, props);
  return (
    <>
      <h1>CartHeader</h1>
      {/* Render more fields from CartHeaderData here */}
    </>
  );
};

export default CartHeader;
