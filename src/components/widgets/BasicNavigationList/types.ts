
import { Maybe, Scalars } from "@/gql/graphql";

export interface BasicNavigationListProps {
  children?: React.ReactNode;
__typename?: 'BasicNavigationList';
CustomCSS?: Maybe<Scalars['String']['output']>;
Depth?: Maybe<Scalars['Int']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
LeftMargin?: Maybe<Scalars['Int']['output']>;
Link?: Maybe<ButtonLink>;
MarginBottom?: Maybe<Scalars['Int']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
Type?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
};
