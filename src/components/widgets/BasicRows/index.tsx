
import React from 'react';
import { BasicRowsProps } from './types';
import { cn } from '@/lib/utils';

const BasicRows: React.FC<BasicRowsProps> = (props) => {
  const { children, __typename, Id, CssClass } = props;

  if (!children) return null;

  return (
    <div 
      data-component={__typename}
      data-component-id={Id}
      className={cn('', CssClass)}
    >
      {children}
    </div>
  );
};

export default BasicRows;
