import { getSiteId } from "@/app/config/site-settings";
import { getSdk } from "@/sdk";
import { LocalizationConfig } from "@packages/niteco-hreflang-nextjs";
import React from "react";
import CustomHreflang from "./CustomHreflang";

const CustomHead = async () => {
	const sdk = getSdk();
	let hreflangData;
	try {
		hreflangData = await sdk.getHreflangConfig({
			path: "/",
			siteId: await getSiteId(),
			languageCode: process.env.SITE_LANGUAGE || "en-gb",
		});
	} catch (error) {
		console.error("Failed to fetch hreflang config:", error);
	}
	const hreflangConfig: LocalizationConfig = {
		format: "segmentation",
		defaultLocale: "x-default",
		locales: [],
	};

	if (hreflangData?.B2BPage?.items?.[0]?.Locales?.Items) {
		hreflangData.B2BPage?.items?.[0]?.Locales?.Items.forEach((item) => {
			hreflangConfig.locales.push({
				code: item?.Code || "",
				segment: item?.IsDefault ? "" : item?.Segment || "",
				domain: process.env.NEXT_PUBLIC_DEFAULT_DOMAIN?.replace(
					`${process.env.NEXT_PUBLIC_DEFAULT_DOMAIN.includes("https://") ? "https://" : "http://"}`,
					""
				),
			});
		});
	}
	hreflangConfig.locales.push({
		code: "x-default",
		segment: "",
		domain: process.env.NEXT_PUBLIC_DEFAULT_DOMAIN?.replace(
			`${process.env.NEXT_PUBLIC_DEFAULT_DOMAIN.includes("https://") ? "https://" : "http://"}`,
			""
		),
	});
	return <CustomHreflang data={hreflangConfig} />;
};

export default CustomHead;
