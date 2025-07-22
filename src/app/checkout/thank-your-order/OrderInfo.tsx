"use client";

import { convertDate } from "@/components/utils";
import { useCartStore } from "@/store/cart-store";
import { useYourOrderStore } from "@/store/your-order-store";
import { Fragment } from "react";



const OrderInfo = () => {
  const { userInfo, paymentCardInfo } = useCartStore();
  const { yourOrder } = useYourOrderStore()

  return (
    <div className="space-y-10">
      <h2 className="font-bold text-blue">ORDER #{yourOrder.orderCode}</h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-bold text-blue mb-1">ORDER DATE</p>
          <p className="text-tertiary font-lora">{convertDate(yourOrder.orderDate)}</p>
        </div>
        <div>
          <p className="text-sm font-bold text-blue mb-1">PO NUMBER</p>
          <p className="text-tertiary font-lora">{paymentCardInfo.PONumber}</p>
        </div>
        <div>
          <p className="text-sm font-bold text-blue mb-1">STATUS</p>
          <p className="text-tertiary font-lora">{yourOrder.status}</p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-duck font-bold mb-4">SHIPPING INFORMATION</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userInfo?.shipping && (
            <div>
              <p className="text-sm font-bold text-blue mb-1">
                SHIPPING ADDRESS
              </p>
              {Object.values(userInfo.shipping).map((item, index) => (
                <Fragment key={index}>
                  {item && (
                    <p className="text-tertiary font-lora">
                      {item}
                    </p>
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-duck font-bold mb-4">BILLING INFORMATION</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userInfo?.billing && (
            <div>
              <p className="text-sm font-bold text-blue mb-1">
                BILLING ADDRESS
              </p>
              {Object.values(userInfo.billing).map((item, index) => (
                <Fragment key={index}>
                  {item && (
                    <p className="text-tertiary font-lora">
                      {item}
                    </p>
                  )}
                </Fragment>
              ))}
            </div>
          )}
          {/* <div>
            <p className="text-sm font-bold text-blue mb-1">
              CREDIT CARD ADDRESS
            </p>
            <p className="text-blue">Address 1</p>
            <p className="text-blue">London, GL 10000</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
