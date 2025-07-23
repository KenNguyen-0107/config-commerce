import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/app/utils/cors";
import { HttpMethod } from "@/app/api/clientApi";

interface TokenRequest {
	username: string;
	password: string;
}

export async function POST(request: NextRequest) {
	try {
		const requestBody: TokenRequest = await request.json();

		const tokenUrl = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/identity/connect/token`;

		const tokenParam = new URLSearchParams({
			grant_type: "password",
			username: requestBody.username,
			password: requestBody.password,
			scope: "iscapi offline_access",
		}).toString();

		const tokenResponse = await fetch(tokenUrl, {
			method: HttpMethod.POST,
			headers: {
				Authorization: `Basic ${btoa("isc:009AC476-B28E-4E33-8BAE-B5F103A142BC")}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: tokenParam,
		});

		if (!tokenResponse.ok) {
			const errorText = await tokenResponse.text();
			return NextResponse.json(
				{
					error: "Token request failed",
					status: tokenResponse.status,
					statusText: tokenResponse.statusText,
					details: errorText,
				},
				{
					status: tokenResponse.status,
					headers: corsHeaders,
				}
			);
		}

		const tokenData = await tokenResponse.json();

		return NextResponse.json(tokenData, {
			headers: corsHeaders,
		});
	} catch (error) {
		console.error("Token request error:", error);
		return NextResponse.json(
			{
				error: "Failed to request token",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: 500,
				headers: corsHeaders,
			}
		);
	}
}

export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders });
}
