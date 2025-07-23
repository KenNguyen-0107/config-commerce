"use client";

import CTA from "@/components/common/ProductListingCard/cta";
import Price from "@/components/common/ProductListingCard/price";
import Review from "@/components/common/ProductListingCard/review";
import { getProductThumbnail } from "@/components/utils";
import { ProductImage } from "@/gql/graphql";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { ProductProps } from "../Product/types";
import { SmartLink } from "@/components/shared/smartLink";
import StockBadge from "@/components/products/StockBadge";
import FetchStock from "@/components/products/StockBadge/FetchStock";
import FetchRealtimePricing from "@/components/products/RealtimePricing/FetchRealtimePricing";
import type { IListVariant } from "@/components/widgets/CommonPlaceholder";

const PlaceHolderProduct: React.FC<{
	data?: ProductProps[];
	envPrefix?: string;
}> = ({ data, envPrefix }) => {
	const PlaceHolderProductRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!!data?.length) return;
		const parentNode = PlaceHolderProductRef.current?.closest(
			`[data-component="${envPrefix}BasicRow"]`
		);
		parentNode?.remove();
	}, [data]);

	return (
		<>
			{data && (
				<>
					<FetchStock productIds={data.map((p) => p.Id as string)} />
					<FetchRealtimePricing productIds={data.map((p) => p.Id as string)} />
					<div
						ref={PlaceHolderProductRef}
						data-component="PlaceHolderProduct"
						className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-8 gap-y-10"
					>
						{data?.map((product, index) => (
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

								<div className="w-full px-2 lg:px-4 py-6 flex flex-col gap-4 justify-between h-full">
									<SmartLink href={product.Url || ""}>
										<h3 className="uppercase text-blue lg:text-xl font-bold text-left line-clamp-3">
											{product.ProductTitle}
										</h3>
									</SmartLink>

									<div className="mt-auto">
										<Review reviews={17} className="mb-4" />
										<p className="text-muted text-sm lg:text-md font-lora">
											Code: &nbsp;
											<span className="uppercase">{product.ProductNumber}</span>
										</p>
										<Price price={product.UnitListPriceDisplay || ""} />
									</div>
									<StockBadge productId={product.Id || (product.Id as string)} type="sm" />

									<CTA
										type="pdp"
										id={product.Id || ""}
										name={product.ProductTitle || ""}
										code={product.ProductNumber || ""}
										price={product.UnitListPrice || 0}
										priceDisplay={product.UnitListPriceDisplay || ""}
										url={product.UrlSegment || ""}
										image={getProductThumbnail(product.ImageContainer?.Images as ProductImage[])}
										canAddToCart={product.CanAddToCart || false}
									/>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default PlaceHolderProduct;
