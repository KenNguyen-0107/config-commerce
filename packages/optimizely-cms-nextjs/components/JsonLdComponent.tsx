import { getImgSrc, getJsonLdImgSrc } from "@/components/utils";
import { getSdk } from "@/sdk";
import { OrganizationJsonLd, ProductJsonLd } from "@packages/niteco-jsonld-nextjs/src";
import React from "react";

const JsonLdComponent = async ({ info }: { info: any }) => {
	const sdk = getSdk();
	let websiteDetail;

	try {
		const response = await sdk.getWebSiteDetail();
		websiteDetail = response.Website?.items?.[0];
	} catch (error) {
		console.error("Error fetching website details:", error);
	}

	return (
		<>
			{(info.ChildTraitValuesContainer || info.VariantTraitContainer) && (
				<ProductJsonLd
					useAppDir={true}
					productName={info.ProductTitle}
					images={info.ImageContainer?.Images?.map((image: any) =>
						getJsonLdImgSrc(image.LargeImagePath || image.MediumImagePath)
					)}
					mpn=""
					sku=""
					url={info.Url}
					offers={{
						price: info.UnitListPrice,
						url: info.Url,
						priceCurrency: info.CurrencyCode,
					}}
				/>
			)}
			{info.Type === "HomePage" && (
				<OrganizationJsonLd
					useAppDir={true}
					name={info.Title}
					url={info.Url}
					logo={getJsonLdImgSrc(websiteDetail?.CompanyLogo || "")}
					address={{
						streetAddress: websiteDetail?.CompanyAddress1 || "",
						addressLocality: websiteDetail?.CompanyCity || "",
						addressRegion: websiteDetail?.CompanyState || "",
						postalCode: websiteDetail?.CompanyPostalCode || "",
						addressCountry: websiteDetail?.CompanyCountry || "",
					}}
					telephone={websiteDetail?.CompanyPhone || ""}
					description={websiteDetail?.CompanyDescription || ""}
				/>
			)}
		</>
	);
};

export default JsonLdComponent;
