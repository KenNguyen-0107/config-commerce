"use client";

import { useState, useEffect, useRef } from "react";
import NextImage, { ImageProps } from "next/image";

interface LazyImageProps extends ImageProps {
	isHidden?: boolean;
}

export default function LazyImage({
	src,
	alt,
	loading,
	width,
	height,
	isHidden,
	...props
}: LazyImageProps) {
	const [isVisible, setIsVisible] = useState(loading === "eager" ? true : false);
	const divRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "0px" } // Load images when they're within 200px of viewport
		);
		const element = imageRef.current || divRef.current;
		if (element) {
			observer.observe(element);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return isVisible && isHidden != true ? (
		<NextImage
			src={src}
			alt={alt}
			width={width}
			height={height}
			loading={loading}
			ref={imageRef}
			{...props}
		/>
	) : (
		<div ref={divRef}></div>
	);
}
