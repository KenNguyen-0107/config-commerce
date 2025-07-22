
import React from 'react';
import { BasicPageTitleProps } from './types';

const BasicPageTitle: React.FC<BasicPageTitleProps> = (props) => {
  console.log(`BasicPageTitle props:`, props);
  return (
    <>
      <h1>BasicPageTitle</h1>
      {/* Render more fields from BasicPageTitleData here */}
    </>
  );
};

export default BasicPageTitle;
