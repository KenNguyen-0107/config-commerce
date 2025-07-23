import { getFactory } from "@/components/factory";
import { getContentByPath, getProductDetailByPath, getProductDetailCmsPage } from "@/gql/functions";
import { CmsPage as OptimizelyCmsPage } from "@packages/optimizely-cms-nextjs";
import {
	GetContentByPathMethod,
	GetFixContentMethod,
} from "@packages/optimizely-cms-nextjs/cms-page/data";
import { getGraphClient, getSiteId } from "../config/site-settings";

const { CmsPage, generateMetadata, generateStaticParams } = OptimizelyCmsPage.createPage(
	getFactory(),
	{
		getContentByPath: getContentByPath as unknown as GetContentByPathMethod,
		getFixContent: getProductDetailCmsPage as unknown as GetFixContentMethod,
		getProductDetailsContentByPath: getProductDetailByPath as unknown as GetContentByPathMethod,
		client: () => getGraphClient(),
		siteId: () => getSiteId(),
	}
);

// Configure the Next.JS route handling for the pages

export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default

// export const dynamic = "force-dynamic"; // Force SSR
// export const dynamicParams = false; // Allow new pages to be resolved without rebuilding the site
// export const revalidate = 0;
// export const fetchCache = "force-no-store"; // No caching of fetch results

// Export CMS Page
export { generateMetadata, generateStaticParams };
export default CmsPage;
