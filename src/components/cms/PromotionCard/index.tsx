import Heading from "@/components/shared/heading"
import { Button } from "@/components/ui/button"
import { PromotionCardProps } from "./types"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function PromotionCard(props: PromotionCardProps) {
  const { title, description, date, image, link, cta, background } = props.contextualFields

  return (
    <div data-component="promotion-card"
      className={cn(
        "relative flex justify-center items-center p-6 min-h-[340px]",
        background && `bg-[${background}]`,
      )}
    >
      {image && 
        <Image src={image} alt={title} width={300} height={300}
          className="object-cover absolute top-0 left-0 w-full h-full"
        />
      }
      <div className="flex flex-col gap-2 justify-center items-center text-white relative z-[2]">
        {date && <Heading level="h6" className="text-center">{date}</Heading>}
        {title && <Heading level="h2" className="text-center">{title}</Heading>}
        {description && <p className="text-center">{description}</p>}
        {link && cta && <Button href={link} variant="tertiary">{cta}</Button>}
      </div>
    </div>
    // <Link
    //   href={link}
    //   className={`relative group overflow-hidden rounded-lg ${
    //     type === "solid" ? "bg-blue" : ""
    //   } ${size === "large" ? "h-[620px]" : "h-[300px]"} ${className}`}
    // >
    //   {type === "image" && (
    //     <>
    //       <Image
    //         src={image || "/placeholder.svg"}
    //         alt={title}
    //         fill
    //         className="object-cover transition-transform duration-300 group-hover:scale-105"
    //       />
    //       <div className="absolute inset-0 bg-black/40" />
    //     </>
    //   )}
      
    //   <div className="absolute inset-0 p-6 flex flex-col">
    //     {date && (
    //       <time className="text-sm text-white/90 mb-2">{date}</time>
    //     )}
    //     <div className="flex-1">
    //       <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
    //       {description && (
    //         <p className="text-white/90 text-sm mb-4">{description}</p>
    //       )}
    //     </div>
    //     <button className="text-white border border-white px-6 py-2 text-sm hover:bg-white hover:text-blue transition-colors w-fit">
    //       {type === "solid" && !description ? "BROWSE THE EDIT" : "START BUILDING YOUR FENCE HERE"}
    //     </button>
    //   </div>
    // </Link>
  )
}

