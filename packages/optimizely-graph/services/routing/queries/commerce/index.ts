import { getHomePage as getBasedHomePage } from './query'
import { OptimizelyCommerceApi } from '../types'
import { type IOptiGraphClient as GraphQLClient } from '../../../../client/types'

interface IHomePageData {
    HomePage: {
        items: {
            OGTitle: string
            OGImage: {
                Url: string
            }
            Url: string
            Language: {
                Name: string
                Link: string
                DisplayName: string
            }
        }[]
    }
}

export class OptimizelyCommerceClient implements OptimizelyCommerceApi {
    async getHomePage(client: GraphQLClient, catalogType: string, siteId?: string) {
        client.updateFlags({ queryCache: false }, true)
        const data = await client.request<IHomePageData>({
            document: getBasedHomePage,
            variables: { catalogType, siteId },
        })

        console.log({ data })

        const results = data?.HomePage?.items || []
        client.restoreFlags()
        return results
    }
}

export default OptimizelyCommerceClient