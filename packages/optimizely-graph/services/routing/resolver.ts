import createClient, { type IOptiGraphClient, isOptiGraphClient, OptiCmsSchema } from '../../client/index'
import { type OptimizelyGraphConfig } from '../../types'
import type { Route, IRouteResolver } from "./types"
import type { ContentLinkWithLocale } from '../types'
import type { OptimizelyCmsRoutingApi, OptimizelyCommerceApi } from './queries/types'

export class RouteResolver implements IRouteResolver {
    private _cgClient: IOptiGraphClient
    private _defaultUrlBase: string | URL
    private _resolverMode: OptiCmsSchema
    private _resolver: OptimizelyCmsRoutingApi | OptimizelyCommerceApi | undefined

    protected get client(): IOptiGraphClient {
        return this._cgClient
    }

    protected get urlBase(): string | URL {
        return this._defaultUrlBase
    }

    protected get schema(): OptiCmsSchema {
        return this._resolverMode
    }

    public constructor(
        clientOrConfig?: IOptiGraphClient | OptimizelyGraphConfig,
        urlBase: string | URL = "https://example.com",
        resolverMode?: OptiCmsSchema
    ) {
        this._cgClient = isOptiGraphClient(clientOrConfig) ? clientOrConfig : createClient(clientOrConfig)
        this._defaultUrlBase = urlBase
        this._resolverMode = resolverMode ?? this._cgClient.currentOptiCmsSchema
        console.log(this)
    }

    private async getResolver(): Promise<OptimizelyCmsRoutingApi | OptimizelyCommerceApi> {
        if (!this._resolver) {
            this._resolver = new (await import('./queries/commerce/index')).default
        }
        return this._resolver
    }

    public async getRoutes(domain?: string): Promise<Route[]> {
        const _resolver = await this.getResolver()
        // if (this._resolverMode === OptiCmsSchema.CMS12 || this._resolverMode === OptiCmsSchema.CMS13) {
        //     return (_resolver as OptimizelyCmsRoutingApi).getRoutes(this._cgClient, domain)
        // }
        return []
    }

    public async getContentInfoByPath(path: URL): Promise<undefined | Route>
    public async getContentInfoByPath(path: string, domain?: string): Promise<undefined | Route>
    public async getContentInfoByPath(path: URL | string, domain?: string): Promise<undefined | Route> {
        const queryPath = typeof path == 'object' && path != null ? path.pathname : path
        const queryDomain = typeof path == 'object' && path != null ? path.protocol + '//' + path.host : domain

        const resolver = await this.getResolver()
        if (!resolver) {
            return (resolver as OptimizelyCmsRoutingApi).getRouteByPath(this._cgClient, queryPath, queryDomain)
        }

        return undefined
    }

    public async getContentInfoById(key: string, locale?: string, version?: string | number): Promise<undefined | Route> {
        return (await this.getResolver() as OptimizelyCmsRoutingApi).getRouteById(this._cgClient, key, locale, version)
    }

    public routeToContentLink(route: Route): ContentLinkWithLocale {
        return {
            key: route.key,
            version: route.version,
            locale: route.locale
        }
    }
}

export default RouteResolver