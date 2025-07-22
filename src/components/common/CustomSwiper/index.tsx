"use client";
import Icon from "@/components/shared/icons";
import { useSwiper } from "@/hook/useSwiper";
import { cn } from "@/lib/utils";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { FreeMode, Pagination, Virtual } from "swiper/modules";
import { Swiper } from "swiper/react";
import { FreeModeOptions, SwiperOptions } from "swiper/types";

export interface CustomSwiperProps {
	children: ReactNode;
	buttonPrevClass?: string;
	buttonNextClass?: string;
	className?: string;
	wrapperClass?: string;
	handleReachEnd?: () => void;
	handleReachStart?: () => void;
	handleSlideTo?: () => number;
	setIndex?: Dispatch<SetStateAction<number>>;
	slidesPerView?: number;
	slidesPerGroup?: number;
	loop?: boolean;
	draggable?: boolean;
	freeMode?: boolean | FreeModeOptions | undefined;
	navigation?: boolean;
	pagination?: {
		clickable?: boolean;
		modifierClass?: string;
	};
	resistance?: boolean | undefined;
	spaceBetween?: number;
	breakpoints?:
		| { [width: number]: SwiperOptions; [ratio: string]: SwiperOptions }
		| undefined;
	paginationEl?: string[];
	iconProps?: {
		startPosition: number;
		viewSize: number;
		size: number;
	};
}

const CustomSwiper = ({
	children,
	buttonPrevClass,
	buttonNextClass,
	className,
	wrapperClass,
	navigation = true,
	pagination,
	handleSlideTo,
	setIndex,
	loop = false,
	iconProps = {
		startPosition: 2,
		viewSize: 26,
		size: 26,
	},
	// paginationEl,
	...props
}: CustomSwiperProps) => {
	const { setSwiperRef, slideTo, slideNext, slidePrev } = useSwiper();
	const [isReachBegin, setIsReachBegin] = useState(true);
	const [isReachEnd, setIsReachEnd] = useState(false);

	useEffect(() => {
		if (!!handleSlideTo) {
			slideTo(handleSlideTo());
		}
	}, [handleSlideTo, slideTo]);

	return (
		<div className={cn("relative", wrapperClass)}>
			<Swiper
				modules={[Pagination, Virtual, FreeMode]}
				className={className}
				spaceBetween={32}
				pagination={pagination ? pagination : undefined}
				onSwiper={setSwiperRef}
        loop={loop}
				onSlideChange={(swiper) => {
					setIndex?.(swiper.activeIndex);
					setIsReachBegin(swiper.isBeginning);
					setIsReachEnd(swiper.isEnd);
				}}
				{...props}
			>
				{children}
			</Swiper>

			{navigation && (
				<>
					<button
						aria-label="Prev slide"
						title="Chevron Left"
						onClick={slidePrev}
						disabled={!loop && isReachBegin}
						className={cn(
							"hidden lg:flex items-center justify-center",
							"z-[3] absolute top-1/2 -translate-y-1/2",
							"bg-transparent rounded-full shadow-md overflow-hidden",
							"disabled:opacity-50",
							buttonPrevClass
						)}
					>
						<Icon
							iconName="chevronleft"
							startPosition={iconProps.startPosition}
							viewSize={iconProps.viewSize}
							size={iconProps.size}
							className="fill-white"
						/>
					</button>

					<button
						aria-label="Next slide"
						title="Chevron Right"
						onClick={slideNext}
						disabled={!loop && isReachEnd}
						className={cn(
							"hidden lg:flex items-center justify-center",
							"z-[3] absolute top-1/2 -translate-y-1/2",
							"bg-transparent rounded-full shadow-md overflow-hidden",
							"disabled:opacity-50",
							buttonNextClass
						)}
					>
						<Icon
							iconName="chevronright"
							startPosition={iconProps.startPosition}
							viewSize={iconProps.viewSize}
							size={iconProps.size}
							className="fill-white"
						/>
					</button>
				</>
			)}
		</div>
	);
};

export default CustomSwiper;
