import type { Route } from '../types'
import { type IOptiGraphClient as GraphQLClient } from '../../../client/types'

export interface OptimizelyCmsRoutingApi {
    getRoutes(client: GraphQLClient, siteId?: string): Promise<Route[]>
    getRouteByPath(client: GraphQLClient, path: string, siteId?: string): Promise<undefined | Route>
    getRouteById(client: GraphQLClient, contentId: string, locale?: string, version?: string | number): Promise<undefined | Route>
}

export interface OptimizelyCommerceApi {
    getHomePage(client: GraphQLClient, siteId?: string): Promise<unknown>
}