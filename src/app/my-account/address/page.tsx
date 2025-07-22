import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";
import AddressesPage from "./AddressesPage";

export default async function MyAddressPage() {
  const sdk = getSdk();
  const data = getFirstIfExists(
    (await sdk.getAddressesPageContent())?.AddressesPage?.items
  ) as {
    WidgetContainer: WidgetContainer;
  };
  const widgets = data?.WidgetContainer?.Widgets?.filter(
    (widget) => widget && Object.keys(widget).length > 0
  ) as unknown as WidgetProps[];

  console.log('widgetswidgetswidgets', widgets);

  if (!widgets?.length) return null;

  return (
    <div className="bg-muted-background">
      <AddressesPage />
      {/* <RenderAllWidgets factory={getFactory()} widgets={widgets} info={data} /> */}
    </div>
  );
}
