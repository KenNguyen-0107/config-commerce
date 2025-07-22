"use client";

import { useEffect, useState } from "react";

const CreateGuestSession = () => {
	const [hasCreatedSession, setHasCreatedSession] = useState(false);

	useEffect(() => {
		const createSession = async () => {
			if (!!hasCreatedSession) return;
			
			const getAuth = await fetch("/api/account/isauthenticated", {
				method: "GET",
			});
			if (getAuth.status !== 200) return;

			const reqSession = await fetch("/api/account/create", {
				method: "POST",
				body: JSON.stringify({
					defaultFulfillmentMethod: "Ship",
					isGuest: true,
				}),
			}).catch(err => {
				throw new Error("Generated new account failed.", err);
			});

			if (reqSession.status!== 200) return;
			setHasCreatedSession(true);
		};

		return () => {
			createSession();
		}
	}, [hasCreatedSession]);

	return <></>;
};

export default CreateGuestSession;
