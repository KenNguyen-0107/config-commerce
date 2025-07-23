import { Button } from "@/components/ui/button";
import { getImgSrc, removeHtmlTags } from "@/components/utils";
import { SlideItem } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import CommonImage from "@/components/shared/CommonImage";
import { SmartLink } from "@/components/shared/smartLink";

type CardInformationProps = SlideItem & {
	type: string;
	section?: string;
	order: number;
	loading: "lazy" | "eager";
};

const CardInformation = (props: CardInformationProps) => {
	const {
		Image,
		loading,
		Heading,
		Subheading,
		ButtonLabel,
		type,
		section,
		ButtonLink,
		BackgroundLink,
	} = props;

	const CardProps = {
		WrapperClass: "h-full flex flex-col items-center border border-white border-opacity-50 py-6",
		ImageClass: "mx-auto w-full h-auto",
		ImageWrapperClass: "mb-6 w-full",
		HeadingClass: "px-6 font-frutiger-bold text-white text-xl lg:text-2xl font-bold mb-4 uppercase",
		SubHeadingClass: "overflow-hidden line-clamp-3 font-lora text-white lg:text-lg px-6 mb-6",
	};

	if (type === "shoppingcarousel") {
		CardProps.WrapperClass = "flex flex-col items-center px-4 py-6 lg:p-10 gap-4 text-center";
		CardProps.ImageClass = "mx-auto w-auto h-[120px] object-contain";
		CardProps.ImageWrapperClass = "";
		CardProps.HeadingClass =
			"font-frutiger-bold text-white text-xl lg:text-2xl font-bold uppercase lg:h-[60px] flex justify-center items-center items-center";
		CardProps.SubHeadingClass = "font-lora text-white lg:text-lg";
	}
	if (section === "USP") {
		CardProps.WrapperClass = `flex flex-col items-center gap-6 text-center`;
		CardProps.HeadingClass = "font-frutiger-bold text-blue text-center uppercase";
		CardProps.ImageClass = "h-[50px] object-contain";
		CardProps.ImageWrapperClass = "h-[50px]";
	}

	return (
		<div data-component="card-information" className={cn("relative", CardProps.WrapperClass)}>
			<div className={CardProps.ImageWrapperClass}>
				<CommonImage
					src={getImgSrc(Image || "")}
					alt={removeHtmlTags(Heading || "Image Alt")}
					width={300}
					height={100}
					className={CardProps.ImageClass}
					loading={loading}
				/>
			</div>
			{Heading && (
				<div className={CardProps.HeadingClass} dangerouslySetInnerHTML={{ __html: Heading }}></div>
			)}
			{Subheading && (
				<div
					className={CardProps.SubHeadingClass}
					dangerouslySetInnerHTML={{ __html: Subheading }}
				></div>
			)}
			{ButtonLabel && (
				<Button
					title={ButtonLabel}
					buttonLabel={ButtonLabel}
					href={ButtonLink?.Value || "/"}
					variant="tertiary"
					className="border-white font-frutiger-bold leading-5 px-6 py-4 h-auto mt-auto"
				>
					{ButtonLabel}
				</Button>
			)}
			{BackgroundLink?.Url && (
				<SmartLink
					href={BackgroundLink.Url}
					aria-label={"Background Link"}
					className="absolute top-0 left-0 right-0 bottom-0"
				/>
			)}
		</div>
	);
};

export default CardInformation;
