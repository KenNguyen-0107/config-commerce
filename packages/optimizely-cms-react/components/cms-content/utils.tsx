import { type ComponentType } from "react";
import { type CmsContentComponent, type PropsWithCmsContent } from "./types";

export function cmsContentAware<P = any>(component: ComponentType<PropsWithCmsContent<P>>, cmsContentComponent: CmsContentComponent) : ComponentType<P>
{
    const BaseComponent = component
    return (props: P) => <BaseComponent cmsContent={cmsContentComponent} { ...props } />
}