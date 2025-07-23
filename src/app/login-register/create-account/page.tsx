import { getSiteId } from "@/app/config/site-settings";
import { getFirstIfExists } from "@/components/utils";
import { getSdk } from "@/sdk";
import { IAllSettings } from "../types";
import CreateAccountForm from "./CreateAccountForm";
import PasswordConditionContent from "./PasswordConditionContent";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";

export default async function RegisterPage() {
	const sdk = getSdk();
	let settings;

	try {
		settings = getFirstIfExists(
			(await sdk.getSiteSettings({ siteId: await getSiteId() }))?.SettingsCollection?.items
		) as IAllSettings;
	} catch (error) {
		console.error("Failed to fetch site settings:", error);
		return <h4 className="text-center pt-8 pb-8 text-red">Failed to fetch site settings</h4>;
	}

	if (!settings) return null;

	return (
		<div className="bg-muted-background px-4 py-10 lg:py-20">
			<DefaultPageSeo info={{ Title: "Create Account" }} />
			<div className="container">
				<h1 className="text-blue uppercase mb-10 text-3xl lg:text-[40px]">Create an account</h1>
			</div>

			<div className="container grid lg:grid-cols-2">
				<CreateAccountForm settings={settings.AccountSettings || {}} />

				<PasswordConditionContent settings={settings.AccountSettings || {}} />
			</div>
		</div>
	);
}
export const dynamic = "force-static"; // Make sure we cache    pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site a
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache";
