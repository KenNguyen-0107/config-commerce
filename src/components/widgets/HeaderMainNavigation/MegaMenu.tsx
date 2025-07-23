import { LinkFields } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import { Fragment } from "react";
import { ISubLinks } from ".";
import { SmartLink } from "../../shared/smartLink";
import SubMenu from "./SubMenu";
import { groupItemsByLevel } from "./utils";
import { getSiteId } from "@/app/config/site-settings";

interface ExtendedLinkFields extends LinkFields {
	linksByLevel?: ISubLinks[];
}

const MegaMenu = async ({ linkItems }: { linkItems: ExtendedLinkFields[] }) => {
	const sdk = getSdk();

	const navItem = async (item: ExtendedLinkFields, index: number) => {
		const subLinks = item?.SubLinksContainer?.SubLinks;
		const linksByLevel = groupItemsByLevel(subLinks as ISubLinks[]);

		const megaMenuUrls = linksByLevel?.map((link) => link.Url || "").filter(Boolean);

		try {
			const productListPageData = await sdk.getProductListPage({
				url: megaMenuUrls,
				siteId: await getSiteId(),
				languageCode: process.env.SITE_LANGUAGE,
			});

			const categoryIds =
				productListPageData?.ProductListPage?.items?.map((item) => item?.CategoryId || "") || [];

			if (categoryIds.length > 0) {
				const categoryData = await sdk.getCategory({
					id: categoryIds,
					siteId: await getSiteId(),
				});

				const categoryMap = new Map(
					categoryData?.Category?.items?.map((category) => [category?.Id, category]) || []
				);

				productListPageData?.ProductListPage?.items?.forEach((product) => {
					const category = categoryMap.get(product?.CategoryId);
					if (!category) return;

					const link = linksByLevel.find((link) => link.Url === product?.Url);
					if (link) {
						link.bgImgSrc = category.LargeImagePath || "";
						link.properties = category.PropertyContainer?.Properties || [];
						link.altText = category.ImageAltText || "alt text";
					}
				});
			}
		} catch (error) {
			console.error("Error processing mega menu data:", error);
		}

		item.linksByLevel = linksByLevel;

		return (
			<Fragment key={index}>
				{(item?.OverrideTitle || item?.OverriddenTitle || item?.Title) && (
					<div className="group py-2 border-b-[3px] border-transparent hover:border-yellow">
						<SmartLink
							title={item?.OverrideTitle || item?.OverriddenTitle || item?.Title || "link title"}
							href={item?.Destination?.Url || ""}
							className="font-frutiger-bold text-blue uppercase"
						>
							{item?.OverrideTitle || item?.OverriddenTitle || item?.Title || "link title"}
						</SmartLink>
						{item.linksByLevel && <SubMenu linksByLevel={item.linksByLevel} item={item} />}
					</div>
				)}
			</Fragment>
		);
	};

	return (
		<div className="relative">
			<nav className="container mx-auto hidden lg:flex items-center gap-8">
				{linkItems.map((item, index) => navItem(item, index))}
			</nav>
		</div>
	);
};

export default MegaMenu;
