import Image from "next/image";

import { cn } from "@/lib/utils";
import CTA from "./cta";
import Price from "./price";
import Review from "./review";
import { CartItem } from "@/store/cart-store";

interface ProductCardProps extends CartItem {
  reviews: number;
  rating: number;
  code?: string;
  excerpt?: string;
  vatText?: string;
  type?: "pdp" | "plp"
}

export function ProductListingCard({
  name,
  code,
  priceDisplay,
  reviews,
  // rating,
  // imageUrl,
  vatText = "EXC VAT",
  excerpt,
  type = "pdp"
}: ProductCardProps) {
  return (
    <div className="bg-white flex flex-col items-center">
      <div className="w-full aspect-[4/3] relative">
        <Image
          src={"/images/pdp-card.jpg"}
          alt={name || "product image"}
          fill
          loading="lazy"
          className={cn(`${type === "pdp" ? "object-contain" : "object-cover"}`)}
        />
      </div>

      <div className="px-4 py-6 flex flex-col gap-4">
        <h3 className="text-blue lg:text-xl font-bold text-left line-clamp-4">
          {name}
        </h3>

        {excerpt &&
          <p className="text-md lg:text-lg text-muted font-lora">{excerpt}</p>
        }

        {type === "pdp" && reviews && <Review reviews={reviews} />}

        {code &&
          <p className="text-muted text-xs lg:text-md font-lora">Code: {code}</p>
        }

        <Price price={priceDisplay || ""} vatText={vatText} />

        {type === "plp" && reviews && <Review reviews={reviews} />}

        <CTA
          type={type}

        />
      </div>
    </div>
  );
}
