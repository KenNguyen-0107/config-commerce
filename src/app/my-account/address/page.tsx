import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql1/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";
import AddressesPage from "./AddressesPage";
import ValidateUser from "../ValidateUser";
import { getSiteId } from "@/app/config/site-settings";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";

export default async function MyAddressPage() {
	const sdk = getSdk();
	let data;
	try {
		data = getFirstIfExists(
			(
				await sdk.getAddressesPageContent({
					siteId: await getSiteId(),
					languageCode: process.env.SITE_LANGUAGE,
				})
			)?.AddressesPage?.items
		) as {
			WidgetContainer: WidgetContainer;
		};
	} catch (error) {
		console.error("Failed to fetch addresses page content:", error);
		return (
			<h4 className="text-center pt-8 pb-8 text-red">Failed to fetch addresses page content</h4>
		);
	}
	const widgets = data?.WidgetContainer?.Widgets?.filter(
		(widget) => widget && Object.keys(widget).length > 0
	) as unknown as WidgetProps[];

	if (!widgets?.length) return null;

	return (
		<div className="bg-muted-background">
			<DefaultPageSeo info={{ Title: "My Account Address" }} />
			<ValidateUser />
			<AddressesPage info={data} />
			{/* <RenderAllWidgets factory={getFactory()} widgets={widgets} info={data} /> */}
		</div>
	);
}
export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
