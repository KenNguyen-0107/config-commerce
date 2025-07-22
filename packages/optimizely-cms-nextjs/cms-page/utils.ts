import type { ChannelDefinition } from "@packages/optimizely-graph"
import { localeToGraphLocale as coreLocaleToGraphLocale } from "@packages/optimizely-graph"

// Extract the path as string array from a given URL
export function urlToPath(baseUrl: URL, language?: string) : string[] {
    const slugs : string[] = baseUrl.pathname.split('/').filter(s => s)
    if (language && slugs[0] == language)
        return slugs.slice(1)
    return slugs
}

/**
 * Transform a locale to an Optimizely Graph locale, defaulting to the lookup
 * table in the Channel definition, falling back to the programmatic approach
 * after.
 * 
 * @param locale 
 * @param channel
 * @returns 
 */
export function localeToGraphLocale(locale: string, channel?: ChannelDefinition) : string
{
    return channel?.localeToGraphLocale(locale) ?? coreLocaleToGraphLocale(locale)
}

export function slugToLocale<T extends string | undefined | null>(channel: ChannelDefinition | undefined, slug: string | null, defaultValue: T) : string | T
{
    if (!slug) return defaultValue
    if (!channel) {
        const parsedSlug = slug.replaceAll('_','-').split('-').map((x,i) => i == 1 ? x.toUpperCase() : x.toLowerCase()).join('-')
        return parsedSlug
    }
    const locale = channel.slugToLocale(slug)
    return locale || defaultValue?.replaceAll("_","-") as T
}

export function slugToGraphLocale<T extends string | undefined | null>(channel: ChannelDefinition | undefined, slug: string | null, defaultValue: T) : string | T
{
    if (!slug) return defaultValue
    if (!channel) {
        const parsedSlug = slug.replaceAll('_','-').split('-').map((x,i) => i == 1 ? x.toUpperCase() : x.toLowerCase()).join('_')
        return parsedSlug
    }
    const graphLocale = channel.slugToGraphLocale(slug)
    return graphLocale || defaultValue?.replaceAll("-","_") as T
}

export function localeToSlug<T>(channel: ChannelDefinition | undefined, locale: T) : string
{
    const baseSlug = (locale as string).toLowerCase().replaceAll('_','-')
    if (!channel)
        return baseSlug
    return channel.localeToSlug(locale as string) ?? baseSlug
}