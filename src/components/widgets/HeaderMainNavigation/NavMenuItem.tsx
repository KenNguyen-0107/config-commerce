import { LinkFields } from "@/gql/graphql";
import { Fragment } from "react";
import { CustomLink } from "./CustomLink";
import SubMenu from "./SubMenu";
import { getSdk } from "@/sdk";
import { groupItemsByLevel } from "./utils";
import { ISubLinks } from ".";

interface ExtendedLinkFields extends LinkFields {
	linksByLevel?: ISubLinks[];
}

const NavMenuItem = async ({ linkItems }: { linkItems: ExtendedLinkFields[] }) => {
	await Promise.all(linkItems?.map(async (item: ExtendedLinkFields) => {
		const subLinks = item?.SubLinksContainer?.SubLinks;
		const linksByLevel = groupItemsByLevel(subLinks as ISubLinks[]);
		await Promise.all(linksByLevel.map(async (link: ISubLinks) => {
			const sdk = getSdk();
			const megaData = await sdk.getProductListPage({ url: link.Url || "" });		
			const categoryId = !!megaData?.ProductListPage?.items?.length
				? megaData?.ProductListPage?.items[0]?.CategoryId
				: "";
			if (!categoryId) return null;
			const data = await sdk.getCategory({ id: categoryId });
			link.bgImgSrc = data.Category?.items?.[0]?.LargeImagePath || "";
			link.properties = data.Category?.items?.[0]?.PropertyContainer?.Properties;
			link.altText = data.Category?.items?.[0]?.ImageAltText || "alt text";
		}));
		item.linksByLevel = linksByLevel
	}) || []);
	return (
		<div className="relative">
			<nav className="container mx-auto hidden lg:flex items-center gap-8">
				{linkItems.map((item, index) => (
					<Fragment key={index}>
						{item?.Title && (
							<div
								key={index}
								className="group py-2 border-b-[3px] border-transparent hover:border-yellow"
							>
								<CustomLink
									key={index}
									title={item?.OverrideTitle || item?.OverriddenTitle || item?.Title || 'link title'}
                  href={item?.Destination?.Url || ""}
                >
                  {item?.OverrideTitle || item?.OverriddenTitle || item?.Title}
                </CustomLink>
                {
                  item.linksByLevel && <SubMenu linksByLevel={item.linksByLevel} item={item} />
                }
                
              </div>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
};

export default NavMenuItem;
