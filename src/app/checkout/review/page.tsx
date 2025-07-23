import { getSiteId } from "@/app/config/site-settings";
import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import CheckoutWidgetDictionary from "@/components/widgets/checkout-widgets";
import { WidgetContainer } from "@/gql1/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";

interface ICheckoutAddAddress {
	WidgetContainer: WidgetContainer;
}

const factory = getFactory(CheckoutWidgetDictionary);

export default async function CheckoutAddAddress() {
	try {
		const sdk = getSdk();
		const data = getFirstIfExists(
			(
				await sdk.getCheckoutReviewAndSubmitPageContent({
					siteId: await getSiteId(),
					languageCode: process.env.SITE_LANGUAGE,
				})
			)?.CheckoutReviewAndSubmitPage?.items
		) as ICheckoutAddAddress;
		const widgets = data?.WidgetContainer?.Widgets?.filter(
			(widget) => widget && Object.keys(widget).length > 0
		) as unknown as WidgetProps[];

		return <RenderAllWidgets factory={factory} widgets={widgets} />;
	} catch (error) {
		console.error("Error in checkout review page:", error);
		return (
			<h4 className="text-center pt-8 pb-8 text-red">
				Something went wrong. Please try again later.
			</h4>
		);
	}
}
export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
