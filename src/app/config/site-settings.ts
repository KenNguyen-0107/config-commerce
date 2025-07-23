import { getServerClient } from "@packages/optimizely-cms-nextjs";
import { getSiteId as getSiteIdBase } from "@packages/optimizely-cms-nextjs/cms-page/data";
import { getWebsiteDomain } from "@packages/optimizely-cms-nextjs/cms-page/page";

export const getGraphClient = () => {
	const client = getServerClient();
	client.updateFlags({
		cache: true,
		stored: false,
	});

	return client;
};

export const getSiteId = async () => {
	const domain = getWebsiteDomain();
	const data = await getSiteIdBase(getGraphClient(), { domain });
	return data.Website?.items?.[0]?.Id || "";
};

export const getSiteName = async () => {
	const domain = getWebsiteDomain();
	const data = await getSiteIdBase(getGraphClient(), { domain });
	return data.Website?.items?.[0]?.WebsiteName || "";
};
