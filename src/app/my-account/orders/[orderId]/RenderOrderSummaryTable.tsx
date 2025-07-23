"use client";
import React from "react";
import Image from "next/image";
import { useOrderHistoryStore } from "@/store/order-history-store";
import { getImgSrc } from "@/components/utils";

const RenderOrderSummaryTable = () => {
  const { orderItem } = useOrderHistoryStore();

  if (!orderItem?.orderLines) {
    return (
      <div className="p-6 bg-white animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-4" /> {/* Title skeleton */}
        
        <div className="border-t border-gray-300">
          {/* Product item skeleton - repeat 2 times for better UX */}
          {[1, 2].map((item) => (
            <div key={item} className="border-b border-gray-300 py-4">
              <div className="flex w-full">
                <div className="h-[120px] w-[120px] bg-gray-200 rounded" /> {/* Image skeleton */}
                <div className="flex gap-2 lg:gap-10 flex-grow">
                  <div className="md:flex items-start gap-6 pl-6 flex-grow">
                    <div>
                      <div className="h-4 w-[159px] lg:w-[354px] bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                    <div className="flex flex-grow justify-between mt-4 md:mt-0">
                      <div>
                        <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                      </div>
                      <div className="hidden lg:block">
                        <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-12 bg-gray-200 rounded" />
                      </div>
                      <div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-12 bg-gray-200 rounded" />
                      </div>
                      <div className="hidden lg:block">
                        <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                        <div className="h-6 w-24 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary skeleton */}
        <div className="grid grid-cols-3 py-8">
          <div className="col-start-1 col-span-3 lg:col-start-3 lg:col-span-1 space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
		<div className="px-4 py-6 lg:p-6 bg-white">
			<h2 className="text-blue text-2xl font-bold mb-4">ORDER SUMMARY</h2>

			{/* Product Items */}
			<div className="border-t border-gray-300">
				{orderItem.orderLines &&
					orderItem.orderLines.map((item, index) => (
						<div key={index} className="border-b border-gray-300 py-4">
							<div className="flex w-full">
								<div className="h-[64px] lg:h-[120px] flex">
									<Image
										height={120}
										width={120}
										src={getImgSrc(item.mediumImagePath?.replace("http://b2b.local.com:30000", ""))}
										alt={"Product Image"}
										className="object-contain"
									/>
								</div>
								<div className="flex gap-2 lg:gap-10 flex-grow">
									<div className="flex flex-col lg:flex-row items-start gap-2 lg:gap-6 pl-2 lg:pl-6 flex-grow">
										<div className="space-y-2 lg:space-y-4">
											<p className="text-blue text-sm lg:text-base uppercase w-[159px] lg:w-[354px]">
												{item.description}
											</p>
											<p className="text-tertiary text-sm lg:text-base font-lora font-medium">
												{item.productErpNumber}
											</p>
										</div>
										<div className="flex flex-grow justify-between">
											<div className="">
												<p className="text-blue mb-2 text-xs lg:text-base">PRICE</p>
												<p className="text-tertiary text-sm lg:text-base font-lora font-medium">
													{item.unitPriceDisplay}
												</p>
											</div>
											<div className="hidden lg:block ">
												<p className="text-blue mb-2 text-xs lg:text-base">QTY</p>
												<p className="text-tertiary text-sm lg:text-base font-lora font-medium">
													{item.qtyOrdered}
												</p>
											</div>
											<div className="">
												<p className="text-blue mb-2 text-xs lg:text-base">QTY SHIPPED</p>
												<p className="text-tertiary text-sm lg:text-base font-lora font-medium">
													{item.qtyShipped}
												</p>
											</div>
											<div className="hidden lg:block md:text-right">
												<p className="text-blue mb-1 md:mb-2">SUBTOTAL</p>
												<p className="text-tertiary text-lg md:text-xl font-semibold">
													{item.lineTotalDisplay}
												</p>
											</div>
										</div>
									</div>
									<div className="block lg:hidden">
										<p className="text-blue mb-1 md:mb-2 text-xs lg:text-base">SUBTOTAL</p>
										<p className="text-tertiary text-base lg:text-xl">{item.lineTotalDisplay}</p>
										<div className="text-blue mb-2 text-xs text-right">QTY</div>
										<div className="text-tertiary text-sm text-right font-lora font-medium">
											{item.qtyOrdered}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>

			<div className="grid grid-cols-3 p-4 lg:px-0 lg:py-8">
				<div className="col-start-1 col-span-3 lg:col-start-3 lg:col-span-1 space-y-2">
					<div className="flex justify-between">
						<p className="text-sm lg:text-lg text-blue">SUBTOTAL</p>
						<p className="font-medium text-md lg:text-base text-tertiary">
							{orderItem?.orderSubTotalDisplay}
						</p>
					</div>
					<div className="flex justify-between">
						<p className="text-sm lg:text-lg text-blue">SHIPPING FEE</p>
						<p className="font-medium text-md lg:text-base text-tertiary">
							{orderItem?.shippingChargesDisplay}
						</p>
					</div>
					<div className="flex justify-between ">
						<p className="text-sm lg:text-lg text-blue">DISCOUNT</p>
						<p className="font-medium text-md lg:text-base text-tertiary">
							{orderItem?.otherChargesDisplay}
						</p>
					</div>
					<div className="flex justify-between ">
						<p className="text-sm lg:text-lg text-blue">TAX</p>
						<p className="font-medium text-md lg:text-base text-tertiary">
							{orderItem.totalTaxDisplay}
						</p>
					</div>
					<div className="flex justify-between text-xl lg:text-2xl text-blue">
						<p>TOTAL INC VAT</p>
						<p className="text-tertiary">{orderItem.orderTotalDisplay}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RenderOrderSummaryTable;
