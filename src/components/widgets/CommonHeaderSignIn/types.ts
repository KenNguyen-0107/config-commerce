
import { Maybe, Scalars } from "@/gql/graphql";

export interface CommonHeaderSignInProps {
  children?: React.ReactNode;
__typename?: 'CommonHeaderSignIn';
CustomCSS?: Maybe<Scalars['String']['output']>;
Section?: string;
Icon?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IncludeAccountMenu?: Maybe<Scalars['Boolean']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
ShowInventoryToggle?: Maybe<Scalars['Boolean']['output']>;
ShowPricingToggle?: Maybe<Scalars['Boolean']['output']>;
VisibilityState?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
};
