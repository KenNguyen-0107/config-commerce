"use client"

interface ICloudflareLoader {
	src: string;
	width: string | number;
	quality: string | number;
}

// Docs: https://developers.cloudflare.com/images/transform-images
export default function cloudflareLoader({ src, width, quality } : ICloudflareLoader) {
	const baseUrl = 'https://jacksonsfencing-configcommerce-d-cl.niteco.dev';
	
	const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;

  const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"]

  return `${baseUrl}/${normalizedSrc}/${params.join(",")}`;
}