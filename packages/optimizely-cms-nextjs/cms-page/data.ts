import { gql, GraphQLClient } from "graphql-request"

export type GetContentByPathVariables<LocaleType = string> = {
    path: string | string[],
    locale?: Array<LocaleType> | LocaleType,
    siteId?: string
}

type MayBe<T> = T extends Array<infer R> ? Array<R | null> | null : T | null

export type GetContentByPathResponse = {
    content?: MayBe<{
        items?: MayBe<Array<{
            __typename?: MayBe<string>
            _type?: MayBe<string>
        } & Record<string,any>>>
    }>
    B2BPage?: MayBe<{
        items?: MayBe<Array<Record<string,any>>>
    }>
    GenericPage?: MayBe<{
        items?: MayBe<Array<Record<string,any>>>
    }>
    Product?: MayBe<{
        items?: MayBe<Array<Record<string,any>>>
    }>
}

export type GetMetaDataByPathResponse = {
    getGenericMetaData?: {
        items?: Array<{
            name?: string,
            alternatives?: Array<{
                locale?: string | null
                href?: string | null
            } | null> | null
            canonical?: string | null
        } | null>
    }
}

export type GetContentByPathMethod<LocaleType = string> = (client: GraphQLClient, variables: GetContentByPathVariables<LocaleType>, query?: string) => Promise<GetContentByPathResponse>
export type GetMetaDataByPathMethod<LocaleType = string> = (client: GraphQLClient, variables: GetContentByPathVariables<LocaleType>) => Promise<GetMetaDataByPathResponse>
export type GetFixContentMethod<LocaleType = string> = (client: GraphQLClient, variables: GetContentByPathVariables<LocaleType>, query?: string) => Promise<GetContentByPathResponse>
export type GetProductDetailsContentMethod<LocaleType = string> = (client: GraphQLClient, variables: GetContentByPathVariables<LocaleType>, query?: string) => Promise<GetContentByPathResponse>

export const getMetaDataByPath: GetMetaDataByPathMethod = (client, variables) =>
{
    return client.request<GetMetaDataByPathResponse,GetContentByPathVariables>(metadataQuery, variables)
}

export const getContentByPath: GetContentByPathMethod = (client, variables) =>
{
    return client.request<GetContentByPathResponse,GetContentByPathVariables>(contentQuery, variables)
}

export const getFixContent: GetFixContentMethod = (client) =>
{
    return client.request<GetContentByPathResponse>(fixContentQuery)
}

export const getProductDetailsContent: GetProductDetailsContentMethod = (client) =>
{
    return client.request<GetContentByPathResponse>(productQuery)
}

export default getContentByPath

const contentQuery = gql`query getContentByPathBase($path: String!, $domain: String, $locale: [Locales]) {
    B2BHomePage {
        items {
            MetaKeywords
            Title
            MetaDescription
        }
    }
}`

const productQuery = gql`query getProductDetailByPathBase($path: String!, $domain: String, $locale: [Locales]) {
    Product {
        items {
            ProductTitle
        }
    }
}`

const fixContentQuery = gql`query getFixContent {
    ProductDetailsPage {
        items {
            __typename
        }
    }
}`

const metadataQuery = gql`query getGenericMetaData($path: String!, $locale: [Locales], $siteId: String) {
    getGenericMetaData: Content (
        where: { RelativePath: { eq: $path }, SiteId: { eq: $siteId } }
        locale: $locale
    ) {
        items {
            name: Name,
            alternatives: ExistingLanguages {
                locale: Name
                href: Link
            }
            canonical: Url
        }
    }
}`