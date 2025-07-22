
import { Maybe, Scalars } from "@/gql/graphql";

export interface BasicGridProps {
  children?: React.ReactNode;
__typename?: 'BasicGrid';
Section?: string;
CssClass?: Maybe<Scalars['String']['output']>;
CustomCSS?: Maybe<Scalars['String']['output']>;
ExtraLargeColumnCount?: Maybe<Scalars['Int']['output']>;
ExtraLargeRowCount?: Maybe<Scalars['Int']['output']>;
ExtraSmallColumnCount?: Maybe<Scalars['Int']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsFullWidth?: Maybe<Scalars['Boolean']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
LargeColumnCount?: Maybe<Scalars['Int']['output']>;
MediumColumnCount?: Maybe<Scalars['Int']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
SmallColumnCount?: Maybe<Scalars['Int']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
Info?: Record<string, any>;
};
