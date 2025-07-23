import { DefaultSeo } from "@packages/niteco-seo-nextjs";
import { getFirstIfExists, getImgSrc } from "@/components/utils";
import { getSdk } from "@/sdk";
import { getSiteId, getSiteName } from "@/app/config/site-settings";

export interface DefaultPageSeoProps {
	info: {
		Title: string | undefined;
		Name?: string;
		ProductTitle?: string;
		MetaDescription?: string;
		ContentContainer?: {
			MetaDescription?: string;
			OpenGraphUrl?: string;
			OpenGraphTitle?: string;
		};
		Url?: string;
		OpenGraphUrl?: string;
		OpenGraphTitle?: string;
		OpenGraphImage?: string;
		MediumImagePath?: string;
		Type?: string;
		CategoryId?: string;
		NoIndex?: boolean;
		NoFollow?: boolean;
	};
}

export const formatPageTitle = (
	pageType: string,
	pageTitle?: string,
	siteName?: string,
	WebsiteSettings?: {
		PageTitleDelimiter?: string;
		IncludeSiteNameInPageTitle?: boolean;
		SiteNameAfterTitle?: boolean;
	}
): string => {
	const { PageTitleDelimiter, IncludeSiteNameInPageTitle, SiteNameAfterTitle } =
		WebsiteSettings || {};
	if (
		(IncludeSiteNameInPageTitle && pageType === "ProductListPage") ||
		(IncludeSiteNameInPageTitle && pageType === "ProductPage")
	) {
		return SiteNameAfterTitle
			? `${pageTitle} ${PageTitleDelimiter || "|"} ${siteName}`
			: `${siteName} ${PageTitleDelimiter || "|"} ${pageTitle}`;
	} else {
		return pageTitle || "";
	}
};

export const getCategory = async (categoryId: string) => {
	const sdk = getSdk();
	try {
		const category = await sdk.getCategory({
			siteId: await getSiteId(),
			id: categoryId,
		});
		return category;
	} catch (error) {
		console.error(`Error fetching category with ID ${categoryId}:`, error);
		return null;
	}
};

export const DefaultPageSeo = async ({ info }: DefaultPageSeoProps) => {
	const graphUrl = getImgSrc(
		info.OpenGraphImage || info.MediumImagePath,
		process.env.SITE_HOST || ""
	);

	const sdk = getSdk();
	const settings = getFirstIfExists(
		(await sdk.getSiteSettings({ siteId: await getSiteId() }))?.SettingsCollection?.items
	) as unknown;

	const siteName = await getSiteName();
	const productTitle = formatPageTitle(
		"ProductPage",
		info.ProductTitle,
		siteName,
		settings?.WebsiteSettings
	);

	const pageTitle = formatPageTitle(
		info.Type as string,
		info.Title || productTitle,
		siteName,
		settings?.WebsiteSettings
	);

	return (
		<DefaultSeo
			noindex={info.NoIndex}
			nofollow={info.NoFollow}
			title={pageTitle}
			description={
				info.MetaDescription ||
				info?.ContentContainer?.MetaDescription ||
				"High-quality fencing solutions"
			}
			canonical={process.env.NEXT_PUBLIC_DEFAULT_DOMAIN + (info.Url || "")}
			openGraph={{
				url: info.OpenGraphUrl || info?.ContentContainer?.OpenGraphUrl || "",
				siteName: info.OpenGraphTitle || info?.ContentContainer?.OpenGraphTitle || "",
				images: [
					{
						url: graphUrl,
					},
				],
			}}
		/>
	);
};
