
import { Maybe, Scalars } from "@/gql/graphql";

export interface HeaderSearchInputProps {
  children?: React.ReactNode;
__typename?: 'HeaderSearchInput';
Section?: string;
CustomCSS?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
};

export const REQUIRED_LENGTH = 3
