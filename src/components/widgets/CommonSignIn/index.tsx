
import React from 'react';
import { CommonSignInProps } from './types';

const CommonSignIn: React.FC<CommonSignInProps> = (props) => {
  console.log(`CommonSignIn props:`, props);
  return (
    <>
      <h1>CommonSignIn</h1>
      {/* Render more fields from CommonSignInData here */}
    </>
  );
};

export default CommonSignIn;
