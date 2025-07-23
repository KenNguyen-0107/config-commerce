import { LinkFields } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import { ISubLinks } from "../..";
import { groupItemsByLevel } from "../../utils";
import MegaMenuMobileContent from "./MegaMenuMobileContent";
import { getSiteId } from "@/app/config/site-settings";

export interface ExtendedLinkFields extends LinkFields {
	linksByLevel?: ISubLinks[];
}

const MegaMenuMobile = async ({ linkItems }: { linkItems: ExtendedLinkFields[] }) => {
	const sdk = getSdk();
	await Promise.all(
		linkItems?.map(async (item: ExtendedLinkFields, index: number) => {
			const subLinks = item?.SubLinksContainer?.SubLinks;
			const linksByLevel = groupItemsByLevel(subLinks as ISubLinks[]);
			const listMegaDataUrl = linksByLevel?.map((link) => link.Url || "") || [];
			let listProductPage;
			let listCategoryData: any;
			if (index === 0) {
				listProductPage = await sdk.getProductListPage({
					url: listMegaDataUrl,
					siteId: await getSiteId(),
					languageCode: process.env.SITE_LANGUAGE,
				});
				const listCategoryId = !!listProductPage?.ProductListPage?.items?.length
					? listProductPage?.ProductListPage?.items.map((item) => item?.CategoryId || "")
					: [];
				listCategoryData = await sdk.getCategory({
					id: listCategoryId,
					siteId: await getSiteId(),
				});
			}

			listProductPage?.ProductListPage?.items?.forEach((product) => {
				listCategoryData?.Category?.items?.forEach((category) => {
					if (product?.CategoryId === category?.Id) {
						linksByLevel.forEach((link) => {
							if (link.Url === product?.Url) {
								(link.bgImgSrc = category?.LargeImagePath || ""),
									(link.properties = category?.PropertyContainer?.Properties || ""),
									(link.altText = category?.ImageAltText || "alt text");
							}
						});
					}
				});
			});

			item.linksByLevel = linksByLevel;
		}) || []
	);
	return <MegaMenuMobileContent linkItems={linkItems} />;
};

export default MegaMenuMobile;
