import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import SigninWidgetDictionary from "@/components/widgets/signin-widgets";
import { WidgetContainer } from "@/gql1/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";
import { getSiteId } from "../config/site-settings";
import { IAllSettings } from "./types";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";

const factory = getFactory(SigninWidgetDictionary);

export default async function LoginPage() {
	try {
		const sdk = getSdk();
		let data;
		let settings;

		try {
			data = getFirstIfExists(
				(
					await sdk.getSiginPageContent({
						siteId: await getSiteId(),
						languageCode: process.env.SITE_LANGUAGE || "en-gb",
					})
				)?.SignInPage?.items
			) as {
				WidgetContainer: WidgetContainer;
			};
		} catch (error) {
			console.error("Failed to fetch sign-in page content:", error);
			return (
				<h4 className="text-center pt-8 pb-8 text-red">Failed to fetch sign-in page content</h4>
			);
		}

		try {
			settings = getFirstIfExists(
				(await sdk.getSiteSettings({ siteId: await getSiteId() }))?.SettingsCollection?.items
			) as IAllSettings;
		} catch (error) {
			console.error("Failed to fetch site settings:", error);
			settings = {} as IAllSettings;
		}

		const widgets = data?.WidgetContainer?.Widgets?.filter(
			(widget: Record<string, unknown>) => widget && Object.keys(widget).length > 0
		) as unknown as WidgetProps[];

		if (!widgets?.length) return null;

		return (
			<div className="bg-muted-background px-4 py-10 lg:py-20">
				<div className="container">
					<h1 className="text-blue uppercase mb-10 lg:text-[40px]">Sign in</h1>
				</div>
				<DefaultPageSeo info={{ Title: "Login Page" }} />
				<RenderAllWidgets factory={factory} widgets={widgets} info={data} settings={settings} />
			</div>
		);
	} catch (error) {
		console.error("Unexpected error in LoginPage:", error);
		return <h4 className="text-center pt-8 pb-8 text-red">Unexpected error</h4>;
	}
}
export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
