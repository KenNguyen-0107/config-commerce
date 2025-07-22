
import { Maybe, Scalars } from "@/gql/graphql";

export interface SubscribeProps {
  children?: React.ReactNode;
	__typename?: 'Subscribe';
  Alignment?: Maybe<Scalars['String']['output']>;
  CustomCSS?: Maybe<Scalars['String']['output']>;
  Description?: Maybe<Scalars['String']['output']>;
  Disclaimer?: Maybe<Scalars['String']['output']>;
  Id?: Maybe<Scalars['String']['output']>;
  IsLayout?: Maybe<Scalars['Boolean']['output']>;
  Label?: Maybe<Scalars['String']['output']>;
  ParentId?: Maybe<Scalars['String']['output']>;
  Placeholder?: Maybe<Scalars['String']['output']>;
  Title?: Maybe<Scalars['String']['output']>;
  Type?: Maybe<Scalars['String']['output']>;
  Zone?: Maybe<Scalars['String']['output']>;
};

export interface SubscribeFormProps {
	label: string;
	placeholder: string
}