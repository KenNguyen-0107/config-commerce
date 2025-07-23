import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql1/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";
import OrderDetail from "./OrderDetail";
import ValidateUser from "../../ValidateUser";
import { getSiteId } from "@/app/config/site-settings";
import MyAccountDictionary from "@/components/widgets/my-account-widgets";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";

const factory = getFactory(MyAccountDictionary);

export default async function OrderDetails({ params }: { params: Promise<{ orderId: string }> }) {
	const sdk = getSdk();
	let data;
	try {
		data = getFirstIfExists(
			(
				await sdk.getOrderDetailsPageContent({
					siteId: await getSiteId(),
					languageCode: process.env.SITE_LANGUAGE,
				})
			)?.OrderDetailsPage?.items
		) as {
			WidgetContainer: WidgetContainer;
		};
	} catch (error) {
		console.error("Failed to fetch order details page content:", error);
		return (
			<h4 className="text-center pt-8 pb-8 text-red">Failed to fetch order details page content</h4>
		);
	}
	const widgets = data?.WidgetContainer?.Widgets?.filter(
		(widget: unknown) => widget && Object.keys(widget as object).length > 0
	) as unknown as WidgetProps[];

	const { orderId } = await params;

	return (
		<div className=" bg-muted-background">
			<DefaultPageSeo info={{ Title: "Order Detail" }} />
			<ValidateUser />
			<OrderDetail orderId={orderId} />
			<div className="container mx-auto py-6 lg:py-10">
				<RenderAllWidgets
					factory={factory}
					widgets={widgets}
					info={{
						...data,
						params: {
							orderId,
						},
					}}
				/>
			</div>
		</div>
	);
}
export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
