import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";
import DashBoard from "./dashboard/page.bak";

export default async function AccountDashboard() {
  const sdk = getSdk();
  const data = getFirstIfExists((await sdk.getMyAccountPageContent())?.MyAccountPage?.items) as {
    WidgetContainer: WidgetContainer;
  }
  const widgets = data?.WidgetContainer?.Widgets?.filter(widget => widget && Object.keys(widget).length > 0) as unknown as WidgetProps[]
  if (!widgets?.length) return null;

  return (
    <DashBoard />
  )

  // return (
  //   <RenderAllWidgets factory={getFactory()} widgets={widgets} info={data} />
  // )
}