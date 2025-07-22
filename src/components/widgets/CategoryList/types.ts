
import { CategoryContainer, Maybe, Scalars } from "@/gql/graphql";

export interface CategoryListProps {
  children?: React.ReactNode;
__typename?: 'CategoryList';
Categories?: Maybe<CategoryContainer>;
CssClass?: string;
CustomCSS?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
ShowImages?: Maybe<Scalars['Boolean']['output']>;
ShowOnlyTopLevelCategories?: Maybe<Scalars['Boolean']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
};
