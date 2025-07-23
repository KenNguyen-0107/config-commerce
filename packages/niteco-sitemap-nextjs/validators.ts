import type { SitemapEntry } from "./types"
import { SitemapValidationError } from "./types"
import { isValidChangeFrequency, isValidPriority, isValidDate } from "./sitemap-builder"

/**
 * Validates sitemap entries
 * @param entries The entries to validate
 * @throws {SitemapValidationError} If any entry is invalid
 */
export function validateSitemapEntries(entries: SitemapEntry[]): void {
  if (!Array.isArray(entries)) {
    throw new SitemapValidationError("Sitemap entries must be an array")
  }

  for (let i = 0; i < entries.length; i++) {
    try {
      validateSitemapEntry(entries[i])
    } catch (error) {
      throw new SitemapValidationError(
        `Entry at index ${i} is invalid: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }
}

/**
 * Validates a single sitemap entry
 * @param entry The entry to validate
 * @throws {SitemapValidationError} If the entry is invalid
 */
export function validateSitemapEntry(entry: SitemapEntry): void {
  if (!entry) {
    throw new SitemapValidationError("Entry cannot be null or undefined")
  }

  if (!entry.urlSlug) {
    throw new SitemapValidationError("URL slug is required for sitemap entry")
  }

  if (!entry.lastModified) {
    throw new SitemapValidationError("Last modified date is required for sitemap entry")
  }

  if (!isValidDate(entry.lastModified)) {
    throw new SitemapValidationError(`Invalid last modified date: ${entry.lastModified}`)
  }

  if (!entry.changefreq) {
    throw new SitemapValidationError("Change frequency is required for sitemap entry")
  }

  if (!isValidChangeFrequency(entry.changefreq)) {
    throw new SitemapValidationError(
      `Invalid change frequency: ${entry.changefreq}. Must be one of: always, hourly, daily, weekly, monthly, yearly, never`,
    )
  }

  if (!entry.priority) {
    throw new SitemapValidationError("Priority is required for sitemap entry")
  }

  if (!isValidPriority(entry.priority)) {
    throw new SitemapValidationError(`Invalid priority: ${entry.priority}. Must be a number between 0.0 and 1.0`)
  }

  if (entry.alternates) {
    if (!entry.alternates.languages || typeof entry.alternates.languages !== "object") {
      throw new SitemapValidationError("Alternates languages must be an object")
    }

    for (const [lang, url] of Object.entries(entry.alternates.languages)) {
      if (!lang) {
        throw new SitemapValidationError("Language code is required for alternate")
      }

      if (!url) {
        throw new SitemapValidationError(`URL is required for alternate language: ${lang}`)
      }
    }
  }

  if (entry.images) {
    if (!Array.isArray(entry.images)) {
      throw new SitemapValidationError("Images must be an array")
    }

    for (let i = 0; i < entry.images.length; i++) {
      const image = entry.images[i]
      if (!image.loc) {
        throw new SitemapValidationError(`Image at index ${i} is missing required 'loc' property`)
      }
    }
  }

  if (entry.videos) {
    if (!Array.isArray(entry.videos)) {
      throw new SitemapValidationError("Videos must be an array")
    }

    for (let i = 0; i < entry.videos.length; i++) {
      const video = entry.videos[i]
      if (!video.title) {
        throw new SitemapValidationError(`Video at index ${i} is missing required 'title' property`)
      }
      if (!video.thumbnail_loc) {
        throw new SitemapValidationError(`Video at index ${i} is missing required 'thumbnail_loc' property`)
      }
      if (!video.description) {
        throw new SitemapValidationError(`Video at index ${i} is missing required 'description' property`)
      }
    }
  }
}