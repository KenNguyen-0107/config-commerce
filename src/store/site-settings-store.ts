import { IAllSettings } from "@/app/login-register/types";
import { ISiteMessage } from "@/gql/graphql";
import { create } from "zustand";

interface Country {
	uri: string;
	id: string;
	name: string;
	abbreviation: string;
	states: {
		uri: string;
		id: string;
		name: string;
		abbreviation: string;
		properties: Record<string, unknown>;
	}[];
	properties: Record<string, unknown>;
}

interface SiteSettingsState {
	countries: Country[];
	setCountries: (countries: Country[]) => void;

	siteMessages: ISiteMessage[];
	siteSettings: IAllSettings;
	setSiteMessages: (siteMessages: ISiteMessage[]) => void;
	setSiteSettings: (siteSettings: IAllSettings) => void;
}

export const useSiteSettingsStore = create<SiteSettingsState>((set) => ({
	countries: [],
	setCountries: (countries) => set({ countries }),
	siteMessages: [],
	setSiteMessages: (siteMessages) => set({ siteMessages }),
	siteSettings: {},
	setSiteSettings: (siteSettings) => set({ siteSettings }),
}));
