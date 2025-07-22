
import React from 'react';
import { CommonCartLinkProps } from './types';
import MiniCart from '@/components/cms/MiniCart';

const CommonCartLink: React.FC<CommonCartLinkProps> = (props) => {
  // console.log(`CommonCartLink props:`, props);
  const {Section} = props;

  if(Section == undefined) return null

  return (
    <MiniCart />
  );
};

export default CommonCartLink;
