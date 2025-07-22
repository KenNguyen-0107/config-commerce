
import { ButtonLink, Maybe, Scalars } from "@/gql/graphql";

export interface BasicButtonProps {
  children?: React.ReactNode;
__typename?: 'BasicButton';
Alignment?: Maybe<Scalars['String']['output']>;
CssClass?: Maybe<Scalars['String']['output']>;
CustomCSS?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
Label?: Maybe<Scalars['String']['output']>;
Link?: Maybe<ButtonLink>;
ParentId?: Maybe<Scalars['String']['output']>;
Variant?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
Section?: Maybe<Scalars['String']['output']>;
Info?: Record<string, any>
};
