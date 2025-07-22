import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PriceSectionProps {
  price: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onAddToBasket: () => void;
}

export function PriceSection({
  price,
  quantity,
  onQuantityChange,
  onAddToBasket,
}: PriceSectionProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--muted-background)]">
      <div className="space-y-1">
        <div className="text-xl lg:text-2xl font-bold">
          £{(price * quantity).toFixed(2)}
        </div>
        <div className="text-xs lg:text-sm text-muted">EXC VAT</div>
        <div className="text-xs lg:text-sm text-muted">
          £{(price * quantity * 1.2).toFixed(2)} INC VAT
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-end lg:items-center gap-2 lg:gap-4">
        <div className="flex items-center">
          <Image
            width={25}
            height={25}
            alt="icon start"
            src={"/icons/minus.svg"}
            className="w-10 h-10 cursor-pointer"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-14 h-10 text-center border border-muted/50 "
          />
          <Image
            width={25}
            height={25}
            alt="icon start"
            src={"/icons/plus.svg"}
            className="w-10 h-10 cursor-pointer"
            onClick={() => onQuantityChange(quantity + 1)}
          />
        </div>

        <Button
          className="w-full lg:w-auto bg-blue hover:bg-blue/90 text-white"
          onClick={onAddToBasket}
        >
          ADD TO BASKET
        </Button>
      </div>
    </div>
  );
}
