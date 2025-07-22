// "use client";
import Image from "next/image";
import RatingCardCarousel from "./RatingCardCarousel";
import Link from "next/link";
import { cn } from "@/lib/utils";

const reviews = [
  {
    title: "1 Excellent Service",
    content:
      "Very helpful sales team especially Steven Leeper, who helped me get the correct ...",
    author: "Gillygate",
    time: "15 hours ago",
    verified: true,
  },
  {
    title: "2 Excellent Service",
    content:
      "Very helpful sales team especially Steven Leeper, who helped me get the correct ...",
    author: "Gillygate",
    time: "15 hours ago",
    verified: true,
  },
  {
    title: "3 Excellent Service",
    content:
      "Very helpful sales team especially Steven Leeper, who helped me get the correct ...",
    author: "Gillygate",
    time: "15 hours ago",
    verified: true,
  },
  {
    title: "4 Another Great Experience",
    content:
      "Very helpful sales team especially Steven Leeper, who helped me get the correct ...",
    author: "Gillygate",
    time: "15 hours ago",
    verified: true,
  },
  {
    title: "5 Outstanding Support",
    content:
      "Very helpful sales team especially Steven Leeper, who helped me get the correct ...",
    author: "Gillygate",
    time: "15 hours ago",
    verified: true,
  },
  {
    title: "6 Outstanding Support",
    content:
      "Very helpful sales team especially Steven Leeper, who helped me get the correct ...",
    author: "Gillygate",
    time: "15 hours ago",
    verified: true,
  },
  {
    title: "7 Outstanding Support",
    content:
      "Very helpful sales team especially Steven Leeper, who helped me get the correct ...",
    author: "Gillygate",
    time: "15 hours ago",
    verified: true,
  },
];

export default function RatingBlock({isPdpPage} : {isPdpPage?: boolean}) {
  return (
    <section className={cn(
      "font-helvetical w-full bg-muted-background py-10 overflow-hidden",
      isPdpPage && "bg-white px-4 py-10 lg:px-0 lg:pt-10 lg:pb-[120px]"
    )}>
      <div className="container mx-auto px-4 lg:px-0">
        <h2 className="text-blue text-2xl lg:text-3xl font-bold text-center mb-4 lg:mb-12 font-frutiger-bold">
          WHAT OUR CUSTOMERS SAY
        </h2>
        <div className="flex gap-[56px]">
          <div className="lg:mx-0 lg:mb-0 text-center shrink-0">
            <div className="text-2xl font-bold mb-2">Excellent</div>
            <div className="flex items-center mb-2 gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  width={16}
                  height={16}
                  alt="icon start"
                  src={"/icons/star.svg"}
                  className="w-[30px] h-[30px]"
                />
              ))}
            </div>
            <div className="text-muted text-sm">
              Based on{" "}
              <Link href="#" className="underline text-black">
                3,405 reviews
              </Link>
            </div>
            <Image
              src="/"
              alt="Trustpilot"
              className="h-8 mt-2 lg:mt-4"
              width={0}
              height={0}
            />
          </div>
          <div className="hidden lg:block max-w-[calc(100%-2rem)] lg:max-w-[906px]">
            <div className="relative">
              {/* <RatingCardCarousel data={reviews} /> */}
            </div>
            <div className="hidden lg:block text-xs text-muted mt-4 ml-8">
              Showing our 4 & 5 star review
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
