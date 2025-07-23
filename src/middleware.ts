import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const getRedirects = async (request: NextRequest) => {
	try {
		const apiUrl = `https://${process.env.SITE_DOMAIN}/api/v1/custom/htmlredirects?fetchAll=true`;
		const apiResponse = await fetch(apiUrl);
		const data = await apiResponse.json();
		return data.data;
	} catch (error) {}
};

export async function middleware(request: NextRequest) {
	try {
		const path = request.nextUrl.pathname;

		const blockedUrls = await getRedirects(request);

		// If the fetch failed or no data, skip
		if (!blockedUrls || blockedUrls.length === 0) {
			return NextResponse.next();
		}

		// Find matching redirect from the list
		const redirect = blockedUrls?.find((r: any) => path.includes(r.source));
		let domain = process.env.DEFAULT_DOMAIN || "";
		if (!domain.startsWith("http")) {
			domain = "https://" + domain;
		}
		if (redirect) {
			return NextResponse.redirect(`${domain}${redirect.destination}`);
		}

		return NextResponse.next();
	} catch (error) {
		console.error("Error in redirect middleware:", error);
		return NextResponse.next();
	}
}
