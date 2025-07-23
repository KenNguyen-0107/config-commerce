import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import CartWidgetDictionary from "@/components/widgets/cart-widgets";
import { WidgetContainer } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";
import { getSiteId } from "../config/site-settings";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";

const factory = getFactory(CartWidgetDictionary);

const CartPage = async () => {
	try {
		const sdk = getSdk();
		const data = getFirstIfExists(
			(
				await sdk.getContentByType({
					type: "CartPage",
					siteId: await getSiteId(),
					languageCode: process.env.SITE_LANGUAGE,
				})
			)?.B2BPage?.items
		) as {
			WidgetContainer: WidgetContainer;
		};
		const widgets = data?.WidgetContainer?.Widgets?.filter(
			(widget) => widget && Object.keys(widget).length > 0
		) as unknown as WidgetProps[];

		if (!widgets?.length) return null;

		return (
			<>
				<DefaultPageSeo info={{ Title: "Cart Page" }} />
				<RenderAllWidgets factory={factory} widgets={widgets} info={data} />
			</>
		);
	} catch (error) {
		console.error("Error in CartPage:", error);
	}
};

export default CartPage;

export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
