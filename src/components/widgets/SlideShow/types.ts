
import { Maybe, Scalars, SlideContainer } from "@/gql/graphql";

export interface SlideShowProps {
  children?: React.ReactNode;
__typename?: 'SlideShow';
Autoplay?: Maybe<Scalars['Int']['output']>;
CssClass?: Maybe<Scalars['String']['output']>;
CustomCSS?: Maybe<Scalars['String']['output']>;
CustomFontSizes?: Maybe<Scalars['Boolean']['output']>;
H1FontSize?: Maybe<Scalars['Int']['output']>;
H2FontSize?: Maybe<Scalars['Int']['output']>;
Height?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
ResponsiveFontSizes?: Maybe<Scalars['Boolean']['output']>;
ShowArrows?: Maybe<Scalars['Boolean']['output']>;
SlideContainer?: Maybe<SlideContainer>;
SlideIndicator?: Maybe<Scalars['Boolean']['output']>;
SlideType?: Maybe<Scalars['String']['output']>;
TextAlignment?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
Section?: Maybe<Scalars['String']['output']>;
};
