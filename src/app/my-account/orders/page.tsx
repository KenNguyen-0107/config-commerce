import { getSiteId } from "@/app/config/site-settings";
import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import MyAccountDictionary from "@/components/widgets/my-account-widgets";
import { WidgetContainer } from "@/gql1/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";
import ValidateUser from "../ValidateUser";
import OrdersStore from "./OrdersStore";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";

const factory = getFactory(MyAccountDictionary);

export default async function OrderHistory() {
	const sdk = getSdk();
	let data;
	try {
		data = getFirstIfExists(
			(
				await sdk.getOrderHistoryPageContent({
					siteId: await getSiteId(),
					languageCode: process.env.SITE_LANGUAGE,
				})
			)?.OrderHistoryPage?.items
		) as {
			WidgetContainer: WidgetContainer;
		};
	} catch (error) {
		console.error("Failed to fetch order history page content:", error);
		return (
			<h4 className="text-center pt-8 pb-8 text-red">Failed to fetch order history page content</h4>
		);
	}
	const widgets = data?.WidgetContainer?.Widgets?.filter(
		(widget: unknown) => widget && Object.keys(widget as object).length > 0
	) as unknown as WidgetProps[];

	if (!widgets?.length) return null;

	return (
		<div className="bg-muted-background">
			<ValidateUser />
			<DefaultPageSeo info={{ Title: "Order History" }} />
			<div className="container mx-auto px-4 lg:px-0">
				<h1 className="text-2xl lg:text-[40px] text-blue font-bold mb-4 uppercase">
					Order History
				</h1>
				<OrdersStore />
				<RenderAllWidgets factory={factory} widgets={widgets} info={data} />
			</div>
		</div>
	);
}
export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
