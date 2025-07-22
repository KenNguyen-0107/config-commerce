import { Button } from '@/components/ui/button';
import React from 'react';
import { SignInCreateNewAccountProps } from './types';

const SignInCreateNewAccount: React.FC<SignInCreateNewAccountProps> = () => {

  return (
    <div className="pt-10 lg:pt-0 lg:pl-20">
      <h2 className="font-bold text-blue mb-6">CREATE NEW ACCOUNT</h2>
      <p className="text-gray-700 mb-8 font-lora">
        Create an account to checkout faster, view order history, save product lists, and more!
      </p>

      <Button
        href="/login-register/create-account"
        variant="tertiary"
        className="w-full border-blue text-blue hover:text-white hover:bg-blue"
      >
        CREATE ACCOUNT
      </Button>

    </div>
  )
};

export default SignInCreateNewAccount;
