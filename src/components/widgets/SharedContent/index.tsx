
import { getFactory } from "@/components/factory";
import { getFirstIfExists } from '@/components/utils';
import { WidgetContainer } from '@/gql/graphql';
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from '@packages/optimizely-cms-react/components/widget/types';
import React from 'react';
import { SharedContentProps } from './types';

interface ISharedContentData {
  WidgetContainer: WidgetContainer;
}

const SharedContent: React.FC<SharedContentProps> = async (props) => {
  const { PageId, Info } = props
  if (!PageId) return null;

  const sdk = getSdk();
  const data = getFirstIfExists((await sdk.getContentById({ id: PageId }))?.B2BPage?.items) as ISharedContentData
  const widgets = data?.WidgetContainer?.Widgets?.filter(widget => widget && Object.keys(widget).length > 0) as unknown as WidgetProps[]

  return (
    <RenderAllWidgets info={Info} factory={getFactory()} widgets={widgets} />
  );
};

export default SharedContent;
