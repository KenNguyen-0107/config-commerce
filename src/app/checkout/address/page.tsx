import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";

interface ICheckoutAddAddress {
  WidgetContainer: WidgetContainer;
}

export default async function CheckoutAddAddress() {
  const sdk = getSdk();
  const data = getFirstIfExists((await sdk.getCheckoutShippingPageContent())?.CheckoutShippingPage?.items) as ICheckoutAddAddress
  const widgets = data?.WidgetContainer?.Widgets?.filter(widget => widget && Object.keys(widget).length > 0) as unknown as WidgetProps[]

  return (
    <RenderAllWidgets factory={getFactory()} widgets={widgets} />
  );
}
