import LazyImage from "@/components/shared/lazyImage";
import { Button } from "@/components/ui/button";
import { getImgSrc } from "@/components/utils";
import { cn } from "@/lib/utils";

const RightBanner = ({
	url,
	bgImgSrc,
	properties,
	altText,
	isVisible,
}: {
	url: string;
	bgImgSrc: string;
	properties: any;
	altText: string;
	isVisible: boolean;
}) => {
	const CategoryTitle = properties?.find(
		(item: any) => item?.Name.toLowerCase() === "categorydisplayname"
	)?.Value;
	const CategoryDesciption = properties?.find(
		(item: any) => item?.Name.toLowerCase() === "categorydisplaydescription"
	)?.Value;

	if (!bgImgSrc) return <></>;

	return (
		<div
			className={cn(
				"absolute left-[calc(50%+90px)] top-0 w-[544px] h-[334px] p-6",
				"transform transition-all duration-500 ease-in-out",
				"invisible opacity-0 group-hover/item:opacity-100 group-hover/item:visible"
			)}
		>
			<LazyImage
				alt={altText || "background image"}
				src={getImgSrc(bgImgSrc)}
				width={544}
				height={334}
				isHidden={!isVisible}
				className={cn("absolute top-0 left-0 z-0 w-full h-full object-cover text-center")}
			/>
			<div className={cn("absolute bg-black/40 top-0 left-0 z-0 w-full h-full object-cover")} />
			<div className="flex flex-col h-full justify-center items-center gap-2">
				{!!CategoryTitle && (
					<h2
						className={cn(
							`${bgImgSrc ? "relative z-[2]" : ""} text-white text-center font-frutiger-bold`
						)}
						dangerouslySetInnerHTML={{
							__html: CategoryTitle,
						}}
					/>
				)}

				{!!CategoryDesciption && (
					<div
						className={cn(
							`${bgImgSrc ? "relative z-[2]" : ""} text-white text-center font-lora text-lg`
						)}
						dangerouslySetInnerHTML={{
							__html: CategoryDesciption,
						}}
					/>
				)}

				<Button
					variant="tertiary"
					href={url}
					className={cn(`${bgImgSrc ? "relative z-[2]" : ""} text-white`)}
					title="View product"
				>
					VIEW PRODUCT
				</Button>
			</div>
		</div>
	);
};

export default RightBanner;
