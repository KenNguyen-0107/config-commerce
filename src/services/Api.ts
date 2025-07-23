import { BaseModel } from "./ApiModels";
import { ApiParameter, Dictionary } from "./types";
const SITE_HOST =
	process.env.NEXT_PUBLIC_SITE_HOST || "https://jacksonsfencing-configcommerce-d-cl.niteco.dev";
export const API_BASE_URL = `${SITE_HOST}/api/v1`;
// export const API_BASE_URL = "http://localhost:8010/proxy"
export const API_URL_CURRENT_FRAGMENT = "current";

export const API_CART_FRAGMENT = "carts";
export const API_CARTLINE_FRAGMENT = "cartlines";

export const rawRequest = async (
	endpoint: string,
	method = "GET",
	headers: Dictionary<string> = {},
	body?: string | FormData,
	isStatusOkay: (status: number) => boolean = (status) => status >= 200 && status < 300,
	cache: RequestInit["cache"] = "no-cache"
) => {
	const requestInit: RequestInit = {
		method,
		headers,
		cache,
	};

	if (body) {
		requestInit.body = body;
	}

	const response = await fetch(endpoint, requestInit);
	console.log({ response });

	if (!isStatusOkay(response.status)) {
		throw new Error(response.statusText);
	}

	return response;
};

export async function request<T>(
	endpoint: string,
	method: string,
	headers: Dictionary<string> = { "X-Requested-With": "XMLHttpRequest" },
	body?: string | FormData,
	isStatusOkay?: (status: number) => boolean,
	cache: RequestInit["cache"] = "no-cache"
) {
	const response = await rawRequest(endpoint, method, headers, body, isStatusOkay, cache);

	try {
		return (await response.json()) as Promise<T>;
	} catch {
		return {} as Promise<T>;
	}
}

export function get<T>(
	endpoint: string,
	parameter: ApiParameter = {},
	queryStringParameters: Dictionary<any> = {},
	cache: RequestInit["cache"] = "no-cache"
) {
	let queryString = "";
	const combinedQueryString: Dictionary<any> = {
		...parameter,
		...parameter.additionalQueryStringParameters,
		...queryStringParameters,
	};

	const additionalExpands = combinedQueryString["additionalExpands"];
	if (additionalExpands) {
		if (!combinedQueryString["expand"]) {
			combinedQueryString["expand"] = [];
		}
		combinedQueryString["expand"] = combinedQueryString["expand"].concat(additionalExpands);
		delete combinedQueryString["additionalExpands"];
	}

	for (const key in combinedQueryString) {
		if (key !== "additionalQueryStringParameters" && combinedQueryString[key] !== undefined) {
			if (
				key !== "expand" &&
				key !== "exclude" &&
				key !== "includeAttributes" &&
				Array.isArray(combinedQueryString[key])
			) {
				// WebApi requires arrays to be split into individual query string values
				combinedQueryString[key].forEach((p: string) => {
					queryString += `${key}=${encodeURIComponent(p)}&`;
				});
			} else {
				queryString += `${key}=${encodeURIComponent(combinedQueryString[key])}&`;
			}
		}
	}

	if (queryString !== "") {
		queryString =
			(endpoint.indexOf("?") < 0 ? "?" : "&") + queryString.substr(0, queryString.length - 1);
	}

	return request<T>(endpoint + queryString, "GET", undefined, undefined, undefined, cache);
}

export function post<Parameter, Result = Parameter>(endpoint: string, model?: Parameter) {
	return request<Result>(
		endpoint,
		"POST",
		{ "Content-Type": "application/json" },
		model ? JSON.stringify(model) : undefined
	);
}

export function patch<T extends BaseModel>(endpoint: string, model: Partial<T> | T) {
	return request<T>(
		endpoint,
		"PATCH",
		{ "Content-Type": "application/json" },
		JSON.stringify(model)
	);
}

export function del(endpoint: string, isStatusOkay?: (status: number) => boolean) {
	return requestVoid(
		endpoint,
		"DELETE",
		{ "Content-Type": "application/json" },
		undefined,
		isStatusOkay
	);
}

export async function requestVoid(
	endpoint: string,
	method: string,
	headers: Dictionary<string> = {},
	body?: string,
	isStatusOkay?: (status: number) => boolean
) {
	await rawRequest(endpoint, method, headers, body, isStatusOkay ?? ((status) => status === 204));
}

export function doesNotHaveExpand(
	parameter: { expand?: string[]; additionalExpands?: string[] } | undefined,
	value: string
) {
	return (
		!parameter ||
		((!parameter.expand ||
			parameter.expand.filter((o) => o.toLowerCase() === value.toLowerCase()).length === 0) &&
			(!parameter.additionalExpands ||
				parameter.additionalExpands.filter((o) => o.toLowerCase() === value.toLowerCase())
					.length === 0))
	);
}
