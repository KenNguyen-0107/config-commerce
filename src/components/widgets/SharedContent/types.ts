
import { Maybe, Scalars } from "@/gql/graphql";

export interface SharedContentProps {
  children?: React.ReactNode;
__typename?: 'SharedContent';
Info?: Record<string, any>;
CustomCSS?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
PageId?: Maybe<Scalars['String']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
Type?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
};
