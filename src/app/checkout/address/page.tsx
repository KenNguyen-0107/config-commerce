import { getSiteId } from "@/app/config/site-settings";
import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql1/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";
import CheckoutWidgetDictionary from "@/components/widgets/checkout-widgets";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";

interface ICheckoutAddAddress {
	WidgetContainer: WidgetContainer;
}

const factory = getFactory(CheckoutWidgetDictionary);

export default async function CheckoutAddAddress() {
	try {
		const sdk = getSdk();
		const siteId = await getSiteId();

		// Try to fetch checkout shipping page content
		const response = await sdk.getCheckoutShippingPageContent({
			siteId,
			languageCode: process.env.SITE_LANGUAGE,
		});

		if (!response?.CheckoutShippingPage?.items) {
			throw new Error("No checkout shipping page content found");
		}

		const data = getFirstIfExists(response.CheckoutShippingPage.items) as ICheckoutAddAddress;

		if (!data?.WidgetContainer?.Widgets) {
			throw new Error("No widgets found in checkout shipping page");
		}

		const widgets = data.WidgetContainer.Widgets.filter(
			(widget) => widget && Object.keys(widget).length > 0
		) as unknown as WidgetProps[];

		if (!widgets?.length) {
			throw new Error("No valid widgets found in checkout shipping page");
		}

		return (
			<>
				<DefaultPageSeo info={{ Title: "Checkout Page" }} />
				<RenderAllWidgets factory={factory} widgets={widgets} />
			</>
		);
	} catch (error) {
		console.error("Error in CheckoutAddAddress page:", error);
	}
}

export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
