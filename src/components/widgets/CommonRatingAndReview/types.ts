
import { ButtonLink, Maybe, Scalars } from "@/gql/graphql";

export interface CommonRatingAndReviewProps {
  children?: React.ReactNode;
__typename?: 'CommonRatingAndReview';
Info?: Record<string, any>;
CustomCSS?: Maybe<Scalars['String']['output']>;
Destination?: Maybe<ButtonLink>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
MaxNumberOfItems?: Maybe<Scalars['Int']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
Title?: Maybe<Scalars['String']['output']>;
Type?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
Section?: string;
};
