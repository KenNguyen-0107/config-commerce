import { create } from "zustand";

type SiteSettings = {
	settings: any; // Thay thế 'any' bằng type cụ thể của settings
	updateSettings: (newSettings: any) => void;
};

export const useSiteSettings = create<SiteSettings>((set) => ({
	settings: null,
	updateSettings: (newSettings) => set({ settings: newSettings }),
}));
