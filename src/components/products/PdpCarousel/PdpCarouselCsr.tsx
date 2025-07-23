"use client";

import CustomSwiper from "@/components/common/CustomSwiper";
import Icon from "@/components/shared/icons";
import { getImgSrc, getProductSmallThumbnail, getProductThumbnail } from "@/components/utils";
import { ProductImage } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import PopupImage from "./PopupImage";
import CommonImage from "@/components/shared/CommonImage";

const PDPCarouselCsr = ({ images }: { images?: ProductImage[] }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [currentImage, setCurrentImage] = useState<ProductImage | null>(null);
	const [showImagePopup, setShowImagePopup] = useState(false);

	useEffect(() => {
		if (!images?.length) return;
		setCurrentImage(images?.[currentImageIndex]);
	}, [currentImageIndex, images]);

	if (!images?.length || !getProductThumbnail(images)) return null;

	return (
		<>
			<div className="w-full lg:h-full bg-white">
				<div className="relative rounded-lg" id="pdp-images">
					<button
						aria-label="zoom"
						onClick={() => setShowImagePopup(true)}
						className="absolute top-0 left-0 p-[2px] shadow-lg z-[3] border border-white"
					>
						<Icon iconName="zoom" size={22} viewSize={22} />
					</button>
					{images.length < 2 ? (
						<CommonImage
							src={getProductThumbnail(images)}
							alt="Product Image"
							width={544}
							height={408}
							className="aspect-square lg:aspect-[4/3] overflow-hidden w-full object-cover cursor-pointer"
							loading="eager"
							priority
							onClick={() => setShowImagePopup(true)}
						/>
					) : (
						<CustomSwiper
							slidesPerView={1}
							spaceBetween={32}
							buttonPrevClass={"left-1 opacity-80 flex"}
							buttonNextClass={"right-1 opacity-80 flex"}
							handleSlideTo={() => currentImageIndex}
							setIndex={setCurrentImageIndex}
							iconProps={{
								startPosition: 0,
								viewSize: 30,
								size: 40,
							}}
						>
							{images.map(
								(item, index: number) =>
									(item.LargeImagePath || item.MediumImagePath) && (
										<SwiperSlide key={index} className="h-full">
											<CommonImage
												src={getImgSrc(item.LargeImagePath || item.MediumImagePath || "")}
												alt={item.ImageAltText || ""}
												width={544}
												height={408}
												className="aspect-square lg:aspect-[4/3] overflow-hidden w-full h-full object-cover cursor-pointer"
												onClick={() => setShowImagePopup(true)}
												loading={index === 0 ? "eager" : "lazy"}
											/>
										</SwiperSlide>
									)
							)}
						</CustomSwiper>
					)}
				</div>
				{images.length > 1 && (
					<div className="grid grid-cols-4 lg:grid-cols-5 gap-4 mt-4 lg:mt-10 pb-2">
						{images.map(
							(item, index) =>
								(item.MediumImagePath || item.SmallImagePath || item.LargeImagePath) && (
									<CommonImage
										key={index}
										src={getProductSmallThumbnail(item)}
										alt={`Thumbnail ${index + 1}`}
										height={index === 0 ? 408 : 96}
										width={index === 0 ? 544 : 72}
										className={cn(
											"w-full h-[72px] object-cover cursor-pointer",
											currentImageIndex === index ? "" : " opacity-50"
										)}
										onClick={() => {
											setCurrentImageIndex(index);
										}}
										loading={index < 3 ? "eager" : "lazy"}
									/>
								)
						)}
					</div>
				)}
			</div>

			<PopupImage
				showImagePopup={showImagePopup}
				setShowImagePopup={setShowImagePopup}
				imgSrc={
					images.length < 2
						? getProductThumbnail(images)
						: getImgSrc(currentImage?.LargeImagePath || currentImage?.MediumImagePath || "")
				}
			/>
		</>
	);
};

export default PDPCarouselCsr;
