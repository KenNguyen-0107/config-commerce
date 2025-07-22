import { ProductContent, ProductImage } from "@/gql/graphql";

/**
 * Get actual data from returned data which has random string as key
 * - Example: "a26095ef-c714-e311-ba31-d43d7e4e88b2": [...data]
 * */
export const useGetDataFromObject = <T>(data: { [x: string]: T }): T | null => {
	if (!data) return null;
	const actualData = Object.values(data)[0];
	return actualData;
};

export const getImgSrc = (ImageLink?: string, siteHost?: string) => {
	const SITE_HOST = "https://jacksonsfencing-configcommerce-d-cl.niteco.dev";
	return ImageLink ? (siteHost || SITE_HOST) + ImageLink : "";
	// return ImageLink
};

export const getFirstIfExists = <T>(
	input: Array<T | null> | null | undefined
): T | unknown => {
	if (!input || !Array.isArray(input)) return {};
	return input[0] || {};
};

export const getProductExcerpt = (contents: ProductContent[]) => {
	if (!contents?.length) return "";

	const _contents = contents.filter(
		(content) =>
			content.Language === "en-gb" && content.DeviceType === "Desktop"
	);
	const excerpt =
		_contents.find((content) => content.CustomerSegment === "PLP") ||
		_contents.find((content) => content.CustomerSegment === "Default");
	return excerpt?.Html || "";
};

export const getProductInfo = (contents: ProductContent[]) => {
	if (!contents?.length) return "";

	const _contents = contents.filter(
		(content) =>
			content.Language === "en-gb" && content.DeviceType === "Desktop"
	);
	const excerpt =
		_contents.find((content) => content.CustomerSegment === "Default") ||
		_contents.find((content) => content.CustomerSegment === "PLP");
	return excerpt?.Html || "";
};

export const NoImageSrc = getImgSrc("/UserFiles/Homepage/Jacksons-No-Image-Image-Large-4x3.gif?width=640&height=480");

export const getProductThumbnail = (Images: ProductImage[], size: "lg" | "md" | "sm" = "lg") => {
	if (!Images?.length) return NoImageSrc;
	
	if (size === "sm") return getProductThumbnailSm(Images)
	if (size === "md") return getProductThumbnailMd(Images)
	
	return getProductThumbnailLg(Images)
};

export const getProductThumbnailLg = (Images: ProductImage[]) => {
	if (!Images?.length) return NoImageSrc;

	const thumbnailPath =
		Images.find((image) => image.LargeImagePath)?.LargeImagePath ||
		Images.find((image) => image.MediumImagePath)?.MediumImagePath ||
		Images.find((image) => image.SmallImagePath)?.SmallImagePath;
	return getImgSrc(thumbnailPath || "") || NoImageSrc;
};

export const getProductThumbnailMd = (Images: ProductImage[]) => {
	if (!Images?.length) return NoImageSrc;

	const thumbnailPath =
		Images.find((image) => image.MediumImagePath)?.MediumImagePath ||
		Images.find((image) => image.LargeImagePath)?.LargeImagePath ||
		Images.find((image) => image.SmallImagePath)?.SmallImagePath;
	return getImgSrc(thumbnailPath || "") || NoImageSrc;
};

export const getProductThumbnailSm = (Images: ProductImage[]) => {
	if (!Images?.length) return NoImageSrc;

	const thumbnailPath =
		Images.find((image) => image.SmallImagePath)?.SmallImagePath ||
		Images.find((image) => image.LargeImagePath)?.LargeImagePath ||
		Images.find((image) => image.MediumImagePath)?.MediumImagePath
	return getImgSrc(thumbnailPath || "") || NoImageSrc;
};


export const getProductSmallThumbnail = (image: ProductImage) => {
	if (!image) return NoImageSrc;

	const thumbnailPath =
		image.SmallImagePath || image.MediumImagePath || image.LargeImagePath;
	return getImgSrc(thumbnailPath || "");
};

export const convertDate = (datetime: string) => {
	const date = new Date(datetime)
	return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
}