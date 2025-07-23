
// Export types
export { SITEMAP_CACHE_TAG} from "./types"
// export { NextFetchRequestConfig } from './types'; // <-- lỗi vì không tồn tại export này
// export { SitemapEntry } from './types'; // <-- lỗi vì không tồn tại export này
// Export main functionality
export { generateSitemapIndexXml, generateSitemapIndividual } from "./sitemap-generator"
//export { validateSitemapEntries, validateSitemapEntry } from "./validators"

// Export Next.js integration
export {  getSitemapIndex, getSitemapIndividual, fetchOriginalSitemapXml, createRevalidationHandler, pingSearchEngines } from "./next-integration"

// Export utilities
// export {
//   chunkEntries,
//   buildUrlTag,
//   getSitemapHeader,
//   getSitemapFooter,
//   getSitemapIndexHeader,
//   getSitemapIndexFooter,
//   writeFile,
//   updateRobotsTxt,
//   getCurrentDate,
//   formatDate,
//   isValidChangeFrequency,
//   isValidPriority,
//   isValidDate,
// } from "./utils"
