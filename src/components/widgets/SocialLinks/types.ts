import { LinksContainer } from "@/gql/graphql";

export interface SocialLinksProps {
	__typename?: 'SocialLinks';
	Id?: string;
	ParentId?: string;
	Direction: "horizontal" | "vertical",
	Alignment: "center" | "left" | "right",
	IconSize: number,
	LinksPerRow: number,
	VisibilityState: "icon",
	IconColor: string,
	BackgroundColor: string,
	Links: LinksContainer
}