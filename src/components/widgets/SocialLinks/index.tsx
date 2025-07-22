import Link from "next/link";
import { SocialLinksProps } from "./types";
import { cn } from "@/lib/utils";
import Icon from "@/components/shared/icons";

const SocialLinks = (props: SocialLinksProps) => {
	const { __typename, Id, Direction = "horizontal", Alignment = "center", IconSize = 24, Links } = props;

	return (
		<div data-component={__typename} data-component-id={Id}
			className={cn(
				"flex",
				`${Direction === "horizontal" ? "flex-row" : "flex-col"}`,
				`items-${Alignment}`,
				"gap-3"
			)}
		>
			{Links.LinkItems?.map((link, index) => (
				<Link key={index}
					href={link?.Destination?.Value || ""}
					target={link?.OpenInNewWindow ? "_blank" : "_self"}
					className="block"
					aria-label={`${link?.Icon || "Social"} link`}
				>
					<Icon iconName={link?.Icon || ""} size={IconSize} />
				</Link>
			))}
		</div>
	);
};

export default SocialLinks;
