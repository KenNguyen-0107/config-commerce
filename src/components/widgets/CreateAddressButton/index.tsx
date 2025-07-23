
import React from 'react';
import { CreateAddressButtonProps } from './types';
import CreateNewAddress from '@/app/my-account/address/CreateNewAddress';

const CreateAddressButton: React.FC<CreateAddressButtonProps> = (props) => {
  return (
    <CreateNewAddress />
  );
};

export default CreateAddressButton;
