
import React from 'react';
import { MyAccountViewProps } from './types';

const MyAccountView: React.FC<MyAccountViewProps> = (props) => {
  console.log(`MyAccountView props:`, props);
  return (
    <>
      <h1>MyAccountView</h1>
      {/* Render more fields from MyAccountViewData here */}
    </>
  );
};

export default MyAccountView;
