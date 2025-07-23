"use client";

import CommonImage from "@/components/shared/CommonImage";
import { X } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";

const PopupImage = ({
	showImagePopup,
	setShowImagePopup,
	imgSrc,
}: {
	showImagePopup: boolean;
	setShowImagePopup: (show: boolean) => void;
	imgSrc: string;
}) => {
	return (
		<>
			{showImagePopup &&
				createPortal(
					<div
						data-name="ImagePopup"
						className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center p-4 w-[100vw]"
					>
						<div className="relative max-w-4xl w-full h-full">
							<button
								onClick={() => setShowImagePopup(false)}
								className="absolute top-0 right-0 text-blue hover:text-blue/80 z-10"
							>
								<X size={24} />
							</button>
							<CommonImage
								src={imgSrc}
								alt="Full size product image"
								fill
								className="w-full h-full object-contain"
							/>
						</div>
					</div>,
					document.body
				)}
		</>
	);
};

export default PopupImage;
