"use client";
import React, { useEffect, useRef, useState } from "react";
import { ICustomVideo } from "./CustomVideo.interface";
import Image from "next/image";
import { getImgSrc } from "@/components/utils";

const CustomVideo: React.FC<ICustomVideo> = (props) => {
	const {
		VideoUrl,
		Title,
		autoplayAsBool,
		__typename,
		Id,
		Loading,
		BackgroundImageUrl,
		PlayOnPopup,
	} = props || {};

	const isAutoPlay = autoplayAsBool && !PlayOnPopup;
	const [isVisible, setIsVisible] = useState(false);
	const [isShowBackground, setIsShowBackground] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const videoRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const videoPlayerRef = useRef<HTMLVideoElement>(null);
	const videoPlayerRefOnModal = useRef<HTMLVideoElement>(null);
	const SITE_HOST =
		process.env.SITE_HOST || "https://jacksonsfencing-configcommerce-d-cl.niteco.dev";
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1, rootMargin: "100px" }
		);

		if (videoRef.current) {
			observer.observe(videoRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	const getFormattedVideoUrl = (shouldAutoplay = false) => {
		if (!VideoUrl || !isVisible) return "";

		if (VideoUrl.includes("youtube.com") || VideoUrl.includes("youtu.be")) {
			let videoId = "";

			if (VideoUrl.includes("youtube.com/watch?v=")) {
				videoId = VideoUrl.split("v=")[1]?.split("&")[0] || "";
			} else if (VideoUrl.includes("youtu.be/")) {
				videoId = VideoUrl.split("youtu.be/")[1]?.split("?")[0] || "";
			} else if (VideoUrl.includes("youtube.com/embed/")) {
				videoId = VideoUrl.split("embed/")[1]?.split("?")[0] || "";
			}

			if (videoId) {
				const autoplayParam = shouldAutoplay ? "&autoplay=1&mute=1" : "&autoplay=0&mute=0";
				return `https://www.youtube.com/embed/${videoId}?rel=0${autoplayParam}`;
			}
		}

		return VideoUrl;
	};

	const isYoutubeVideo = VideoUrl && VideoUrl.includes("youtube.com");

	const getMainIframeSrc = () => {
		const shouldForcePlay = isModalOpen || isAutoPlay || !isShowBackground;
		return getFormattedVideoUrl(shouldForcePlay);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	const toggleModal = () => {
		if (PlayOnPopup) {
			setIsModalOpen(true);
		} else {
			setIsModalOpen(false);
		}
		if (!autoplayAsBool) {
			setIsShowBackground(false);
		}

		if (!autoplayAsBool && PlayOnPopup) {
			setIsShowBackground(true);
		}
		const videoPlayerRefToUse = isModalOpen ? videoPlayerRefOnModal : videoPlayerRef;
		console.log("isModalOpen", isModalOpen);

		if (videoPlayerRefToUse.current && !VideoUrl?.includes("youtube.com")) {
			// Set a small timeout to ensure DOM is ready
			setTimeout(() => {
				if (videoPlayerRefToUse.current) {
					videoPlayerRefToUse.current.muted = true;
					console.log(
						"play",
						videoPlayerRefToUse.current,
						"videoPlayerRefToUse",
						videoPlayerRefToUse
					);
					videoPlayerRefToUse.current.play().catch((err) => {
						console.warn("Failed to autoplay video:", err);
					});
				}
			}, 100);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			toggleModal();
		}
	};

	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isModalOpen]);

	return (
		<div
			data-component={__typename}
			data-component-id={Id}
			ref={videoRef}
			className="relative [&>iframe]:max-w-[100%]"
		>
			<div className="relative max-w-[560px] mx-auto">
				{BackgroundImageUrl && (
					<div
						className={`absolute inset-0 w-full group h-full cursor-pointer z-[2] ${
							isAutoPlay || !isShowBackground ? "hidden transition-2" : ""
						}`}
					>
						<div className="relative inset-0 w-full h-full z-1">
							<Image
								src={getImgSrc(BackgroundImageUrl || "", SITE_HOST)}
								alt={Title || "Video background"}
								width={100}
								height={100}
								className="w-full h-full object-cover"
								unoptimized
							/>
						</div>
						<div className="absolute inset-0 w-full h-full z-2 bg-black opacity-10 group-hover:opacity-0 transition duration-300 ease-in"></div>
					</div>
				)}
				{isVisible && (
					<>
						<div
							className={`absolute z-[3] flex items-center justify-center w-full h-full cursor-pointer ${
								isAutoPlay || !isShowBackground ? "hidden transition-2" : ""
							}`}
							onClick={toggleModal}
						>
							<svg
								width="68"
								height="68"
								viewBox="0 0 68 68"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									opacity="0.8"
									d="M67.3332 34.0164C67.3332 52.3795 52.3718 67.3337 33.9998 67.3337C15.6279 67.3337 0.666504 52.3795 0.666504 34.0164C0.666504 15.6212 15.6279 0.666992 33.9998 0.666992C52.3718 0.666992 67.3332 15.6212 67.3332 34.0164Z"
									fill="white"
								/>
								<path
									d="M47.3333 34.0165C47.3333 34.859 47.0682 35.7047 46.5379 36.3819C46.4384 36.5147 45.9744 37.0623 45.6098 37.4187L45.411 37.6131C42.6269 40.5649 35.6998 45.004 32.1866 46.4264C32.1866 46.4588 30.0985 47.3045 29.1042 47.3337H28.9716C27.447 47.3337 26.0218 46.4945 25.2926 45.1336C24.8949 44.3851 24.5303 42.2142 24.4972 42.185C24.1989 40.2377 24 37.2567 24 33.9841C24 30.5528 24.1989 27.439 24.5634 25.5273C24.5634 25.4949 24.928 23.7452 25.16 23.1619C25.5246 22.3227 26.1875 21.6066 27.0161 21.153C27.679 20.8322 28.375 20.667 29.1042 20.667C29.8665 20.7026 31.2917 21.1854 31.8551 21.4122C35.5672 22.8379 42.66 27.5038 45.3778 30.3551C45.8419 30.8088 46.339 31.3628 46.4716 31.4892C47.035 32.202 47.3333 33.0769 47.3333 34.0165Z"
									fill="#283270"
								/>
							</svg>
						</div>

						<div className="w-full h-full">
							{!isYoutubeVideo ? (
								<video
									width="420"
									height="315"
									controls
									ref={videoPlayerRef}
									playsInline
									title={Title || "Video player"}
									preload="metadata"
									className="w-[100%] z-1  h-[340px] object-cover"
									autoPlay={isAutoPlay}
									muted={isAutoPlay}
								>
									<source src={getImgSrc(VideoUrl)} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							) : (
								<iframe
									width="500px"
									height="500px"
									src={getMainIframeSrc()}
									title={Title || "YouTube video player"}
									frameBorder="0"
									referrerPolicy="no-referrer"
									allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
									loading={Loading}
									className="box-border max-w-[inherit]"
								></iframe>
							)}
						</div>
					</>
				)}
				{!isVisible && (
					<div className="w-[420px] h-[315px] bg-gray-100 flex items-center justify-center">
						<span className="text-gray-500">Video will load when visible</span>
					</div>
				)}
				{isModalOpen && (
					<div
						className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-2 sm:p-4"
						role="dialog"
						aria-modal="true"
						aria-labelledby="video-modal-title"
						ref={modalRef}
						onKeyDown={handleKeyDown}
						tabIndex={-1}
					>
						<div className="relative rounded-lg overflow-hidden w-[100vw] md:w-[auto] pr-[35px] pt-[35px]">
							<button
								onClick={closeModal}
								className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 z-1 bg-white rounded-full p-1 outline-none"
								aria-label="Close video"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
							<div className="p-0">
								{!isYoutubeVideo ? (
									<video
										width="100%"
										height="auto"
										controls
										autoPlay={true}
										muted={true}
										playsInline
										title={Title || "Video player"}
										className="w-full max-w-[650px]"
										aria-describedby="video-modal-title"
										// crossOrigin="anonymous"
										ref={videoPlayerRefOnModal}
									>
										<source src={getImgSrc(VideoUrl)} type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								) : (
									<iframe
										width="650px"
										height="450px"
										src={getMainIframeSrc()}
										title={Title || "YouTube video player"}
										id="video-modal-title"
										referrerPolicy="no-referrer"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen
										className="box-border h-[300px] sm:h-[400px] md:h-[500px] w-full sm:w-[600px] md:w-[750px] max-w-full"
									></iframe>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CustomVideo;
