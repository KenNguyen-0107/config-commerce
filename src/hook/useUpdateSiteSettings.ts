import { useSiteSettingsStore } from '@/store/site-settings-store';
import { useCallback } from 'react';

export const useUpdateSiteSettings = () => {
  const { setCountries } = useSiteSettingsStore();

  const fetchCountriesData = useCallback(async () => {
    try {
      const response = await fetch("/api/website/countries");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCountries(data.countries);
    } catch (error) {
      throw new Error(`Failed to fetch countries: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [setCountries]);

  return { fetchCountriesData };
};
