import { generateSitemaps, type SitemapEntry, type SitemapConfig } from "../index"
import * as fs from "fs"
import * as path from "path"

// Mock fs and path modules
jest.mock("fs")
jest.mock("path")

describe("generateSitemaps", () => {
  beforeEach(() => {
    // Reset mocks
    jest.resetAllMocks()

    // Mock path.join to return the second argument
    jest.spyOn(path, "join").mockImplementation((_, filename) => filename)

    // Mock path.dirname to return the directory part of a path
    jest.spyOn(path, "dirname").mockImplementation((p) => p.split("/").slice(0, -1).join("/") || ".")

    // Mock path.resolve to return the second argument
    jest.spyOn(path, "resolve").mockImplementation((_, p) => p)

    // Mock fs.existsSync to return false
    jest.spyOn(fs, "existsSync").mockReturnValue(false)

    // Mock fs.mkdirSync to do nothing
    jest.spyOn(fs, "mkdirSync").mockImplementation(() => undefined)

    // Mock fs.writeFileSync to do nothing
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => undefined)
  })

  it("should generate a single sitemap for a small number of entries", async () => {
    // Mock writeFile to do nothing
    jest.spyOn(fs, "writeFile").mockImplementation((_, __, callback) => {
      if (callback) {
        callback(null)
      }
      return undefined as any
    })

    // Mock updateRobotsTxt to do nothing
    jest.spyOn(fs, "readFileSync").mockReturnValue("")

    const entries: SitemapEntry[] = [
      {
        urlSlug: "about",
        lastModified: new Date().toISOString(),
        changefreq: "monthly",
        priority: "0.8",
      },
      {
        urlSlug: "contact",
        lastModified: new Date().toISOString(),
        changefreq: "monthly",
        priority: "0.7",
      },
    ]

    const config: SitemapConfig = {
      baseUrl: "https://example.com",
      compress: false,
      updateRobotsTxt: false,
    }

    const result = await generateSitemaps(entries, config)

    expect(result.totalEntries).toBe(2)
    expect(result.totalChunks).toBe(1)
  })

  it("should throw an error for invalid entries", async () => {
    const entries: any[] = [
      {
        // Missing urlSlug
        lastModified: new Date().toISOString(),
        changefreq: "monthly",
        priority: "0.8",
      },
    ]

    const config: SitemapConfig = {
      baseUrl: "https://example.com",
    }

    await expect(generateSitemaps(entries, config)).rejects.toThrow()
  })
})
