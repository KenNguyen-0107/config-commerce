"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { PriceSection } from "./PriceSection";
import { DeliveryInfo } from "./DeliveryInfo";
import Image from "next/image";

interface IProductDetailContentProps {
  images: string[];
  title: string;
  features: string[];
  heights: { value: string; price: number }[];
}

export default function ProductDetailContent({
  images,
  title,
  features,
  heights,
}: IProductDetailContentProps) {
  const [selectedHeight, setSelectedHeight] = useState(heights[0]);
  const [quantity, setQuantity] = useState(1);
  const [showImagePopup, setShowImagePopup] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery
          images={images}
          onOpenPopup={() => setShowImagePopup(true)}
        />

        <div className="space-y-6">
          <ProductInfo
            title={title}
            features={features}
            heights={heights}
            selectedHeight={selectedHeight}
            onHeightSelect={setSelectedHeight}
          />

          <PriceSection
            price={selectedHeight.price}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToBasket={() => console.log("Add to basket clicked")}
          />

          <DeliveryInfo />
        </div>
      </div>

      {/* Image Popup */}
      {showImagePopup && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full h-full">
            <button
              onClick={() => setShowImagePopup(false)}
              className="absolute top-4 right-4 text-blue hover:text-blue/80 z-10"
            >
              <X size={24} />
            </button>
            <Image
              src={images[0]}
              alt="Full size product image"
              fill
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
