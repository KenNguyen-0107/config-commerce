'use client'

import { ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useCartStore } from '@/store/cart-store'

export function DeliveryInfo() {
  const [isOpen, setIsOpen] = useState(false)
  const { price } = useCartStore()

  return (
    <div className="bg-muted-background">
      <div className="container mx-auto p-6 px-4">
        <div className="text-right mb-2">
          <h3 className="text-[#0A0F2F] font-semibold">{price.subTotal}</h3>
          <div className="text-muted text-xs font-lora">EXC VAT</div>
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="">
            <CollapsibleTrigger asChild>
              <Button
                variant="tertiary"
                className="w-full border-0 justify-end text-blue font-semibold text-sm hover:bg-transparent hover:text-blue p-0 lg:px-0 h-auto group"
              >
                <span>ABOUT DELIVERY</span>
                <ChevronUp
                  className={cn(
                    "h-4 w-4 transform transition-transform duration-300",
                    !isOpen ? "-rotate-180" : "rotate-0"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent
            className={cn(
              "transition-all duration-300 ease-in-out",
              isOpen ? "animate-slideDown" : "animate-slideUp"
            )}
          >
            <div className="grid lg:grid-cols-3 gap-6 bg-muted-background text-[#555555] mt-8">
              <div className="flex flex-col gap-2 items-start">
                  <h3 className="text-blue uppercase">Local (S East):*</h3>
                  <ul className="space-y-2 text-lg font-normal font-lora">
                    <li><span className="text-yellow">•</span> Under £50 £20.75</li>
                    <li><span className="text-yellow">•</span> Under £150 £25.00</li>
                    <li><span className="text-yellow">•</span> Over £150 £31.00</li>
                  </ul>
                  <div className="font-lora">
                    Build your dream garden
                  </div>

                  <h3 className="text-blue uppercase font-frutiger">Area 1:*</h3>
                  <ul className="space-y-2 text-lg font-normal font-lora">
                    <li><span className="text-yellow">•</span> Under £50 £31.50</li>
                    <li><span className="text-yellow">•</span> Under £150 £40.00</li>
                    <li><span className="text-yellow">•</span> Over £150 £52.00</li>
                  </ul>
                  <div className="font-lora">
                    Build your dream garden
                  </div>

                  <h3 className="text-blue uppercase font-frutiger">Area 2:*</h3>
                  <ul className="space-y-2 text-lg font-normal font-lora">
                    <li><span className="text-yellow">•</span> Under £50 £41.50</li>
                    <li><span className="text-yellow">•</span> Under £150 £50.00</li>
                    <li><span className="text-yellow">•</span> Over £150 £62.00</li>
                  </ul>
                  <div className="font-lora">
                    Build your dream garden
                  </div>

                <div className="space-y-1 text-md text-[#000000]">
                  <p>All prices ex vat</p>
                  <p>*Our standard national/local delivery areas</p>
                </div>

                <Button
                  variant="tertiary"
                  className="border-blue text-blue hover:bg-transparent font-semibold"
                >
                  DELIVERY COSTS & TERMS
                </Button>
              </div>
              <div>
                <h4 className="text-[#186684] font-semibold mb-4 uppercase font-frutiger">Delivery Information</h4>
                <p className="text-lg leading-relaxed font-lora">
                  Our bulky and heavy products are typically delivered on our lorries equipped with rear-mounted forklifts,
                  restricted to hard road surfaces. To collect orders from our depots, call your local depot. Carriage fees
                  are applied at checkout, calculated based on your postcode. See our{' '}
                  <Link href="#" className="underline">Delivery Terms</Link> for more details.
                </p>
              </div>

              <div>
                <h4 className="text-[#186684] font-semibold mb-4 uppercase font-frutiger">Delivery Lead times</h4>
                <div className="space-y-4 text-lg leading-relaxed font-lora">
                  <p>
                    Most orders will be delivered within 7-10 days. Dependent on stock availability, this may be longer on
                    some items. We'll communicate estimated delivery times post-order processing usually the next working
                    day after ordering
                  </p>
                  <p>
                    Contact us at 0800 408 2234 for specific requests. Please refrain from scheduling installations until
                    products arrive.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

