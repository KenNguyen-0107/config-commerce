
import { LinksContainer, Maybe, Scalars } from "@/gql/graphql";

export interface BasicSocialLinksProps {
  children?: React.ReactNode;
__typename?: 'BasicSocialLinks';
Alignment?: Maybe<Scalars['String']['output']>;
BackgroundColor?: Maybe<Scalars['String']['output']>;
CustomCSS?: Maybe<Scalars['String']['output']>;
Direction?: Maybe<Scalars['String']['output']>;
IconColor?: Maybe<Scalars['String']['output']>;
IconSize?: Maybe<Scalars['Int']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
Links?: Maybe<LinksContainer>;
LinksPerRow?: Maybe<Scalars['Int']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
VisibilityState?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
};
