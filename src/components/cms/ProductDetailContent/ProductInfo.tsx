import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  title: string;
  features: string[];
  heights: { value: string; price: number }[];
  selectedHeight: { value: string; price: number };
  onHeightSelect: (height: { value: string; price: number }) => void;
}

export function ProductInfo({
  title,
  features,
  heights,
  selectedHeight,
  onHeightSelect,
}: ProductInfoProps) {
  const stt =
    ".banner-wrapper {color: red}\n\n.banner-overlay-wrapper {\n}\n\n.banner-center-wrapper {\n}\n\n.banner-heading {\n}\n\n.banner-subheading {\n}\n";
  return (
    <>
      <style className="stylessss">{stt}</style>
      <div className="space-y-4 lg:space-y-6 banner-wrapper">
        <div dangerouslySetInnerHTML={{ 
        __html: `<h5 class="font-bold text-green">Are you looking for Metal Security Fencing?</h5>`
        }}></div>
        <h1 className="text-2xl lg:text-3xl font-bold text-blue banner-wrapper">{title}</h1>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 font-lora font-medium"
            >
              <span className="text-yellow">•</span>
              <span className="text-duck lg:text-lg">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col lg:flex-row gap-4">
          <Button
            variant="stroke-blue"
            className="bg-red-brown border-red-brown hover:border-blue text-white"
            onClick={() => console.log("Fence Calculator clicked")}
          >
            FENCE CALCULATOR
          </Button>

          <Button
            variant="secondary"
            className="border-blue"
            onClick={() => console.log("Installation Options clicked")}
          >
            INSTALLATION OPTIONS
          </Button>
        </div>

        <div className="space-y-2 lg:space-y-4">
          <h3 className="text-blue">
            AVAILABLE HEIGHTS - ALL PANELS ARE 1.83M WIDE
          </h3>
          <div className="flex flex-wrap gap-2">
            {heights.map((height) => (
              <button
                key={height.value}
                className={cn(
                  "p-4 lg:px-4 rounded font-medium font-lora border",
                  selectedHeight.value === height.value
                    ? "border-blue bg-blue text-white"
                    : "text-blue border-muted"
                )}
                onClick={() => onHeightSelect(height)}
              >
                {height.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
