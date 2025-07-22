import { type ReactNode, type ComponentType } from 'react'
import { type PropsWithContext } from '../context/types'
import { getServerContext } from '../context/rsc'
import { cmsContentAware } from './cms-content/utils'

import { CmsContentArea as BaseContentArea, type CmsContentAreaComponent } from './cms-content-area/index' // Both RSC & Client capable
import { CmsEditable as BaseEditable, type CmsEditableComponent } from './cms-editable/index' // Both RSC & Client capable
import { CmsContent as BaseCmsContent, type CmsContentComponent, type CmsContentBaseComponent } from './cms-content/rsc' // Different components for RSC & Client
import { OptimizelyComposition as BaseOptimizelyComposition, type OptimizelyCompositionComponent } from './visual-builder/index' // Both RSC & Client capable
import { RichText as BaseRichText, type RichTextComponent } from './rich-text/index'

// Pass through Style functions types
export * from "./cms-styles/index"
export { isNode, isComponentNode, isComponentNodeOfType, isStructureNode, isElementNode } from "./visual-builder/functions"

// Export dictionary & pass through RichText Types
export { DefaultComponents as RichTextComponentDictionary } from './rich-text/components'  
export type { TypedNode, RichTextNode, StringNode, NodeInput } from "./rich-text/index"

/**
 *  Fallback while RSC hasn't been moved from Canary to Main
 */
type ReactServerComponentType<P = any> = ComponentType<P> | ((props: P) => Promise<ReactNode>)

/**
 * Wrapper function to turn context dependant components into easy to use 
 * server components
 * 
 * @param       component       The component where the `ctx` parameter must be fulfilled
 * @returns     The component, without CTX parameter
 */
export function serverContextAware<P = any>(component: ReactServerComponentType<PropsWithContext<P>>) : ComponentType<P>
{
    const BaseComponent = component as ComponentType<PropsWithContext<P>>
    const ServerContextInjector : ComponentType<P> = (props: P) => {
        const ctx = getServerContext()
        return <BaseComponent ctx={ctx} { ...props } />
    }
    ServerContextInjector.displayName = "Server Context Injector"
    return ServerContextInjector
}

/**
 * Client side Optimizely CMS Editable 
 */
export const CmsEditable = serverContextAware(BaseEditable) as CmsEditableComponent


/**
 * Client side Optimizely CMS Content, leveraging the CMS Context to load the
 * content type and content data when needed
 */
export const CmsContent = serverContextAware(BaseCmsContent as unknown as CmsContentBaseComponent) as CmsContentComponent
export type { CmsContentComponent, CmsContentProps } from "./cms-content/rsc"

/**
 * Client side Optimizely CMS Content Area, leveraging the CMS Context to infer
 * the connection to Optimizely Graph and component dictionary.
 */
export const CmsContentArea = cmsContentAware(serverContextAware(BaseContentArea), CmsContent) as CmsContentAreaComponent
export type { CmsContentAreaClassMapper, CmsContentAreaComponent, CmsContentAreaProps, ContentAreaItemDefinition } from "./cms-content-area/index"

/**
 * Client side Optimizely Composition (e.g. Visual Builder), leveraging the CMS
 * Context to infer the connection to Optimizely Graph and component 
 * dictionary.
 */
export const OptimizelyComposition = cmsContentAware(serverContextAware(BaseOptimizelyComposition), CmsContent) as OptimizelyCompositionComponent

/**
 * Client side renderer for Rich Text
 */
export const RichText = BaseRichText as RichTextComponent