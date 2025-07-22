
import React from 'react';
import { SubscribeProps } from './types';
import SubscribeForm from './form';

const Subscribe: React.FC<SubscribeProps> = (props) => {
  const { __typename, Id, Title, Description, Label, Placeholder } = props;

  return (
    <div data-component={__typename} data-component-id={Id}
      className="text-center max-w-[720px] mx-auto"
    >
      <h2 className="mb-2 text-blue uppercase">{Title}</h2>
      <div className="font-lora text-lg text-muted" dangerouslySetInnerHTML={{ __html: Description || "" }} />

      <SubscribeForm label={Label || ""} placeholder={Placeholder || ""} />
    </div>
  );
};

export default Subscribe;
