import { getProductThumbnail } from "@/components/utils";
import { ProductImage } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import { FC, MouseEvent } from "react";
import { ProductProps } from "../Product/types";
import { REQUIRED_LENGTH } from "./types";

export interface SuggestionListProps {
	keyword: string
  suggestions?: ProductProps[]
  onSelect: (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => void
	isPending: boolean
}

const SuggestionList: FC<SuggestionListProps> = ({ keyword, suggestions, isPending, onSelect }) => {
	return (
			<ul className="absolute top-full left-0 right-0 bg-white border border-t-0 border-gray-300 rounded-b-md shadow-lg z-10 max-h-60 overflow-y-auto">
				{keyword?.length < REQUIRED_LENGTH &&
					<li className="px-4 py-2 text-muted font-lora cursor-pointer hover:bg-gray-100">
						<p>Keyword should be at least 3 characters</p>
					</li>
				}

				{keyword?.length >= 3 && !suggestions?.length && !isPending && (
					<li className="px-4 py-2 text-muted font-lora cursor-pointer hover:bg-gray-100">
						<p>No product found</p>
					</li>
				)}

				{keyword?.length >= 3 && suggestions?.map((product, index) => (
					<li
						key={index}
						className="px-4 py-2 text-blue cursor-pointer hover:bg-gray-100"
					>
						<Link href={product.Url as string} onClick={e => onSelect(e)} className="flex items-center gap-3">
							<div className="aspect-[4/3] flex-[0_0_48px] overflow-hidden border border-muted-background">
								<Image
									src={getProductThumbnail(product.ImageContainer?.Images as ProductImage[])}
									alt={product.ProductTitle || ""}
									width={48}
									height={48}
									className="object-cover w-full h-full"
								/>
							</div>
							
							<div>
								<h6 className="text-blue line-clamp-1">{product.ProductTitle}</h6>
								<p className="text-muted text-sm">{product.UnitListPriceDisplay}</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
	)
}

export default SuggestionList;