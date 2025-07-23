export default function Custom404() {
	return (
		<>
			<h1>404 - Page Not Found</h1>
			<div className="md:mx-auto h-fit w-full mx-0 px-0 [&>iframe]:w-full text-[#555] [&>iframe]:lg:h-[340px] [&>iframe]:h-[224px] bg-[#324234] grid-cols-1 lg:grid-cols-3 col-span-2 p-0 text-sm font-medium text-[#283270] transition-colors hover:text-[#283270]/80 pt-20"></div>
		</>
	);
}
export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
