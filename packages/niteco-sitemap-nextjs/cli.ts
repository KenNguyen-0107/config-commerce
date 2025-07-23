#!/usr/bin/env node

import { generateSitemaps, type SitemapEntry, type SitemapConfig } from "./index"
import { pingSearchEngines } from "./next-integration"
import * as fs from "fs"
import * as path from "path"

const PACKAGE_NAME = "@niteco/sitemap-nextjs"

function showHelp() {
  console.log(`${PACKAGE_NAME} - A Next.js sitemap generator

Usage:
  sitemap-nextjs generate --input <entries-file> --base-url <url> [options]
  sitemap-nextjs ping --url <sitemap-url> [--google] [--bing] [--yandex]
  sitemap-nextjs --help

Commands:
  generate    Generate sitemap files
  ping        Ping search engines with your sitemap URL
  help        Show this help message

Options for generate:
  --input, -i           Path to JSON file with sitemap entries (required)
  --base-url, -b        Base URL of your website (required)
  --output, -o          Output directory (default: "public")
  --chunk-size, -c      Maximum URLs per sitemap (default: 5000)
  --compress, -z        Compress sitemaps with gzip (default: true)
  --no-compress         Disable sitemap compression
  --update-robots       Update robots.txt (default: true)
  --no-update-robots    Don't update robots.txt
  --robots-path         Path to robots.txt (default: "public/robots.txt")
  --ping                Ping search engines after generation

Options for ping:
  --url                 URL of your sitemap (required)
  --google              Ping Google (default: true)
  --bing                Ping Bing (default: true)
  --yandex              Ping Yandex (default: false)

Examples:
  sitemap-nextjs generate --input entries.json --base-url https://example.com
  sitemap-nextjs ping --url https://example.com/sitemap.xml
`)
}

function parseArgs(args: string[]): Record<string, string | boolean> {
  const result: Record<string, string | boolean> = {}
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    
    if (arg.startsWith("--")) {
      const key = arg.slice(2)
      
      if (key === "no-compress" || key === "no-update-robots") {
        result[key] = true
        continue
      }
      
      if (i + 1 < args.length && !args[i + 1].startsWith("-")) {
        result[key] = args[i + 1]
        i++
      } else {
        result[key] = true
      }
    } else if (arg.startsWith("-")) {
      const key = arg.slice(1)
      
      if (key === "i") result["input"] = args[++i]
      else if (key === "b") result["base-url"] = args[++i]
      else if (key === "o") result["output"] = args[++i]
      else if (key === "c") result["chunk-size"] = args[++i]
      else if (key === "z") result["compress"] = true
    } else {
      result.command = arg
    }
  }
  
  return result
}

async function generate(options: Record<string, string | boolean>) {
  const inputFile = options["input"] as string
  const baseUrl = options["base-url"] as string
  
  if (!inputFile) {
    console.error("Error: Input file is required. Use --input <file>")
    process.exit(1)
  }
  
  if (!baseUrl) {
    console.error("Error: Base URL is required. Use --base-url <url>")
    process.exit(1)
  }
  
  if (!fs.existsSync(inputFile)) {
    console.error(`Error: Input file not found at ${inputFile}`)
    process.exit(1)
  }
  
  const entriesContent = fs.readFileSync(inputFile, "utf-8")
  const entries = JSON.parse(entriesContent) as SitemapEntry[]
  
  const config: SitemapConfig = {
    baseUrl,
    chunkSize: options["chunk-size"] ? parseInt(options["chunk-size"] as string, 10) : 5000,
    compress: options["no-compress"] ? false : options["compress"] !== false,
    updateRobotsTxt: options["no-update-robots"] ? false : options["update-robots"] !== false,
    robotsTxtPath: (options["robots-path"] as string) || "public/robots.txt",
    pingSearchEngines: options["ping"] === true,
  }
  
  console.log(`Generating sitemaps for ${entries.length} entries...`)
  
  const result = await generateSitemaps(entries, config)
  
  console.log(`✅ Successfully generated ${result.totalChunks} sitemap(s) with ${result.totalEntries} entries`)
  console.log(`📄 Main sitemap: ${result.indexPath}`)
  
  if (result.chunks.length > 1) {
    console.log("📃 Sitemap chunks:")
    result.chunks.forEach((chunk) => {
      console.log(`  - ${chunk.filename} (${chunk.entries.length} entries)`)
    })
  }
  
  if (config.pingSearchEngines) {
    console.log("🌐 Pinging search engines...")
    const pingResults = await pingSearchEngines(`${config.baseUrl}/sitemap.xml`)
    
    console.log("Ping results:", pingResults)
  }
  
  console.log("✨ Done!")
}

async function ping(options: Record<string, string | boolean>) {
  const sitemapUrl = options["url"] as string
  
  if (!sitemapUrl) {
    console.error("Error: Sitemap URL is required. Use --url <url>")
    process.exit(1)
  }
  
  console.log(`Pinging search engines with sitemap URL: ${sitemapUrl}`)
  
  const pingOptions = {
    google: options["google"] !== false,
    bing: options["bing"] !== false,
    yandex: options["yandex"] === true,
  }
  
  const results = await pingSearchEngines(sitemapUrl, pingOptions)
  
  console.log("Ping results:", results)
  console.log("✨ Done!")
}

async function main() {
  try {
    const args = process.argv.slice(2)
    
    if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
      showHelp()
      return
    }
    
    const parsedArgs = parseArgs(args)
    const command = parsedArgs.command as string
    
    if (command === "generate") {
      await generate(parsedArgs)
    } else if (command === "ping") {
      await ping(parsedArgs)
    } else {
      console.error(`Error: Unknown command "${command}"`)
      showHelp()
      process.exit(1)
    }
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

main()
