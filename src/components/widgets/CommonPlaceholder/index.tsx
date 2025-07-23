import BannerRelatedProducts from "@/components/common/BannerRelatedProducts";
import { ProductAttributeType, ProductSpecification } from "@/gql/graphql";
import { getSdk } from "@/sdk";
import React from "react";
import { ProductProps } from "../Product/types";
import Crossell from "./Crossell";
import PlaceHolderProduct from "./PlaceHolderProduct";
import PDPSpecAttribute from "./SpecAttribute";
import Specification from "./Specification";
import { CommonPlaceholderProps } from "./types";
const envPrefix = process.env.GRAPH_ENV || "";
export interface IListVariant {
	CanAddToCart?: boolean;
	ImageContainer?: any;
	ProductId?: string;
	ProductNumber?: string;
	ProductTitle?: string;
	UnitListPrice?: number;
	UnitPriceDisplay?: string;
	UrlSegment?: string;
}

const CommonPlaceholder: React.FC<CommonPlaceholderProps> = async (props) => {
	const { Variant, Info } = props;

	if (Variant === "Specification" && !!Info?.SpecificationContainer?.Specifications) {
		const isPdpVariant = Info?.ChildTraitValuesContainer?.ChildTraitValues.length > 0;
		const attrsData = Info?.AttributeTypeContainer?.AttributeTypes as ProductAttributeType[];

		if (isPdpVariant && attrsData) {
			return <PDPSpecAttribute data={attrsData} />;
		}

		const specsData = Info?.SpecificationContainer?.Specifications as ProductSpecification[];
		return <Specification data={specsData} />;
	}

	const sdk = getSdk();

	if (Variant === "BannerRelatedProducts") {
		const productIds = Info?.RelatedProductContainer?.RelatedProducts?.map(
			(p: { RelatedProductId: string }) => p.RelatedProductId
		) as string[];

		let products: ProductProps[] | undefined;
		try {
			products =
				productIds &&
				((await sdk.getProductsByIds({ ids: productIds }))?.Product?.items as ProductProps[]);
		} catch (error) {
			console.error("Error fetching related products:", error);
			return null;
		}
		return <BannerRelatedProducts envPrefix={envPrefix} data={products} />;
	}

	if (Variant === "Variants") {
		// change  value from "Crossell" to "Variants" because BE change CMS key, value
		// so don't change Crossell component name
		const productIds =
			Info?.VariantTraitContainer?.VariantTraits?.[0]?.TraitValueContainer?.TraitValues?.filter(
				(trait: { Product: { ProductId?: string } }) => !!trait.Product.ProductId
			).map((i: { Product: { ProductId?: string } }) => i.Product.ProductId);

		let productsData: ProductProps[] | undefined;
		try {
			productsData =
				productIds &&
				((await sdk.getProductsByIds({ ids: productIds }))?.Product?.items as ProductProps[]);
		} catch (error) {
			console.error("Error fetching products by IDs:", error);
			return null;
		}

		const parentProductId = Info?.ParentId;
		if (!parentProductId && Info?.ChildTraitValuesContainer.ChildTraitValues.length === 0)
			return <PlaceHolderProduct envPrefix={envPrefix} data={productsData} />;

		if (parentProductId && Info?.ChildTraitValuesContainer.ChildTraitValues.length > 0) {
			let products;
			try {
				products = await sdk.getProductsByIds({ ids: parentProductId });
			} catch (error) {
				console.error("Error fetching parent product:", error);
				return null;
			}

			const listVariant =
				(products &&
					products.Product &&
					(products.Product.items[0]?.VariantTraitContainer?.VariantTraits?.[0]?.TraitValueContainer?.TraitValues?.filter(
						(trait: { Product: { ProductId?: string } }) => !!trait.Product.ProductId
					).map((i: any) => i.Product) as IListVariant[])) ||
				[];

			return <Crossell envPrefix={envPrefix} data={listVariant} />;
		}
		return <Crossell envPrefix={envPrefix} data={[]} />;
	}

	return null;
};

export default CommonPlaceholder;
