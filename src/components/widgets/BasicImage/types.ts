
import { ButtonLink, Maybe, Scalars } from "@/gql/graphql";

export interface BasicImageProps {
  children?: React.ReactNode;
__typename?: 'BasicImage';
AltText?: Maybe<Scalars['String']['output']>;
CssClass?: Maybe<Scalars['String']['output']>;
CustomCSS?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
ImageLink?: Maybe<ButtonLink>;
Section?: Maybe<Scalars['String']['output']>;
ImageUrl?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
};
