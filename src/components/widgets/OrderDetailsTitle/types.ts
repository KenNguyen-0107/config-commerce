
import { Maybe, Scalars } from "@/gql/graphql";

export interface OrderDetailsTitleProps {
	children?: React.ReactNode;
	__typename?: "OrderDetailsTitle";
	CustomCSS?: Maybe<Scalars["String"]["output"]>;
	Id?: Maybe<Scalars["String"]["output"]>;
	IsLayout?: Maybe<Scalars["Boolean"]["output"]>;
	ParentId?: Maybe<Scalars["String"]["output"]>;
	Type?: Maybe<Scalars["String"]["output"]>;
	Zone?: Maybe<Scalars["String"]["output"]>;
	_id?: Maybe<Scalars["String"]["output"]>;
	Info?: {
		params: {
			orderId: string;
		};
	};
};
