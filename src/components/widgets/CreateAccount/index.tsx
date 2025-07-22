
import React from 'react';
import { CreateAccountProps } from './types';

const CreateAccount: React.FC<CreateAccountProps> = (props) => {
  console.log(`CreateAccount props:`, props);
  return (
    <>
      <h1>CreateAccount</h1>
      {/* Render more fields from CreateAccountData here */}
    </>
  );
};

export default CreateAccount;
