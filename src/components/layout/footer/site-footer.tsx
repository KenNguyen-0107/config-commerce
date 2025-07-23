import { getSiteId } from "@/app/config/site-settings";
import { getFactory } from "@/components/factory";
import { getFirstIfExists } from "@/components/utils";
import { WidgetContainer } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import RenderAllWidgets from "@packages/optimizely-cms-react/components/widget";
import { WidgetProps } from "@packages/optimizely-cms-react/components/widget/types";

interface IFooterData {
	WidgetContainer: WidgetContainer;
}

export default async function SiteFooter() {
	const sdk = getSdk();

	let footerData: IFooterData | null = null;
	try {
		footerData = getFirstIfExists(
			(
				await sdk.getContentByType({
					type: "Footer",
					siteId: await getSiteId(),
					languageCode: process.env.SITE_LANGUAGE,
				})
			)?.B2BPage?.items
		) as IFooterData;
	} catch (error) {
		console.error("Error fetching footer data:", error);
		return null;
	}

	if (!footerData) return null;

	const widgets = footerData?.WidgetContainer?.Widgets?.filter(
		(widget) => widget && Object.keys(widget).length > 0
	) as unknown as WidgetProps[];

	if (!widgets?.length) return null;

	return (
		<footer className="bg-white text-blue">
			<div className="container mx-auto px-4 lg:px-0 py-10 lg:py-20">
				<RenderAllWidgets factory={getFactory()} widgets={widgets} />
			</div>

			{/* <div className="lg:hidden px-4 py-6">
				<FooterContent />
			</div> */}
		</footer>
	);
}
