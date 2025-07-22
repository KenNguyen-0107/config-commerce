
import React from 'react';
import { RequestRmaInformationProps } from './types';

const RequestRmaInformation: React.FC<RequestRmaInformationProps> = (props) => {
  console.log(`RequestRmaInformation props:`, props);
  return (
    <>
      <h1>RequestRmaInformation</h1>
      {/* Render more fields from RequestRmaInformationData here */}
    </>
  );
};

export default RequestRmaInformation;
