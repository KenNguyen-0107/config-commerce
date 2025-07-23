/**
 * Send XML response for Next.js route handlers
 * @param content XML content string or Promise that resolves to an XML string
 * @param headers Custom request headers
 * @returns Next.js Response object
 */
export const withXMLResponse = async (content: string | Promise<string>, headers = {}) => {
  // Resolve the content if it's a promise
  const resolvedContent = content instanceof Promise ? await content : content;
  
  return new Response(resolvedContent, {
    status: 200,
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": `public, max-age=${process.env.SITEMAP_CACHE_MAX_AGE || "3600"}`,
      ...headers,
    },
  });
};
