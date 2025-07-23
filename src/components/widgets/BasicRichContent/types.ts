import { Maybe, Scalars } from "@/gql/graphql";

export interface BasicRichContentProps {
	children?: React.ReactNode;
	__typename?: "BasicRichContent";
	BackgroundColor?: Maybe<Scalars["String"]["output"]>;
	Info?: Maybe<Scalars["String"]["output"]>;
	Content?: Maybe<Scalars["String"]["output"]>;
	CssClass?: Maybe<Scalars["String"]["output"]>;
	CustomCSS?: Maybe<Scalars["String"]["output"]>;
	Id?: Maybe<Scalars["String"]["output"]>;
	IsLayout?: Maybe<Scalars["Boolean"]["output"]>;
	Padding?: Maybe<Scalars["Int"]["output"]>;
	ParentId?: Maybe<Scalars["String"]["output"]>;
	Zone?: Maybe<Scalars["String"]["output"]>;
	_id?: Maybe<Scalars["String"]["output"]>;
	Section?: Maybe<Scalars["String"]["output"]>;
}
