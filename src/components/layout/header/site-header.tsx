import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";

interface IHeaderData {
  WidgetContainer: WidgetContainer;
}

export async function SiteHeader() {
  const sdk = getSdk();
  const headerData = getFirstIfExists(
    (await sdk.getContentByType({type: 'Header'})).B2BPage?.items
  ) as IHeaderData;
  const widgets = headerData?.WidgetContainer?.Widgets?.filter(
    (widget) => widget && Object.keys(widget).length > 0
  ) as unknown as WidgetProps[];

  // console.log('widgets', widgets);

  return (
    // <div className="lg:block mx-auto">
      <RenderAllWidgets factory={getFactory()} widgets={widgets} />
    // </div>
  );

}
