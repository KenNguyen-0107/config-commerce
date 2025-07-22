
import CTA from '@/components/common/ProductListingCard/cta';
import Price from '@/components/common/ProductListingCard/price';
import Review from '@/components/common/ProductListingCard/review';
import { getProductExcerpt, getProductThumbnail } from '@/components/utils';
import { ProductContent, ProductImage } from '@/gql/graphql';
import { getSdk } from '@/sdk';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProductProps } from '../Product/types';
import { ProductListCardListProps } from './types';

const ProductListCardList: React.FC<ProductListCardListProps> = async (props) => {
  const { CategoryId } = props;
  if (!CategoryId) return null;

  const sdk = getSdk();
  const data = (await sdk.getProductsByCategoryIds({ ids: [CategoryId] }))?.Product?.items as ProductProps[];

  if (!data?.length) return null;

  return (
    <>
      {data.map((product, index) => (
        <div key={index}
          className="bg-white flex flex-col items-center"
        >
          <Link
            href={product.Url || ""}
            className="w-full aspect-[4/3] relative">
            <Image
                src={getProductThumbnail(product.ImageContainer?.Images as ProductImage[])}
                alt={product.ImageContainer?.Images?.[0]?.ImageAltText as string || product.ProductTitle || "product image"}
                fill
                loading="lazy"
                className="object-fill"
              />
          </Link>
    
          <div className="w-full px-4 py-6 flex flex-col gap-4 justify-between h-full">
            <div className="flex flex-col gap-4">
              <Link href={product.Url || ""}>
                <h3 className="text-blue lg:text-xl font-bold text-left line-clamp-2 uppercase">
                  {product.ProductTitle}
                </h3>
              </Link>

              <div className="text-md lg:text-lg text-muted font-lora line-clamp-3"
                dangerouslySetInnerHTML={{ __html: getProductExcerpt(product.ContentContainer?.Contents as ProductContent[]) || "" }}
              />
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <Price price={product.UnitListPriceDisplay || ""} />
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
