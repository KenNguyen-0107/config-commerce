import { getFactory } from "@/components/factory"
import { getContentByPath, getProductDetailByPath, getProductDetailCmsPage } from "@/gql/functions"
import { CmsPage as OptimizelyCmsPage, getServerClient } from "@packages/optimizely-cms-nextjs"
import { GetContentByPathMethod, GetFixContentMethod } from "@packages/optimizely-cms-nextjs/cms-page/data"

const { CmsPage, generateMetadata, generateStaticParams } = OptimizelyCmsPage.createPage(getFactory(), {
  getContentByPath: getContentByPath as unknown as GetContentByPathMethod,
  getFixContent: getProductDetailCmsPage as unknown as GetFixContentMethod,
  getProductDetailsContentByPath: getProductDetailByPath as unknown as GetContentByPathMethod,
  client: () => {
    const client = getServerClient()
    client.updateFlags({
      cache: false,
      queryCache: false, // We're depending on @recursive & cursors, which don't work with the queryCache
    })
    return client
  },
})

// Configure the Next.JS route handling for the pages
export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default

// export const fetchCache = "force-no-store" // No caching of fetch results
// export const dynamic = "force-dynamic" // Force SSR

// export const dynamicParams = false // Allow new pages to be resolved without rebuilding the site
// export const revalidate = 0

// Export CMS Page
export { generateMetadata, generateStaticParams }
export default CmsPage
