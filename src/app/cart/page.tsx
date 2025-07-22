import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";

export default async function CartPage() {
  const sdk = getSdk();
  const data = getFirstIfExists((await sdk.getContentByType({ type: "CartPage" }))?.B2BPage?.items) as {
    WidgetContainer: WidgetContainer;
  }
  const widgets = data?.WidgetContainer?.Widgets?.filter(widget => widget && Object.keys(widget).length > 0) as unknown as WidgetProps[]

  if (!widgets?.length) return null;

  return (
    <RenderAllWidgets factory={getFactory()} widgets={widgets} info={data} />
  )
}