"use client";

import { IAllSettings } from "@/app/login-register/types";
import { ISiteMessage } from "@/gql/graphql";
import { useSiteSettingsStore } from "@/store/site-settings-store";
import { useEffect } from "react";

const SiteSettingsContent = ({
	messageData,
	settings,
}: {
	messageData: ISiteMessage[];
	settings: IAllSettings;
}) => {
	const { setSiteMessages, setSiteSettings } = useSiteSettingsStore();

	useEffect(() => {
		if (messageData?.length < 1) {
			setSiteMessages(messageData);
		}
		if (!!settings) {
			setSiteSettings(settings);
		}
	}, [messageData, setSiteMessages]);

	return <></>;
};

export default SiteSettingsContent;
