import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql1/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";
import ValidateUser from "./ValidateUser";
import MyAccountDictionary from "@/components/widgets/my-account-widgets";
import { getSiteId } from "../config/site-settings";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";

const factory = getFactory(MyAccountDictionary);

export default async function AccountDashboard() {
	const sdk = getSdk();
	let data;
	try {
		data = getFirstIfExists(
			(
				await sdk.getMyAccountPageContent({
					siteId: await getSiteId(),
					languageCode: process.env.SITE_LANGUAGE || "en",
				})
			)?.MyAccountPage?.items
		) as {
			WidgetContainer: WidgetContainer;
		};
	} catch (error) {
		console.error("Failed to fetch my account page content:", error);
		return (
			<h4 className="text-center pt-8 pb-8 text-red">Failed to fetch my account page content</h4>
		);
	}
	const widgets = data?.WidgetContainer?.Widgets?.filter(
		(widget) => widget && Object.keys(widget).length > 0
	) as unknown as WidgetProps[];
	if (!widgets?.length) return null;

	return (
		<div className="bg-muted-background px-4 py-6 lg:py-10">
			<DefaultPageSeo info={{ Title: "My Account" }} />
			<ValidateUser />
			<div className="container">
				<h1 className="lg:text-[40px] text-blue mb-6 lg:mb-10">MY ACCOUNT</h1>
			</div>
			<RenderAllWidgets factory={factory} widgets={widgets} info={data} />
		</div>
	);
}

export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
