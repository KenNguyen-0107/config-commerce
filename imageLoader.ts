export default function customImageLoader({ src, width }: { src: string; width: number }) {
  // Handle relative URLs and other edge cases
  if (!src) {
    return ""
  }

  // Check if the URL already contains a quality parameter
  if (src.includes("&q=")) {
    // Simply replace the quality parameter
    return src.replace(/&q=\d+/, "&q=60")
  }

  // If it's a standard Next.js image URL without a quality parameter
  if (src.includes("/_next/image") || src.includes("_next/image")) {
    return `${src}${src.includes("?") ? "&" : "?"}q=35`
  }

  // For regular image URLs, create the Next.js image URL structure
  const baseUrl = "/_next/image"
  const encodedUrl = encodeURIComponent(src)
  return `${baseUrl}?url=${encodedUrl}&w=${width}&q=35`
}
