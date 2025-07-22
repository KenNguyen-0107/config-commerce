"use client"

import { Modal } from "@/components/ui/modal"
import { ProductProps } from "@/components/widgets/Product/types"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

import { useState } from "react"

export default function QuantityBreakPricing({ productData, selectedVariant }: { productData: ProductProps, selectedVariant?: any }) {
  if (!productData) return null

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [realTimePricings, setRealTimePricings] = useState<any[]>([]);
  const [actualBreakPrices, setActualBreakPrices] = useState<any[]>([]);

  useEffect(() => {
    const activeId = selectedVariant?.Product?.ProductId || productData.Id;
    setActualBreakPrices(realTimePricings?.find(pricing => pricing.productId === activeId)?.actualBreakPrices || [])
  }, [realTimePricings, selectedVariant])

  useEffect(() => {
    fetch(`/api/realtimepricing`, {
      method: 'POST',
      body: JSON.stringify({
        productPriceParameters: [
          {
            productId: productData.Id,
            qtyOrdered: 1,
            unitOfMeasure: ""
          },
          ...(productData.VariantTraitContainer?.VariantTraits?.[0]?.TraitValueContainer?.TraitValues || []).map(trait => ({
            productId: trait?.Id,
            qtyOrdered: 1,
            unitOfMeasure: "",
          }))
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        setRealTimePricings(data.realTimePricingResults)
      })
  }, [])
  return (
    <>
      <button
        className={cn(
          "text-blue border-none p-0 lg:p-0 capitalize font-lora text-sm",
          actualBreakPrices.length === 0 && "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsModalOpen(true)}>
        View Quantity Break Pricing
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="QUANTITY PRICING"
      >
        <table className="table-auto w-full text-center text-lg text-black border-spacing-2 font-lora">
          <thead>
            <tr className="">
              <td className="py-2 px-3">Min Qty</td>
              <td className="py-2 px-3">Price Per</td>
              <td className="py-2 px-3"></td>
            </tr>
          </thead>
          <tbody>
            {
              actualBreakPrices.map((price, index) => (
                <tr className="border-t border-muted" key={index}>
                  <td className="pt-3 pb-2 px-3">{price.breakQty}</td>
                  <td className="pt-3 pb-2 px-3">{price.breakPriceDisplay}</td>
                  <td className="pt-3 pb-2 px-3">{price.savingsMessage}</td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </Modal>
    </>
  );
}

