import CTA from "@/components/common/ProductListingCard/cta";
import Price from "@/components/common/ProductListingCard/price";
import Review from "@/components/common/ProductListingCard/review";
import { getSdk } from "@/sdk";
import Image from "next/image";
import { SmartLink } from "@/components/shared/smartLink";
import React from "react";
import { CommonProductCarouselProps } from "./types";
import { ProductProps } from "../Product/types";
import { ProductImage } from "@/gql/graphql";
import { getProductThumbnail } from "@/components/utils";
import FetchStock from "@/components/products/StockBadge/FetchStock";
import StockBadge from "@/components/products/StockBadge";
import FetchRealtimePricing from "@/components/products/RealtimePricing/FetchRealtimePricing";

const CommonProductCarousel: React.FC<CommonProductCarouselProps> = async (props) => {
	const { SelectedCategoryIds, Info } = props;

	const sdk = getSdk();
	const categorieIds = !!SelectedCategoryIds?.length
		? (SelectedCategoryIds as string[])
		: (Info?.Categories as string[]);
	const productIds = Info?.RelatedProductContainer?.RelatedProducts?.map(
		(p: { RelatedProductId: string }) => p.RelatedProductId
	) as string[];

	const data =
		Info?.ProductNumber && productIds
			? (
					(await sdk.getProductsByIds({ ids: productIds }))?.Product?.items as ProductProps[]
			  ).filter(
					(p) =>
						p.ChildTraitValuesContainer?.ChildTraitValues &&
						p.ChildTraitValuesContainer.ChildTraitValues.length > 0 &&
						p.CanAddToCart
			  )
			: categorieIds &&
			  (
					(await sdk.getProductsByCategoryIds({ ids: categorieIds }))?.Product
						?.items as ProductProps[]
			  ).filter(
					(p) =>
						p.ChildTraitValuesContainer?.ChildTraitValues &&
						p.ChildTraitValuesContainer.ChildTraitValues.length > 0 &&
						p.CanAddToCart
			  );

	if (!data?.length) return null;

	return (
		<>
			<FetchStock productIds={data.map((p) => p.Id as string)} />
			<FetchRealtimePricing productIds={data.map((p) => p.Id as string)} />

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8">
				{data.map((product, index) => (
					<div key={index} className="bg-white flex flex-col items-center">
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

						<div className="w-full px-2 lg:px-4 py-4 lg:py-6 flex flex-col gap-4 justify-between h-full">
							<SmartLink href={product.Url || ""}>
								<h3 className="uppercase text-blue lg:text-xl font-bold text-left line-clamp-3">
									{product.ProductTitle}
								</h3>
							</SmartLink>

							<div className="mt-auto">
								<Review reviews={17} className="mb-4" variant="carousel" />
								<p className="text-muted text-xs lg:text-md font-lora">
									Code: &nbsp;
									<span className="uppercase">{product.ProductNumber}</span>
								</p>
								<Price
									price={product.UnitListPriceDisplay || ""}
									productId={product.Id as string}
								/>
							</div>

							<StockBadge productId={product.Id as string} type="sm" />

							<CTA
								type="pdp"
								id={product.Id || ""}
								name={product.ProductTitle || ""}
								code={product.ProductNumber || ""}
								price={product.UnitListPrice || 0}
								priceDisplay={product.UnitListPriceDisplay || ""}
								url={product.Url || ""}
								image={getProductThumbnail(product.ImageContainer?.Images as ProductImage[])}
								canAddToCart={product.CanAddToCart || false}
							/>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default CommonProductCarousel;
