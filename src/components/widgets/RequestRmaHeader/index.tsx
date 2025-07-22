
import React from 'react';
import { RequestRmaHeaderProps } from './types';

const RequestRmaHeader: React.FC<RequestRmaHeaderProps> = (props) => {
  console.log(`RequestRmaHeader props:`, props);
  return (
    <>
      <h1>RequestRmaHeader</h1>
      {/* Render more fields from RequestRmaHeaderData here */}
    </>
  );
};

export default RequestRmaHeader;
