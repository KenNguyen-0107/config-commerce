import { getSdk as getGeneratedSdk, type Sdk } from "@/gql";
import { getServerClient } from "@packages/optimizely-cms-nextjs";
import { getServerContext } from "@packages/optimizely-cms-react/rsc";
import { type IOptiGraphClient } from "@packages/optimizely-graph";
import { cache } from "react";

/**
 * Get an instance of the SDK generated from the queries within the frontend.
 *
 * @returns     The SDK Instance
 */

export const isCache = true;

export const getSdk = cache<() => Sdk>(() => {
	const ctx = getServerContext();

	if (!ctx.client) ctx.setOptimizelyGraphClient(getServerClient());

	ctx.client?.updateFlags({
		cache: isCache,
		stored: false,
	});
	return getGeneratedSdk(ctx.client as IOptiGraphClient);
});
