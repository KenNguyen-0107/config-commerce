import React from "react";
import { CheckoutShippingHeaderProps } from "./types";
import Image from "next/image";

const CheckoutShippingHeader: React.FC<CheckoutShippingHeaderProps> = (
) => {
	return (
		<div className="text-3xl lg:text-[40px] flex items-center justify-between mb-10">
			<div className="flex justify-start gap-4 items-end">
				<h1 className="text-2xl font-bold text-blue">CHECKOUT</h1>
			</div>
			<div className="w-24">
				<Image
					src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TmLNARa31olhXnn6mYgLfSsqBsVTam.png"
					alt="Secured by Sectigo"
					className="w-full"
					width={125}
					height={49}
					unoptimized
				/>
			</div>
		</div>
	);
};

export default CheckoutShippingHeader;
