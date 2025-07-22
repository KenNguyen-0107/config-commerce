"use server"

import { getSdk } from "@/sdk"

export async function SearchByKeyword(keyword: string) {
	const result = await getSdk().getProductByKeyword({ keyword: keyword })
	return result?.Product?.items || undefined
}