
import { Maybe, QuestionAnswerContainer, Scalars } from "@/gql/graphql";

export interface BasicQuestionAnswersProps {
  children?: React.ReactNode;
__typename?: 'BasicQuestionAnswers';
CustomCSS?: Maybe<Scalars['String']['output']>;
Description?: Maybe<Scalars['String']['output']>;
Id?: Maybe<Scalars['String']['output']>;
IsLayout?: Maybe<Scalars['Boolean']['output']>;
ParentId?: Maybe<Scalars['String']['output']>;
QuestionAnswersContainer?: Maybe<QuestionAnswerContainer>;
Title?: Maybe<Scalars['String']['output']>;
Type?: Maybe<Scalars['String']['output']>;
Zone?: Maybe<Scalars['String']['output']>;
_id?: Maybe<Scalars['String']['output']>;
};
