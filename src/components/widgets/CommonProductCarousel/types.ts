
import { Maybe, Scalars } from "@/gql/graphql";

export interface CommonProductCarouselProps {
  children?: React.ReactNode;
__typename?: 'CommonProductCarousel';
CarouselType?: Maybe<Scalars['String']['output']>;
CustomCSS?: Maybe<Scalars['String']['output']>;
DisplayProductsFrom?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
MaxNumberOfColumns?: Maybe<Scalars['Int']['output']>;
MaximumNumberOfImageBadges?: Maybe<Scalars['Int']['output']>;
MaximumNumberOfTextBadges?: Maybe<Scalars['Int']['output']>;
NumberOfProductsToDisplay?: Maybe<Scalars['Int']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
RelatedProductType?: Maybe<Scalars['String']['output']>;
SeedWithManuallyAssigned?: Maybe<Scalars['String']['output']>;
SelectedCategoryIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
ShowAddToCart?: Maybe<Scalars['Boolean']['output']>;
ShowAddToList?: Maybe<Scalars['Boolean']['output']>;
ShowBrandName?: Maybe<Scalars['Boolean']['output']>;
ShowImage?: Maybe<Scalars['Boolean']['output']>;
ShowImageBadges?: Maybe<Scalars['Boolean']['output']>;
ShowPartNumbers?: Maybe<Scalars['Boolean']['output']>;
ShowPrice?: Maybe<Scalars['Boolean']['output']>;
ShowTextBadges?: Maybe<Scalars['Boolean']['output']>;
ShowTitle?: Maybe<Scalars['Boolean']['output']>;
Title?: Maybe<Scalars['String']['output']>;
TitleAlignment?: Maybe<Scalars['String']['output']>;
Type?: Maybe<Scalars['String']['output']>;
WidgetPosition?: Maybe<Scalars['Int']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
Info?: Record<string, any>;
};
