'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
// import { ProductListingCard } from '@/components/common/ProductListingCard'
import dynamic from 'next/dynamic'

const ProductListingCard = dynamic(
  () => import('@/components/common/ProductListingCard').then(mod => mod.ProductListingCard),
  {
    loading: () => <div>Loading...</div>,
    ssr: false // Nếu bạn không cần SSR cho component này
  }
)
const PRODUCTS = Array(8).fill({
  title: "1.0M HIGH, LEVEL TOP ROUND PALE PALISADE PANEL (1.83M WIDE)",
  code: "223500",
  price: 129.10,
  reviews: 17,
  rating: 5,
  imageUrl: "/placeholder.svg?height=300&width=400"
})

export default function ProductListing() {
  const [basketItems, setBasketItems] = useState<{[key: string]: number}>({})

  const handleAddAllToBasket = () => {
    const newBasketItems = { ...basketItems }
    PRODUCTS.forEach(product => {
      if (basketItems[product.code]) {
        newBasketItems[product.code] = basketItems[product.code]
      }
    })
    setBasketItems(newBasketItems)
  }

  return (
    <div className="bg-light-gray-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-blue text-2xl lg:text-3xl font-bold text-center mb-2">
          TOP SELLING PRODUCTS IN FENCING PANELS
        </h1>
        
        <p className="text-muted text-center font-bold text-lg mb-2">
          {`Buying multiple products? Just update the quantities of each item you wish to buy and click 'Add all to basket'`}
        </p>
        
        <div className="flex justify-center gap-4">
          <Button
            variant='secondary'
            onClick={handleAddAllToBasket}
            className="bg-transparent border-blue px-6 py-4 text-sm lg:text-base"
          >
            Add To Basket
          </Button>
        </div>

        <div className="container grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {PRODUCTS.map((product, index) => (
            <ProductListingCard
              key={`${product.code}-${index}`}
              {...product}
              onAddToBasket={(quantity) => setBasketItems(prev => ({...prev, [product.code]: (prev[product.code] || 0) + quantity}))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}