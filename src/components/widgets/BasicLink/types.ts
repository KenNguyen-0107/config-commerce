
import { ButtonLink, Maybe, Scalars } from "@/gql/graphql";

export interface BasicLinkProps {
  children?: React.ReactNode;
__typename?: 'BasicLink';
CustomCSS?: Maybe<Scalars['String']['output']>;
Destination?: Maybe<ButtonLink>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
OverrideTitle?: Maybe<Scalars['String']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
Section?: Maybe<Scalars['String']['output']>;
};
