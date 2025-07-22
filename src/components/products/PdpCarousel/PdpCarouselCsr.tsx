"use client";

import CustomSwiper from "@/components/common/CustomSwiper";
import Icon from "@/components/shared/icons";
import {
	getImgSrc,
	getProductSmallThumbnail,
	getProductThumbnail,
} from "@/components/utils";
import { ProductImage } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import PopupImage from "./PopupImage";

const PDPCarouselCsr = ({ images }: { images?: ProductImage[] }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [currentImage, setCurrentImage] = useState<ProductImage | null>(null);
	const [showImagePopup, setShowImagePopup] = useState(false);

	if (!images?.length || !getProductThumbnail(images)) return null;

	useEffect(() => {
		setCurrentImage(images[currentImageIndex]);
	}, [currentImageIndex]);

	if (images.length < 2) {
		return (
			<>
				<div className="absolute top-0 left-0 w-full h-full">
					<button
						aria-label="zoom"
						onClick={() => setShowImagePopup(true)}
						className="absolute top-0 left-0 p-[2px] bg-white shadow-lg z-[3]"
					>
						<Icon iconName="zoom" size={22} viewSize={22} />
					</button>

					<Image
						src={getProductThumbnail(images)}
						alt="Product Image"
						width={544}
						height={408}
						className="aspect-square lg:aspect-[4/3] overflow-hidden w-full object-cover cursor-pointer"
						loading="eager"
						priority
						onClick={() => setShowImagePopup(true)}
					/>
				</div>
				<PopupImage
					showImagePopup={showImagePopup}
					setShowImagePopup={setShowImagePopup}
					imgSrc={getProductThumbnail(images)}
				/>
			</>
		);
	}

	return (
		<>
			<div className="absolute top-0 left-0 w-full h-full bg-white">
				<div className="relative rounded-lg">
					<button
						aria-label="zoom"
						onClick={() => setShowImagePopup(true)}
						className="absolute top-0 left-0 p-[2px] bg-white shadow-lg z-[3]"
					>
						<Icon iconName="zoom" size={22} viewSize={22} />
					</button>

					<CustomSwiper
						slidesPerView={1}
						breakpoints={{
							1025: {
								slidesPerView: 1,
								slidesPerGroup: 1,
								grid: {
									rows: 1,
									fill: "row",
								},
								pagination: false,
							},
						}}
						spaceBetween={32}
						pagination={{
							clickable: true,
							modifierClass: "modifierAppPlanningPagination",
						}}
						buttonPrevClass={"left-4 opacity-80"}
						buttonNextClass={"right-4 opacity-80"}
						handleSlideTo={() => currentImageIndex}
						setIndex={setCurrentImageIndex}
						iconProps={{
							startPosition: 1,
							viewSize: 28,
							size: 36,
						}}
					>
						{images.map(
							(item, index: number) =>
								(item.LargeImagePath || item.MediumImagePath) && (
									<SwiperSlide key={index} className="h-full">
										<Image
											src={getImgSrc(
												item.LargeImagePath || item.MediumImagePath || ""
											)}
											alt={item.ImageAltText || ""}
											width={544}
											height={408}
											className="aspect-square lg:aspect-[4/3] overflow-hidden w-full h-full object-cover cursor-pointer"
											onClick={() => setShowImagePopup(true)}
										/>
									</SwiperSlide>
								)
						)}
					</CustomSwiper>
				</div>
				<div className="grid grid-cols-4 lg:grid-cols-5 gap-4 mt-10 max-w-full pb-2">
					{images.map(
						(item, index) =>
							(item.MediumImagePath ||
								item.SmallImagePath ||
								item.LargeImagePath) && (
								<Image
									key={index}
									src={getProductSmallThumbnail(item)}
									alt={`Thumbnail ${index + 1}`}
									height={96}
									width={72}
									className={cn(
										"w-full h-[72px] object-cover cursor-pointer",
										currentImageIndex === index ? "" : " opacity-50"
									)}
									onClick={() => {
										setCurrentImageIndex(index);
									}}
								/>
							)
					)}
				</div>
			</div>

			<PopupImage
				showImagePopup={showImagePopup}
				setShowImagePopup={setShowImagePopup}
				imgSrc={getImgSrc(currentImage?.LargeImagePath || currentImage?.MediumImagePath || "")}
			/>
		</>
	);
};

export default PDPCarouselCsr;
