
import { Maybe, Scalars } from "@/gql/graphql";

export interface BasicRowProps {
  children?: React.ReactNode;
__typename?: 'BasicRow';
Columns?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
CssClass?: Maybe<Scalars['String']['output']>;
CustomCSS?: Maybe<Scalars['String']['output']>;
FullWidthColor?: Maybe<Scalars['String']['output']>;
FullWidthImage?: Maybe<Scalars['String']['output']>;
FullWidthImageFocalPoint?: Maybe<Scalars['String']['output']>;
FullWidthStylingType?: Maybe<Scalars['String']['output']>;
Gap?: Maybe<Scalars['Int']['output']>;
Variant?: string;
Id?: Maybe<Scalars['String']['output']>;
IsFullWidth?: Maybe<Scalars['Boolean']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
Reflow?: Maybe<Scalars['Boolean']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
Info?: Record<string, any>;
};
