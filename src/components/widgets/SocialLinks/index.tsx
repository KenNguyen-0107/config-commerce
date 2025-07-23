import { SocialLinksProps } from "./types";
import { cn } from "@/lib/utils";
import CommonImage from "@/components/shared/CommonImage";
import { SmartLink } from "@/components/shared/smartLink";

const SocialLinks = (props: SocialLinksProps) => {
	const {
		__typename,
		Id,
		Direction = "horizontal",
		Alignment = "center",
		IconSize = 24,
		Links,
	} = props;

	return (
		<div
			data-component={__typename}
			data-component-id={Id}
			className={cn(
				"flex",
				`${Direction === "horizontal" ? "flex-row" : "flex-col"}`,
				`items-${Alignment}`,
				"gap-3"
			)}
		>
			{Links.LinkItems?.map((link, index) => (
				<SmartLink
					key={index}
					href={link?.Destination?.Value || ""}
					target={link?.OpenInNewWindow ? "_blank" : "_self"}
					className="block"
					aria-label={`${link?.Icon || "Social"} link`}
				>
					<CommonImage
						src={`/icons/${link?.Icon || ""}.svg`}
						alt={link?.Icon || ""}
						width={IconSize}
						height={IconSize}
						unoptimized
					/>
				</SmartLink>
			))}
		</div>
	);
};

export default SocialLinks;
