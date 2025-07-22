
import { ButtonLink, LinksContainer, Maybe, Scalars } from "@/gql/graphql";

export interface LinkListProps {
  children?: React.ReactNode;
__typename?: 'LinkList';
Alignment?: Maybe<Scalars['String']['output']>;
CustomCSS?: Maybe<Scalars['String']['output']>;
Direction?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
Links?: Maybe<LinksContainer>;
ParentId?: Maybe<Scalars['String']['output']>;
Title?: Maybe<Scalars['String']['output']>;
TitleLink?: Maybe<ButtonLink>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
};
