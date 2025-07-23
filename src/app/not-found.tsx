import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import BasicRichContent from "@/components/widgets/BasicRichContent";
import { WidgetContainer } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";
import { getSiteId } from "./config/site-settings";

const factory = getFactory([
	{
		type: "BasicRichContent",
		component: BasicRichContent,
	},
]);

export default async function NotFound() {
	try {
		const sdk = getSdk();
		const siteId = await getSiteId();

		// Try to fetch data
		const response = await sdk.getNotFoundErrorPage({
			siteId,
			languageCode: process.env.SITE_LANGUAGE,
		});

		if (!response?.NotFoundErrorPage?.items) {
			throw new Error("No data found for 404 page");
		}

		const data = getFirstIfExists(response.NotFoundErrorPage.items) as {
			WidgetContainer: WidgetContainer;
		};

		if (!data?.WidgetContainer?.Widgets) {
			throw new Error("No widgets found in 404 page data");
		}

		const widgets = data.WidgetContainer.Widgets.filter(
			(widget) => widget && Object.keys(widget).length > 0
		) as unknown as WidgetProps[];

		if (!widgets?.length) {
			return (
				<div className="p-12 h-screen flex justify-center items-center">
					<div className="">
						<h1 className="text-center">404</h1>
						<p className="text-center">Sorry the page you're looking for cannot be found.</p>
					</div>
				</div>
			);
		}

		return <RenderAllWidgets factory={factory} widgets={widgets} info={data} />;
	} catch (error) {
		console.error("Error in NotFound page:", error);
	}
}

export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
