
import React from 'react';
import { CheckoutReviewAndSubmitPageContainerProps } from './types';
import { cn } from '@/lib/utils';

const CheckoutReviewAndSubmitPageContainer: React.FC<CheckoutReviewAndSubmitPageContainerProps> = (props) => {
  console.log(`CheckoutReviewAndSubmitPageContainer props:`, props);
  const { children } = props

  return (
      <div className="bg-muted-background py-8 px-4 lg:px-6">
        <div className={cn(
          "container",
        )}>
          {children}
        </div>
      </div>
    );
};

export default CheckoutReviewAndSubmitPageContainer;
