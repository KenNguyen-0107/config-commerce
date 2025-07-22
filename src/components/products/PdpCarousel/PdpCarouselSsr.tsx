import { getProductSmallThumbnail, getProductThumbnail } from "@/components/utils";
import { ProductImage } from "@/gql/graphql";
import Image from "next/image";

const PDPCarouselSsr = ({ images }: { images?: ProductImage[] }) => {
	if (!images?.length || !getProductThumbnail(images))
		return (
			<Image
				src="/images/Jacksons-No-Image.gif"
				alt="No Image Available"
				width={544}
				height={408}
				className="aspect-square lg:aspect-[4/3] overflow-hidden w-full object-cover"
				loading="eager"
				priority
			/>
		);

	if (images.length < 2)
		return (
			<Image
				src={getProductThumbnail(images)}
				alt="Product Image"
				width={544}
				height={408}
				className="aspect-square lg:aspect-[4/3] overflow-hidden w-full object-cover"
				loading="eager"
				priority
			/>
		);

	return (
		<>
			<div className="aspect-square lg:aspect-[4/3] overflow-hidden">
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
			<div className="grid grid-cols-4 lg:grid-cols-5 gap-4 mt-0 max-w-full pb-2">
				{images.map(
					(item, index) =>
						(item.MediumImagePath ||
							item.SmallImagePath ||
							item.LargeImagePath) && (
							<Image
								key={index}
								alt={item.ImageAltText || "product image"}
								src={getProductSmallThumbnail(item)}
								loading={index < 10 ? "eager" : "lazy"}
								width={96}
								height={72}
								className="h-[72px] bg-muted-background"
							/>
						)
				)}
			</div>
		</>
	);
};

export default PDPCarouselSsr;
