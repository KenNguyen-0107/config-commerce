import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";

export default async function LoginPage() {
  const sdk = getSdk();
  const data = getFirstIfExists((await sdk.getSiginPageContent())?.SignInPage?.items) as {
    WidgetContainer: WidgetContainer;
  }
  const widgets = data?.WidgetContainer?.Widgets?.filter(widget => widget && Object.keys(widget).length > 0) as unknown as WidgetProps[]

  if (!widgets?.length) return null;

  return (
    <div className="bg-muted-background px-4 py-10 lg:py-20">
      <div className="container">
        <h1 className="text-blue uppercase mb-10 lg:text-[40px]" >Sign in</h1>
      </div>
      <RenderAllWidgets factory={getFactory()} widgets={widgets} info={data} />
    </div>
  )
}