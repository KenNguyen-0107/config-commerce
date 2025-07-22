import BannerRelatedProducts from "@/components/common/BannerRelatedProducts";
import { ProductAttributeType, ProductSpecification } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import React from "react";
import { ProductProps } from "../Product/types";
import Crossell from "./Crossell";
import PDPSpecAttribute from "./SpecAttribute";
import Specification from "./Specification";
import { CommonPlaceholderProps } from "./types";

const CommonPlaceholder: React.FC<CommonPlaceholderProps> = async (props) => {
	const { Variant, Info, Section } = props;

	if (
		Variant === "Specification" &&
		!!Info?.SpecificationContainer?.Specifications
	) {
		const isPdpVariant =
			Info?.ChildTraitValuesContainer?.ChildTraitValues.length > 0;
		const attrsData = Info?.AttributeTypeContainer
			?.AttributeTypes as ProductAttributeType[];

		if (isPdpVariant && attrsData) {
			return <PDPSpecAttribute data={attrsData} />;
		}

		const specsData = Info?.SpecificationContainer
			?.Specifications as ProductSpecification[];
		return <Specification data={specsData} />;
	}

	const sdk = getSdk();

	if (Variant === "BannerRelatedProducts") {
		const productIds = Info?.RelatedProductContainer?.RelatedProducts?.map(
			(p: { RelatedProductId: string }) => p.RelatedProductId
		) as string[];

		const products =
			productIds &&
			((await sdk.getProductsByIds({ ids: productIds }))?.Product
				?.items as ProductProps[]);
		return <BannerRelatedProducts data={products} />;
	}

	if (Variant === "Crossell") {
		const productIds =
			Section === "TopSellingProducts"
				? (Info?.RelatedProductContainer?.RelatedProducts?.map(
						(p: { RelatedProductId: string }) => p.RelatedProductId
				  ) as string[])
				: (Info?.VariantTraitContainer?.VariantTraits?.[0]?.TraitValueContainer?.TraitValues?.filter(
						(trait: { Product: { ProductId?: string } }) =>
							!!trait.Product.ProductId
				  ).map(
						(trait: { Product: { ProductId?: string } }) =>
							trait.Product.ProductId
				  ) as string[]);

		const products =
			productIds &&
			((await sdk.getProductsByIds({ ids: productIds }))?.Product
				?.items as ProductProps[]);

		return <Crossell data={products} />;
	}

	return null;
};

export default CommonPlaceholder;
