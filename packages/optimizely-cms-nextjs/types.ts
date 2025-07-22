import type { IOptiGraphClient } from "@packages/optimizely-graph"
import type { CmsComponent, ContentLink } from "@packages/optimizely-cms-react"
import type { Metadata } from 'next'

export type OptimizelyNextPage<T = object> = CmsComponent<T> & 
{
    getMetaData?: (contentLink: ContentLink, locale: string | null | undefined, client: IOptiGraphClient) => Promise<Metadata>
}