
import { LinksContainer, Maybe, QueryRef, Scalars } from "@/gql/graphql";

export interface HeaderMainNavigationProps {
  children?: React.ReactNode;
__typename?: 'HeaderMainNavigation';
Section?: string;
CustomCSS?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
Links?: Maybe<LinksContainer>;
OpenParentPages?: Maybe<Scalars['Boolean']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
ShowQuickOrder?: Maybe<Scalars['Boolean']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
_link?: Maybe<QueryRef>;
_modified?: Maybe<Scalars['Date']['output']>;
_score?: Maybe<Scalars['Float']['output']>;
};
