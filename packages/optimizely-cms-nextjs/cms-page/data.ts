import { gql, GraphQLClient } from "graphql-request";
const envPrefix = process.env.GRAPH_ENV || "";

export type GetContentByPathVariables<LocaleType = string> = {
	path: string | string[];
	locale?: Array<LocaleType> | LocaleType;
	siteId?: string;
};

export type GetSiteIdVariables = {
	domain: string;
};

type MayBe<T> = T extends Array<infer R> ? Array<R | null> | null : T | null;

export type GetContentByPathResponse = {
	content?: MayBe<{
		items?: MayBe<
			Array<
				{
					__typename?: MayBe<string>;
					_type?: MayBe<string>;
				} & Record<string, any>
			>
		>;
	}>;
	B2BPage?: MayBe<{
		items?: MayBe<Array<Record<string, any>>>;
	}>;
	GenericPage?: MayBe<{
		items?: MayBe<Array<Record<string, any>>>;
	}>;
	Product?: MayBe<{
		items?: MayBe<Array<Record<string, any>>>;
	}>;
};

export type GetSiteIdResponse = {
	Website?: {
		items?: Array<{
			Id?: string;
			WebsiteName?: string;
		} | null> | null;
	};
};

export type GetMetaDataByPathResponse = {
	getGenericMetaData?: {
		items?: Array<{
			name?: string;
			alternatives?: Array<{
				locale?: string | null;
				href?: string | null;
			} | null> | null;
			canonical?: string | null;
		} | null>;
	};
};

const siteIdQuery = gql`
	query getSiteId($domain: [String!]!) {
		Website: ${envPrefix}Website(where: { Domains: { in: $domain } }) {
			items {
				Id
				WebsiteName
			}
		}
	}
`;

export type GetSiteIdMethod = (
	client: GraphQLClient,
	variables: GetSiteIdVariables
) => Promise<GetSiteIdResponse>;

export const getSiteId: GetSiteIdMethod = (client, variables) => {
	return client.request<GetSiteIdResponse, GetSiteIdVariables>(siteIdQuery, variables);
};

export type GetContentByPathMethod<LocaleType = string> = (
	client: GraphQLClient,
	variables: GetContentByPathVariables<LocaleType>,
	query?: string
) => Promise<GetContentByPathResponse>;
export type GetMetaDataByPathMethod<LocaleType = string> = (
	client: GraphQLClient,
	variables: GetContentByPathVariables<LocaleType>
) => Promise<GetMetaDataByPathResponse>;
export type GetFixContentMethod<LocaleType = string> = (
	client: GraphQLClient,
	variables: GetContentByPathVariables<LocaleType>,
	query?: string
) => Promise<GetContentByPathResponse>;
export type GetProductDetailsContentMethod<LocaleType = string> = (
	client: GraphQLClient,
	variables: GetContentByPathVariables<LocaleType>,
	query?: string
) => Promise<GetContentByPathResponse>;

export const getMetaDataByPath: GetMetaDataByPathMethod = (client, variables) => {
	return client.request<GetMetaDataByPathResponse, GetContentByPathVariables>(
		metadataQuery,
		variables
	);
};

export const getContentByPath: GetContentByPathMethod = (client, variables) => {
	return client.request<GetContentByPathResponse, GetContentByPathVariables>(
		contentQuery,
		variables
	);
};

export const getFixContent: GetFixContentMethod = (client, variables) => {
	return client.request<GetContentByPathResponse>(fixContentQuery, variables);
};

export const getProductDetailsContent: GetProductDetailsContentMethod = (client, variables) => {
	return client.request<GetContentByPathResponse>(productQuery, variables);
};

export default getContentByPath;

const contentQuery = gql`
	query getContentByPathBase($path: String!, $siteId: String!) {
		B2BHomePage(where: { WebsiteId: { eq: $siteId } }) {
			items {
				MetaKeywords
				Title
				MetaDescription
			}
		}
	}
`;

const productQuery = gql`
	query getProductDetailByPathBase($siteId: String!) {
		Product(where: { WebsiteId: { eq: $siteId } }) {
			items {
				ProductTitle
			}
		}
	}
`;

const fixContentQuery = gql`
	query getFixContent($siteId: String!) {
		ProductDetailsPage(where: { WebsiteId: { eq: $siteId } }) {
			items {
				__typename
			}
		}
	}
`;

const metadataQuery = gql`
	query getGenericMetaData($path: String!, $locale: [Locales], $siteId: String!) {
		getGenericMetaData: Content(
			where: { RelativePath: { eq: $path }, WebsiteId: { eq: $siteId } }
			locale: $locale
		) {
			items {
				name: Name
				alternatives: ExistingLanguages {
					locale: Name
					href: Link
				}
				canonical: Url
			}
		}
	}
`;
