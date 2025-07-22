
import React from 'react';
import { ProductProps } from './types';

const Product: React.FC<ProductProps> = (props) => {
  console.log(`Product props:`, props);
  return (
    <>
      <h1>Product</h1>
      {/* Render more fields from ProductData here */}
    </>
  );
};

export default Product;
