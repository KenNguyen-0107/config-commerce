
import React from 'react';
import { BasicNavigationListProps } from './types';

const BasicNavigationList: React.FC<BasicNavigationListProps> = (props) => {
  console.log(`BasicNavigationList props:`, props);
  return (
    <>
      <h1>BasicNavigationList</h1>
      {/* Render more fields from BasicNavigationListData here */}
    </>
  );
};

export default BasicNavigationList;
