"use client";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

export default function OrderDetails() {
  let data = [
    "Niteco",
    "Address 1",
    "London, Greater London 10000",
    "United Kingdom",
    "anh.nguyen12@niteco.se",
  ];

  return (
    <div className=" bg-muted-background">
      <div className="container mx-auto py-10 space-y-10">
        {/* Order Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-[32px] font-bold text-blue mb-4 md:mb-0">
            ORDER #WE001023
          </h1>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <Button
              variant="tertiary"
              className="px-6 border-blue border-[1px] py-4 text-blue"
            >
              CANCEL
            </Button>
            <Button className="px-6 py-4">RE-ORDER</Button>
          </div>
        </div>
        <div>
          <div className="bg-secondary-background rounded">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
              <div className="md:col-span-1">
                <h3 className="text-blue text-base mb-1">ORDER DATE</h3>
                <p className="text-tertiary font-lora">02/22/2025</p>
              </div>
              <div className="md:col-span-1">
                <h3 className="text-blue text-base mb-1">PO NUMBER</h3>
                <p className="text-tertiary font-lora">321</p>
              </div>
              <div className="md:col-span-1">
                <h3 className="text-blue text-base mb-1">STATUS</h3>
                <p className="text-tertiary font-lora">Confirmed</p>
              </div>
              <div className="md:col-span-1">
                <h3 className="text-blue text-base mb-1">TERM</h3>
                <p className="text-tertiary font-lora">CC</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Shipping Information */}
            <div>
              <div className="text-blue text-2xl font-bold mb-4">
                SHIPPING INFORMATION
              </div>
              <div className="mb-6">
                <h3 className="text-blue text-lg mb-2">SHIPPING ADDRESS</h3>
                {data &&
                  data.map((item, index) => (
                    <p
                      key={index}
                      className="text-tertiary font-lora font-medium"
                    >
                      {item}
                    </p>
                  ))}
              </div>
              <div>
                <h3 className="text-blue text-base mb-2">SHIPPING METHOD</h3>
                <p className="text-tertiary font-lora">Flat Fate B</p>
              </div>
            </div>

            {/* Billing Information */}
            <div>
              <div className="text-blue text-2xl font-bold mb-4">
                BILLING INFORMATION
              </div>
              <div>
                <h3 className="text-blue text-lg mb-2">BILLING ADDRESS</h3>
                {data &&
                  data.map((item, index) => (
                    <p
                      key={index}
                      className="text-tertiary font-lora font-medium"
                    >
                      {item}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-white">
          <h2 className="text-blue text-2xl font-bold mb-4">ORDER SUMMARY</h2>

          {/* Product Items */}
          <div className="border-t border-gray-300">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="border-b border-gray-300 py-4">
                <div className="flex w-full">
                  <Image
                    height={120}
                    width={120}
                    src="/placeholder.svg?height=96&width=96"
                    alt="Palisade Panel"
                  />
                  <div className="flex gap-2 lg:gap-10 flex-grow">
                    <div className="md:flex items-start gap-6 pl-6 flex-grow">
                      <div className="">
                        <p className="text-blue text-sm lg:text-base mb-2 w-[159px] lg:w-[354px]">
                          1.0m High, Level Top Round Pale Palisade Panel (1.83m
                          wide)
                        </p>
                        <p className="text-tertiary text-sm lg:text-base">
                          2235000
                        </p>
                      </div>
                      <div className="flex flex-grow justify-between">
                        <div className="">
                          <p className="text-blue mb-2 text-xs lg:text-base">
                            PRICE
                          </p>
                          <p className="text-tertiary text-sm lg:text-base">
                            £129.10
                          </p>
                        </div>
                        <div className="hidden lg:block ">
                          <p className="text-blue mb-2 text-xs lg:text-base">
                            QTY
                          </p>
                          <p className="text-tertiary text-sm lg:text-base">
                            01
                          </p>
                        </div>
                        <div className="">
                          <p className="text-blue mb-2 text-xs lg:text-base">
                            QTY SHIPPED
                          </p>
                          <p className="text-tertiary text-sm lg:text-base">
                            0
                          </p>
                        </div>
                        <div className="hidden lg:block md:text-right">
                          <p className="text-blue mb-1 md:mb-2">SUBTOTAL</p>
                          <p className="text-tertiary text-lg md:text-xl font-semibold">
                            £129.10
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="block lg:hidden">
                      <p className="text-blue mb-1 md:mb-2">SUBTOTAL</p>
                      <p className="text-tertiary text-lg md:text-xl font-semibold">
                        £129.10
                      </p>
                      <p className="text-blue mb-2 text-xs text-right">QTY</p>
                      <p className="text-tertiary text-sm text-right">0</p>
                    </div>
                    <div className="">
                      <Button className="hidden md:block bg-blue text-white px-6 py-4">
                        ADD TO LIST
                      </Button>
                      <button className="text-blue ml-2 block md:hidden">
                        <MoreVertical size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
