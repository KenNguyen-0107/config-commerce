import { getFirstIfExists } from "../utils";
import { ISiteMessage } from "@/gql/graphql";
import SiteSettingsContent from "./siteSettingsContent";
import { getSdk } from "@/sdk";
import { getSiteId } from "@/app/config/site-settings";
import { IAllSettings } from "@/app/login-register/types";
import { getWebsiteDomain } from "@packages/optimizely-cms-nextjs/cms-page/page";

export interface IWebsiteSettings {
	SiteMessageContainer: {
		SiteMessages: ISiteMessage[];
	};
}

const SiteSettingsInitializer = async () => {
	let messageData;
	let data;
	let settings;
	let siteId;
	let domain;
	try {
		const sdk = getSdk();
		data = getFirstIfExists(
			(await sdk.getWebSiteInfo({ siteId: await getSiteId() }))?.Website?.items
		) as IWebsiteSettings;
		messageData = data?.SiteMessageContainer?.SiteMessages?.filter(
			(message) => message && Object.keys(message).length > 0
		) as unknown as ISiteMessage[];
		settings = getFirstIfExists(
			(await sdk.getSiteSettings({ siteId: await getSiteId() }))?.SettingsCollection?.items
		) as IAllSettings;

		siteId = await getSiteId();
		domain = await getWebsiteDomain();
	} catch (error) {
		console.error("Something went wrong:", error);
	}
	return (
		<div data-site-id={siteId} data-domain={domain}>
			<SiteSettingsContent messageData={messageData} settings={settings} />
		</div>
	);
};

export default SiteSettingsInitializer;
