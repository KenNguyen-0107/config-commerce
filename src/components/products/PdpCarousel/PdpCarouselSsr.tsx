import { getProductSmallThumbnail, getProductThumbnail, NoImageSrc } from "@/components/utils";
import { ProductImage } from "@/gql/graphql";
import Image from "next/image";

const PDPCarouselSsr = ({ images }: { images?: ProductImage[] }) => {
	if (!images?.length || !getProductThumbnail(images))
		return (
			<div className="aspect-square lg:aspect-[4/3] overflow-hidden" id="pdp-images">
				<Image
					src={NoImageSrc}
					alt="No Image Available"
					width={544}
					height={408}
					className="w-full h-full object-cover"
					loading="eager"
					priority
				/>
			</div>
		);

	return (
		<>
			<div className="aspect-square lg:aspect-[4/3] overflow-hidden" id="pdp-images">
				<Image
					src={getProductThumbnail(images)}
					alt={"Product Image"}
					width={544}
					height={408}
					className="w-full h-full object-cover"
					loading="eager"
					priority
				/>
			</div>
			{images.length > 2 &&
				<div className="grid grid-cols-4 lg:grid-cols-5 gap-4 max-w-full pb-2 mt-4 lg:mt-10">
					{images.map(
						(item, index) =>
							(item.MediumImagePath ||
								item.SmallImagePath ||
								item.LargeImagePath) && (
								<Image
									key={index}
									alt={item.ImageAltText || "product image"}
									src={getProductSmallThumbnail(item)}
									loading={index < 3 ? "eager" : "lazy"}
									width={96}
									height={72}
									className="h-[72px] bg-muted-background"
								/>
							)
					)}
				</div>
			}
		</>
	);
};

export default PDPCarouselSsr;
