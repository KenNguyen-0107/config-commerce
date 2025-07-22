
import React from 'react';
import { OrderConfirmationPageContainerProps } from './types';
import { cn } from '@/lib/utils';

const OrderConfirmationPageContainer: React.FC<OrderConfirmationPageContainerProps> = (props) => {
  console.log(`OrderConfirmationPageContainer props:`, props);
  const {children} = props;
  
  return (
      <div className="bg-muted-background py-8 px-4 lg:px-6">
        <div className={cn("container")}>{children}</div>
      </div>
    );
};

export default OrderConfirmationPageContainer;
