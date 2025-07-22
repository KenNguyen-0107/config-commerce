"use client";

import { useCartStore } from "@/store/cart-store";
import { useYourOrderStore } from "@/store/your-order-store";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useUpdateCart } from "@/hook/useUpdateCart";
import { useRouter } from "next/navigation";

const CheckoutSummary = ({from}: {from?: string}) => {
  const { items, price, isLoadingCart, userInfo } = useCartStore();
  const { yourOrder } = useYourOrderStore();
  // const { syncCurrentCart } = useUpdateCart();
  const router = useRouter();

  // useEffect(() => {
  //   syncCurrentCart();
  // }, [])

  // useEffect(() => {
  //   if(isLoadingCart) return;
  //   if(items.length === 0) {
  //     router.push("/cart"); 
  //   }
  //   if(!userInfo.shipping.phone) {
  //     router.push("/checkout/address");
  //   }
  // }, [isLoadingCart, items])

  if (from !== "OrderConfirmation") {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-blue">ORDER SUMMARY</h2>
            <Link
              title="edit basket"
              href="/cart"
              className="flex items-center text-blue font-medium"
            >
              <PenLine size={20} className="mr-2" />
              EDIT BASKET
            </Link>
        </div>
  
        <div className="max-h-[440px] overflow-y-auto">
          {items?.map((item, index) => (
            <div
              key={item.id}
              className={`flex gap-10 justify-between items-start py-6 border-b-[1px] border-muted ${
                index === 0 ? "border-t-[1px]" : ""
              }`}
            >
              <div className="space-y-1">
                <h3 className="font-medium text-blue text-lg uppercase">
                  {item.name}
                </h3>
                <div className="text-xl text-tertiary">{item.priceDisplay}</div>
                <p className="text-sm text-muted font-lora">
                  Product Code: {item.code}
                </p>
                <p className="text-lg">{item.quantity}</p>
              </div>
              {item?.price && (
                <p className="font-medium text-lg text-tertiary">
                  £{(item.price * (item?.quantity || 1)).toFixed(2)}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 py-8">
          <div className="col-start-2 col-span-2 space-y-2">
            <div className="flex justify-between">
              <p className="text-lg text-blue">SUBTOTAL</p>
              <p className="font-medium text-xl text-tertiary">
                {price?.subTotal}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg text-blue">SHIPPING FEE</p>
              <p className="font-medium text-xl text-tertiary">
                {price?.shippingFee}
              </p>
            </div>
            <div className="flex justify-between ">
              <p className="text-lg text-blue">DISCOUNT</p>
              <p className="font-medium text-xl text-tertiary">
                {price?.discount}
              </p>
            </div>
            <div className="flex justify-between ">
              <p className="text-lg text-blue">TAX</p>
              <p className="font-medium text-xl text-tertiary">{price?.tax === "TBD" ? "£0.00" : price?.tax}</p>
            </div>
            <div className="flex justify-between text-2xl font-bold text-blue">
              <p>TOTAL INC VAT</p>
              <p className="text-tertiary">{price.totalIncVat}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-blue">ORDER SUMMARY</h2>
      </div>

      <div className="max-h-[440px] overflow-y-auto">
        {yourOrder.cartLines?.map((item, index) => (
          <div
            key={item.id}
            className={`flex gap-10 justify-between items-start py-6 border-b-[1px] border-muted ${
              index === 0 ? "border-t-[1px]" : ""
            }`}
          >
            <div className="space-y-1">
              <h3 className="font-medium text-blue text-lg uppercase">
                {item.shortDescription}
              </h3>
              <div className="text-xl text-tertiary">{item.pricing.actualPriceDisplay}</div>
              <p className="text-sm text-muted font-lora">
                Product Code: {item.erpNumber}
              </p>
              <p className="text-lg">{item.qtyOrdered}</p>
            </div>
            {item?.pricing.extendedActualPriceDisplay && (
              <p className="font-medium text-lg text-tertiary">
                {item.pricing.extendedActualPriceDisplay}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 py-8">
        <div className="col-start-2 col-span-2 space-y-2">
          <div className="flex justify-between">
            <p className="text-lg text-blue">SUBTOTAL</p>
            <p className="font-medium text-xl text-tertiary">
              {price?.subTotal}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg text-blue">SHIPPING FEE</p>
            <p className="font-medium text-xl text-tertiary">
              {price?.shippingFee}
            </p>
          </div>
          <div className="flex justify-between ">
            <p className="text-lg text-blue">DISCOUNT</p>
            <p className="font-medium text-xl text-tertiary">
              {price?.discount}
            </p>
          </div>
          <div className="flex justify-between ">
            <p className="text-lg text-blue">TAX</p>
            <p className="font-medium text-xl text-tertiary">{price?.tax === "TBD" ? "£0.00" : price?.tax}</p>
          </div>
          <div className="flex justify-between text-2xl font-bold text-blue">
            <p>TOTAL INC VAT</p>
            <p className="text-tertiary">{price.totalIncVat}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
