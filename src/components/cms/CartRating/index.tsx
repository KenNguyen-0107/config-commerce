import Icon from '@/components/shared/icons'
import { getImgSrc } from '@/components/utils'
import Image from "next/image"

export default function CartRating() {
  return (
    <div className="container mx-auto text-center flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4">
      <div className="font-helvetical hidden lg:block text-blue font-medium text-xl">
        Excellent
      </div>
      
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Icon iconName='star' size={30} viewSize={30} key={i} />
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-1 text-xs font-helvetical font-medium">
        <span className="">4.8</span>
        <span className="text-muted">
          out of 5 based on
        </span>
        <span className="">3,405</span>
        <span className="text-muted">reviews</span>
      </div>

      <div className="h-5 w-20">
        <Image
          src={getImgSrc("/UserFiles/Homepage/trupilot.png?width=128&height=30")}
          alt="Trustpilot"
          width={80}
          height={20}
          className="object-contain"
        />
      </div>
    </div>
  )
}

