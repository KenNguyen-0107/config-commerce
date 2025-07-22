
import React, { Fragment } from 'react';
import { ProductListColumnsProps } from './types';

const ProductListColumns: React.FC<ProductListColumnsProps> = (props) => {
  const { children, __typename, Id } = props;

  return (
      <div
        data-component={__typename}
        data-component-id={Id}
        className="bg-muted-background py-10"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10">
          {Array.isArray(children) ? (
            children.map((child: any, index: number) => (
              <Fragment key={index}>
                {child}
              </Fragment>
            ))
          ) : (
            <>{children}</>
          )}
        </div>
      </div>
    );
};

export default ProductListColumns;
