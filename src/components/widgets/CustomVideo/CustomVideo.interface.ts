/**
 * Interface for CustomVideo GraphQL fragment
 */
export interface ICustomVideo {
	CssClass?: string;
	Title?: string;
	Type?: string;
	VideoUrl?: string;
	CustomCSS?: string;
	BackgroundImageUrl?: string;
	Description?: string;
	IsLayout?: boolean;
	autoplayAsBool?: boolean;
	PlayOnPopup?: boolean;
	ParentId?: string;
	Id?: string;
	__typename?: string;
	Zone?: string;
	Loading?: "lazy" | "eager";
}
