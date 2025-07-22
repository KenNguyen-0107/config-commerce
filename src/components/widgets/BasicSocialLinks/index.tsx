
import React from 'react';
import { BasicSocialLinksProps } from './types';

const BasicSocialLinks: React.FC<BasicSocialLinksProps> = (props) => {
  console.log(`BasicSocialLinks props:`, props);
  return (
    <>
      <h1>BasicSocialLinks</h1>
      {/* Render more fields from BasicSocialLinksData here */}
    </>
  );
};

export default BasicSocialLinks;
