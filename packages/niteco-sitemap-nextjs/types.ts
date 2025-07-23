/**
 * Valid change frequency values for sitemap entries
 */
export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"

/**
 * Interface for alternate language entries in the sitemap
 */
export interface AlternateLanguages {
  /**
   * Map of language codes to URLs
   * @example { "en-us": "https://example.com/about", "es": "https://example.com/es/about" }
   */
  languages: Record<string, string>
}

/**
 * Interface for image entries in the sitemap
 */
export interface ImageEntry {
  /**
   * The URL of the image
   */
  loc: string

  /**
   * Optional caption for the image
   */
  caption?: string

  /**
   * Optional title for the image
   */
  title?: string
}

/**
 * Interface for video entries in the sitemap
 */
export interface VideoEntry {
  /**
   * The title of the video
   */
  title: string

  /**
   * The URL of the video thumbnail
   */
  thumbnail_loc: string | { href: string }

  /**
   * The description of the video
   */
  description: string

  /**
   * Optional content location (URL of the actual video file)
   */
  content_loc?: string | { href: string }

  /**
   * Optional player location (URL of the player)
   */
  player_loc?: string | { href: string }

  /**
   * Optional duration of the video in seconds
   */
  duration?: number

  /**
   * Optional view count of the video
   */
  view_count?: number

  /**
   * Optional tag for the video
   */
  tag?: string

  /**
   * Optional rating of the video (0.0 to 5.0)
   */
  rating?: number

  /**
   * Optional expiration date of the video
   */
  expiration_date?: string | Date

  /**
   * Optional publication date of the video
   */
  publication_date?: string | Date

  /**
   * Optional flag indicating if the video is family friendly
   */
  family_friendly?: boolean

  /**
   * Optional flag indicating if the video requires subscription
   */
  requires_subscription?: boolean

  /**
   * Optional flag indicating if the video is live
   */
  live?: boolean

  /**
   * Optional restriction for the video
   */
  restriction?: { 
    /**
     * The relationship type for the restriction
     */
    relationship: string
    /**
     * The content of the restriction
     */
    content: string 
  }

  /**
   * Optional platform information for the video
   */
  platform?: { 
    /**
     * The relationship type for the platform
     */
    relationship: string
    /**
     * The content of the platform restriction
     */
    content: string 
  }

  /**
   * Optional uploader information
   */
  uploader?: { 
    /**
     * The name of the uploader
     */
    name: string
    /**
     * Optional additional info about the uploader
     */
    info?: string 
  }
}

/**
 * Represents a single entry in the sitemap
 */
export interface SitemapEntry {
  /**
   * The URL slug or full URL of the page
   * @example "about" or "https://example.com/about"
   */
  urlSlug: string

  /**
   * The last modified date of the page in ISO 8601 format
   * @example "2023-04-06T15:02:24.021Z"
   */
  lastModified: string

  /**
   * How frequently the page is likely to change
   */
  changefreq: ChangeFrequency

  /**
   * The priority of this URL relative to other URLs on your site (0.0 to 1.0)
   */
  priority: string

  /**
   * Alternate language versions of the page
   */
  alternates?: AlternateLanguages

  /**
   * Optional images associated with this URL (for image sitemaps)
   */
  images?: ImageEntry[]

  /**
   * Optional videos associated with this URL (for video sitemaps)
   */
  videos?: VideoEntry[]
}

/**
 * Configuration options for the sitemap generator
 */
export interface SitemapConfig {
  /**
   * Base URL of your website
   * @example "https://example.com"
   */
  baseUrl: string

  /**
   * Maximum number of URLs per sitemap
   * @default 5000
   */
  chunkSize?: number

  /**
   * Whether to compress sitemaps with gzip
   * @default true
   */
  compress?: boolean

  /**
   * Whether to update robots.txt with sitemap URL
   * @default true
   */
  updateRobotsTxt?: boolean

  /**
   * Path to robots.txt
   * @default "public/robots.txt"
   */
  robotsTxtPath?: string

  /**
   * Whether to ping search engines after generation
   * @default false
   */
  pingSearchEngines?: boolean

  /**
   * Custom XML namespace declarations to add to the sitemap
   */
  customNamespaces?: Record<string, string>
}

/**
 * Represents a sitemap chunk
 */
export interface SitemapChunk {
  /**
   * The filename of the chunk
   * @example "sitemap-0.xml"
   */
  filename: string

  /**
   * The entries in this chunk
   */
  entries: SitemapEntry[]

  /**
   * The last modified date of this chunk
   */
  lastModified: string
}

/**
 * Search engine ping options
 */
export interface SearchEnginePingOptions {
  /**
   * Whether to ping Google
   * @default true
   */
  google?: boolean

  /**
   * Whether to ping Bing
   * @default true
   */
  bing?: boolean

  /**
   * Whether to ping Yandex
   * @default false
   */
  yandex?: boolean
}

/**
 * Next.js fetch options extending the standard RequestInit
 */
export interface NextFetchRequestConfig extends RequestInit {
	next?: {
		revalidate?: number;
		tags?: string[];
	};
}

/**
 * Custom error class for sitemap validation errors
 */
export class SitemapValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "SitemapValidationError"
  }
}

// Cache tag for sitemaps
export const SITEMAP_CACHE_TAG = "sitemaps";