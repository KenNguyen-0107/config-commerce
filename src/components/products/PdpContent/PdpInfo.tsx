import { getProductInfo } from "@/components/utils";
import { ProductProps } from "@/components/widgets/Product/types";
import { ProductContent } from "@/gql/graphql";
import PDPCta from "../Cta/CTA";
import StockBadge from "../StockBadge";
import PDPVaritantsSelector from "./PdpVariants";
import { cn } from "@/lib/utils";
import FetchStock from "../StockBadge/FetchStock";
import { ProductPriceDisplay } from "./ProductPriceDisplay";

const PDPInfo = ({ data, isPdpVariant }: { data?: ProductProps; isPdpVariant?: boolean }) => {
	if (!data) return null;

	const attributes = data.AttributeTypeContainer?.AttributeTypes;
	const stockCode = attributes?.find((a) => a?.Name === "Stock Code");

	if (isPdpVariant) {
		return (
			<div className="space-y-6">
				<h1
					data-variant="true" // add for debugging
					className="font-bold text-2xl lg:text-3xl text-blue uppercase"
				>
					{data.ProductTitle}
				</h1>

				<FetchStock productIds={[data.Id as string]} />
				<StockBadge productId={data.Id as string} position={"carousel"} />
				<ProductPriceDisplay productData={data} />

				<p className="text-muted font-lora">
					{stockCode?.Label || "Stock Code"}:{" "}
					<span className="uppercase">
						{stockCode?.AttributeValueContainer?.AttributeValues?.[0]?.ValueDisplay ||
							data.ProductNumber}
					</span>
				</p>

				<div
					className="text-muted font-lora [&_li]:mb-2 [&_li]:text-muted [&_li]:list-none [&_li]:before:content-['•'] [&_li]:before:text-yellow [&_li]:before:mr-2"
					dangerouslySetInnerHTML={{
						__html: getProductInfo(data.ContentContainer?.Contents as ProductContent[]) || "",
					}}
				/>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<h1 className="font-bold text-2xl lg:text-3xl text-blue uppercase">{data.ProductTitle}</h1>

			<div
				className={cn(
					"lg:text-lg text-muted font-lora",
					"[&_li]:mb-2 [&_li]:text-muted [&_li]:list-none [&_li]:before:content-['•'] [&_li]:before:text-yellow [&_li]:before:mr-2 [&_li]:pl-4",
					"[&_li]:relative [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-1/2 [&_li]:before:-translate-y-1/2"
				)}
				dangerouslySetInnerHTML={{
					__html: getProductInfo(data.ContentContainer?.Contents as ProductContent[]) || "",
				}}
			/>

			<PDPCta />
			<PDPVaritantsSelector productData={data} defaultPrice={data.UnitListPriceDisplay || ""} />
		</div>
	);
};

export default PDPInfo;
