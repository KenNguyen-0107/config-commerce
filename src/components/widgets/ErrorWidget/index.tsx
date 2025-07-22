
import React from 'react';
import { ErrorWidgetProps } from './types';

const ErrorWidget: React.FC<ErrorWidgetProps> = (props) => {
  console.log(`ErrorWidget props:`, props);
  return (
    <>
      <h1>ErrorWidget</h1>
      {/* Render more fields from ErrorWidgetData here */}
    </>
  );
};

export default ErrorWidget;
