import { HttpMethod } from "@/app/api/clientApi";
import Icon from "@/components/shared/icons";
import { Input } from "@/components/ui/input";
import { getImgSrc, NoImageSrc } from "@/components/utils";
import { CartLine } from "@/components/widgets/Product/types";
import { useUpdateCart } from "@/hook/useUpdateCart";
import { cn } from "@/lib/utils";
import { CartItem as CartItemProps, useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export function CartItem({
  id,
  name,
  priceDisplay,
  quantity,
  code,
  image,
  url,
  pricing
}: CartItemProps) {
  const { updateQuantity, removeItem, updatePrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const { syncCurrentCart } = useUpdateCart();

  const getNewCart = async (id?: string, quantity?: number) => {
    try {
      const newCart = await fetch("/api/cart/current");
      const data = JSON.parse(await newCart.text());
      updatePrice({
        subTotal: data.orderSubTotalDisplay,
        shippingFee: data.shippingAndHandlingDisplay,
        tax: data.totalTaxDisplay,
        totalIncVat: data.orderGrandTotalDisplay,
      });

      if (id && quantity) {
        updateQuantity(id, quantity);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeQuantity = async (id: string, quantity: number) => {
    try {
      if (!id) return;
      setIsLoading(true)
      const reqCart = await fetch("/api/cart/current");
      if (reqCart.status !== 200) return;

      const res = await reqCart.text();
      const targetProduct = JSON.parse(res).cartLines.find(
        (cartline: CartLine) => cartline.id === id
      );

      if (!!targetProduct === false) return;

      const reqPatchProduct = await fetch(
        "/api/cart/patch-product/" + targetProduct.id,
        {
          method: HttpMethod.PATCH,
          body: JSON.stringify({
            id: targetProduct.id,
            qtyOrdered: quantity,
          }),
        }
      );
      if (reqPatchProduct.status !== 200) return;
      syncCurrentCart()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleRemoveProduct = async (id: string) => {
    if (!id) return;
    try {
      setIsLoading(true)
      const reqCart = await fetch("/api/cart/current");
      if (reqCart.status !== 200) return;

      const res = await reqCart.text();
      const targetProduct = JSON.parse(res).cartLines.find(
        (cartline: CartLine) => cartline.id === id
      );
      if (!!targetProduct === false) return;

      const reqRemoveProduct = await fetch(
        "/api/cart/remove-product/" + targetProduct.id,
        {
          method: HttpMethod.DELETE,
          body: JSON.stringify({
            id: targetProduct.id,
          }),
        }
      );

      if ([200, 500].includes(reqRemoveProduct.status)) {
        removeItem(id);
        await getNewCart();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };


  const applyChangeQuatity = (value: string = '1') => {
    changeQuantity(id || "", parseInt(value));
    // updateQuantity(id || "", parseInt(value) || 1);
  }

  const onBlurQuatityInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      applyChangeQuatity('1')
      return
    }
    applyChangeQuatity(value)
  }

  const ACCEPTED_KEY = ['Backspace', 'ArrowLeft', "ArrowRight"]

  const onKeyDownQuatity = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      applyChangeQuatity(target.value)
    }
    if (!/^\d$/.test(e.key) && !ACCEPTED_KEY.includes(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <div
      className={cn("grid grid-cols-[100px,auto] lg:grid-cols-[240px,auto] items-start lg:items-center gap-6 lg:px-0 p-4 border-t border-[#8C8B90] disabled",
        isLoading && "animate-pulse pointer-events-none")}
    >
      <Link href={url || ""} className="w-[100px] h-[100px] lg:w-60 lg:h-60">
        <Image
          src={image || getImgSrc(NoImageSrc)}
          alt={name || ""}
          width={240}
          height={240}
          className="w-full h-full object-contain"
        />
      </Link>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="space-y-4 flex-grow">
          <Link href={url || ""}>
            <h3 className="text-blue uppercase">{name}</h3>
          </Link>
          <p className="text-[#0A0F2F] font-semibold lg:text-xl mt-2">
            {priceDisplay}
          </p>
          <p className="text-muted text-sm font-lora lg:text-base">
            Product Code: {code}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-2 w-full lg:w-auto">
          <Input
            type="text"
            defaultValue={quantity}
            placeholder={quantity?.toString()}
            className="h-11 lg:h-14 w-11 lg:w-14 border-[#8C8B9080] text-sm rounded py-4 px-2 text-center"
            onKeyDown={onKeyDownQuatity}
            onBlur={onBlurQuatityInput}
          />

          <div className=" flex lg:flex-col items-end justify-between w-full">
            <p className="text-[#0A0F2F] lg:text-xl lg:mb-2 flex flex-col lg:text-right min-w-[8rem] gap-1">
              <span className="font-semibold leading-5">{pricing?.extendedActualPriceDisplay}</span>
              <span className="text-muted text-xs font-lora">EXC VAT</span>
            </p>
            <button
              onClick={() => handleRemoveProduct(id || "")}
              className="flex gap-1 items-center text-blue font-semibold hover:underline"
            >
              <Icon iconName="trash" size={16} viewSize={18} />
              REMOVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
