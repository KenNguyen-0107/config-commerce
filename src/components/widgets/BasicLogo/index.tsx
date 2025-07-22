
import React from 'react';
import { BasicLogoProps } from './types';

const BasicLogo: React.FC<BasicLogoProps> = (props) => {
  console.log(`BasicLogo props:`, props);
  return (
    <>
      <h1>BasicLogo</h1>
      {/* Render more fields from BasicLogoData here */}
    </>
  );
};

export default BasicLogo;
