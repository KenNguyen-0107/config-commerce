import CTA from "@/components/common/ProductListingCard/cta";
import Price from "@/components/common/ProductListingCard/price";
import Review from "@/components/common/ProductListingCard/review";
import { getProductExcerpt, getProductThumbnail } from "@/components/utils";
import { ProductContent, ProductImage } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import Image from "next/image";
import React from "react";
import { ProductProps } from "../Product/types";
import { ProductListCardListProps } from "./types";
import FetchRealtimePricing from "@/components/products/RealtimePricing/FetchRealtimePricing";
import { SmartLink } from "@/components/shared/smartLink";

const ProductListCardList: React.FC<ProductListCardListProps> = async (props) => {
	const { CategoryId } = props;
	if (!CategoryId) return null;

	const sdk = getSdk();
	const listItem = (await sdk.getProductsByCategoryIds({ ids: [CategoryId] }))?.Product
		?.items as ProductProps[];
	if (!listItem?.length) return null;
	const data = listItem.filter((p) => p?.ChildTraitValuesContainer?.ChildTraitValues.length === 0);
	if (!data.length) return null;

	return (
		<>
			<FetchRealtimePricing productIds={data.map((p) => p.Id as string)} />
			{data.map((product, index) => (
				<div key={index} className=" bg-white flex flex-col items-center">
					<SmartLink href={product.Url || ""} className="w-full aspect-[4/3] relative">
						<Image
							src={getProductThumbnail(product.ImageContainer?.Images as ProductImage[])}
							alt={
								(product.ImageContainer?.Images?.[0]?.ImageAltText as string) ||
								product.ProductTitle ||
								"product image"
							}
							fill
							loading="lazy"
							className="object-fill"
						/>
					</SmartLink>

					<div className="w-full px-4 py-6 flex flex-col gap-4 justify-between h-full">
						<div className="flex flex-col gap-4">
							<SmartLink href={product.Url || ""}>
								<h3 className="text-blue text-md lg:text-xl font-bold text-left line-clamp-2 uppercase">
									{product.ProductTitle}
								</h3>
							</SmartLink>

							<div
								className="text-md lg:text-lg text-muted font-lora line-clamp-3"
								dangerouslySetInnerHTML={{
									__html:
										getProductExcerpt(product.ContentContainer?.Contents as ProductContent[]) || "",
								}}
							/>
						</div>

						<div className="mt-auto flex flex-col gap-4">
							<Price price={product.UnitListPriceDisplay || ""} productId={product.Id as string} />
							<Review reviews={17} />
							<CTA type="plp" href={product.Url || ""} />
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default ProductListCardList;
