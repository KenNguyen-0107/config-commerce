"use client";

import AddToBasketCta from "@/components/products/Cta/AddToBasketCta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/store/cart-store";
import { useState } from "react";

export interface IProductCardCTA extends CartItem {
	type: string,
  href?: string,
  canAddToCart?: boolean
}

export default function ProductCardCTA({ type, id, name, code, price, priceDisplay, canAddToCart, url, image, href }: IProductCardCTA) {
  const [quantity, setQuantity] = useState(0);
	
  return (
		<>
      {type === "pdp" &&
        <div className="flex gap-1 lg:gap-4 w-full items-center">
          <Input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            className="h-11 lg:h-14 w-11 lg:w-14 border-muted text-sm rounded p-4 text-center"
          />

          <AddToBasketCta
            id={id}
            name={name}
            code={code}
            price={price}
            priceDisplay={priceDisplay}
            canAddToCart={canAddToCart}
            url={url}
            image={image}
            quantity={quantity}
            className="whitespace-nowrap w-full"
          />
        </div>
      }

      {type === "plp" && href &&
        <div>
          <Button
            href={href}
          >
            VIEW PRODUCT
          </Button>
        </div>
      }
		</>
	)
}