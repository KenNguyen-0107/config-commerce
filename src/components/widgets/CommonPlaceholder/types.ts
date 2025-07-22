
import { Maybe, Scalars } from "@/gql/graphql";

export interface CommonPlaceholderProps {
  children?: React.ReactNode;
__typename?: 'CommonPlaceholder';
CustomCSS?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
Type?: Maybe<Scalars['String']['output']>;
Variant?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
Section?: Maybe<Scalars['String']['output']>;
Info?: Record<string, any>;
};
