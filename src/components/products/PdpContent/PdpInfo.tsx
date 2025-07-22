import { getProductInfo, getProductThumbnail } from "@/components/utils";
import { ProductProps } from "@/components/widgets/Product/types";
import { ProductContent, ProductImage } from "@/gql/graphql";
import PDPCta from "../Cta/CTA";
import AddToBasket from "./AddToBasket";
import PDPVaritantsSelector from "./PdpVariants";
import QuantityBreakPricing from "./QuantityBreakPricing";

const PDPInfo = ({
  data,
  isPdpVariant,
}: {
  data?: ProductProps;
  isPdpVariant?: boolean;
}) => {
  if (!data) return null;

  const attributes = data.AttributeTypeContainer?.AttributeTypes;
  const stockCode = attributes?.find((a) => a?.Name === "Stock Code");
  const priceVat = attributes?.find((a) => a?.Name === "Price (inc. vat)");
  const price = attributes?.find((a) => a?.Name === "Price (exc. vat)");

  if (isPdpVariant) {
    return (
      <div className="space-y-10 lg:space-y-6">
        <h1 className="font-bold text-2xl lg:text-3xl text-blue uppercase">
          {data.ProductTitle}
        </h1>
        <div>
          {!!price || !!priceVat ? (
            <div className="space-y-1">
              {priceVat && (
                <div className="flex gap-2 items-center uppercase">
                  <h4 className="text-blue">
                    {
                      priceVat?.AttributeValueContainer?.AttributeValues?.[0]
                        ?.ValueDisplay
                    }
                  </h4>
                  <span className="text-muted text-sm font-lora">
                    {priceVat?.Label}
                  </span>
                </div>
              )}
              {price && (
                <p className="flex gap-2 text-muted text-sm uppercase font-lora">
                  <span>
                    {
                      price?.AttributeValueContainer?.AttributeValues?.[0]
                        ?.ValueDisplay
                    }
                  </span>
                  <span>{price?.Label}</span>
                </p>
              )}
            </div>
          ) : (
            <h4 className="text-blue">{data.UnitListPriceDisplay}</h4>
          )}
          {
            data && (
              <QuantityBreakPricing productData={data} />
            )
          }
        </div>

        <AddToBasket
          id={data.Id || ""}
          name={data.ProductTitle || ""}
          price={data.UnitListPrice || 0}
          priceDisplay={data.UnitListPriceDisplay || ""}
          canAddToCart={data.CanAddToCart || false}
          image={getProductThumbnail(data.ImageContainer?.Images as ProductImage[])}
          url={data.Url || ""}
        />

        <p className="text-muted font-lora">
          {stockCode?.Label || "Stock Code"}:{" "}
          <span className="uppercase">
            {stockCode?.AttributeValueContainer?.AttributeValues?.[0]
              ?.ValueDisplay || data.ProductNumber}
          </span>
        </p>

        <div
          className="text-muted font-lora [&_li]:mb-2 [&_li]:text-muted [&_li]:list-none [&_li]:before:content-['•'] [&_li]:before:text-yellow [&_li]:before:mr-2"
          dangerouslySetInnerHTML={{
            __html:
              getProductInfo(
                data.ContentContainer?.Contents as ProductContent[]
              ) || "",
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-10 lg:space-y-6">
      <h1 className="font-bold text-2xl lg:text-3xl text-blue uppercase">
        {data.ProductTitle}
      </h1>

      <div
        className="text-lg text-muted font-lora [&_li]:mb-2 [&_li]:text-muted [&_li]:list-none [&_li]:before:content-['•'] [&_li]:before:text-yellow [&_li]:before:mr-2"
        dangerouslySetInnerHTML={{
          __html:
            getProductInfo(
              data.ContentContainer?.Contents as ProductContent[]
            ) || "",
        }}
      />

      <PDPCta />
      <PDPVaritantsSelector
        productData={data}
        defaultPrice={data.UnitListPriceDisplay || ""}
      />
    </div>
  );
};

export default PDPInfo;
