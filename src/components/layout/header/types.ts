
import { Maybe, Scalars, WidgetContainer } from "@/gql/graphql";

export interface HeaderProps {
  children?: React.ReactNode;
__typename?: 'Header';
ExcludeFromNavigation?: Maybe<Scalars['Boolean']['output']>;
ExcludeFromSignInRequired?: Maybe<Scalars['Boolean']['output']>;
HideBreadcrumbs?: Maybe<Scalars['Boolean']['output']>;
HideFooter?: Maybe<Scalars['Boolean']['output']>;
HideHeader?: Maybe<Scalars['Boolean']['output']>;
HorizontalRule?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
Languages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
LayoutPage?: Maybe<Scalars['String']['output']>;
LayoutPageId?: Maybe<Scalars['String']['output']>;
MetaDescription?: Maybe<Scalars['String']['output']>;
MetaKeywords?: Maybe<Scalars['String']['output']>;
Name?: Maybe<Scalars['String']['output']>;
NodeId?: Maybe<Scalars['String']['output']>;
OpenGraphImage?: Maybe<Scalars['String']['output']>;
OpenGraphTitle?: Maybe<Scalars['String']['output']>;
OpenGraphUrl?: Maybe<Scalars['String']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
SortOrder?: Maybe<Scalars['Int']['output']>;
StructuredPageData?: Maybe<Scalars['String']['output']>;
Tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
TemplateHash?: Maybe<Scalars['String']['output']>;
Title?: Maybe<Scalars['String']['output']>;
Type?: Maybe<Scalars['String']['output']>;
Url?: Maybe<Scalars['String']['output']>;
UrlSegment?: Maybe<Scalars['String']['output']>;
VariantName?: Maybe<Scalars['String']['output']>;
WebsiteId?: Maybe<Scalars['String']['output']>;
WidgetContainer?: Maybe<WidgetContainer>;
_id?: Maybe<Scalars['String']['output']>;
};
