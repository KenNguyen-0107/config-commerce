import { Button } from "@/components/ui/button";
import { getImgSrc } from "@/components/utils";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SlideItem } from "@/gql/graphql";

export default function PLPTopSlide({ data }: { data: SlideItem[] }) {
	return (
		<div className="w-full py-8 hidden lg:block">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{data?.map((item, index) => (
						<div
							key={index}
							data-component="card-information"
							className={cn(
								"relative",
								`${index !== 0 ? "border-l-[1px] border-muted" : ""
								} flex flex-col items-center gap-6 text-center`
							)}
						>
							<div className="w-full">
								<NextImage
									loading="eager"
									src={getImgSrc(item?.Image || "")}
									alt={"Image Alt"}
									width={300}
									height={100}
									className="h-[50px] object-contain"
								/>
							</div>
							{item.Heading && (
								<div
									className="font-frutiger-bold text-blue text-center uppercase"
									dangerouslySetInnerHTML={{ __html: item.Heading }}
								></div>
							)}
							{item.ButtonLabel && (
								<Button
									buttonLabel={item.ButtonLabel}
									href={item.ButtonLink?.Value || "/"}
									variant="tertiary"
									className="border-white font-frutiger-bold leading-5 px-6 py-4 h-auto mt-auto"
								>
									{item.ButtonLabel}
								</Button>
							)}
							{item.BackgroundLink?.Url && (
								<Link
									href={item.BackgroundLink.Url}
									aria-label={"Background Link"}
									className="absolute top-0 left-0 right-0 bottom-0"
								/>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
