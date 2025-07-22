"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useIntersectionObserver } from "@/hook/useIntersectionObserver";
import Image from "next/image";
import { useRef } from "react";

export default function ServicesBlock() {
  const { toast } = useToast();
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref);

  const handleAddToBasket = () => {
    toast({
      title: "Installation added to basket",
      description:
        "We will be in touch shortly to discuss your installation requirements.",
    });
  };

  return (
    <section className="w-full bg-light-gray-background py-12 lg:py-16">
      <div className="container px-4 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div
            ref={ref}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
          >
            {isVisible && (
              <Image
                src="/images/gate.jpg"
                alt="Fence installer at work"
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-base lg:text-xl tracking-wide text-blue uppercase">
                DELIVERING AN EXCEPTIONAL FENCE INSTALLATION SERVICE
              </h2>
              <h3 className="text-3xl lg:text-[40px] font-bold text-blue">
                APPROVED INSTALLERS NETWORK
              </h3>
            </div>
            <p className="lg:text-lg font-lora font-medium">
              {`Our network of Approved Installers are high skilled, carefully
              selected, reputable fence installers who we trust to install our
              high quality timber products to the highest installation
              standards. If you are interested in installation by one of our
              Approved Installers please click "Add installation to basket"
              below. We will be in touch shortly after processing your order to
              discuss installation.`}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
              <Button
                variant="stroke-blue"
                className="border-blue text-sm lg:text-base hover:bg-blue hover:text-white px-6 py-4"
              >
                FIN OUT MORE
              </Button>
              <Button
                variant="stroke-blue"
                className="bg-blue text-white"
                onClick={handleAddToBasket}
              >
                ADD INSTALLATION TO BASKET
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
