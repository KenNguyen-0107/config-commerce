"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ValidateUser = () => {
	const router = useRouter();

	useEffect(() => {
		const validateUserSession = async () => {
			const reqCurrentSession = await fetch("/api/sessions/current");
			if (!reqCurrentSession.ok) {
				router.push("/");
			}
		
			if (!JSON.parse(await reqCurrentSession.text()).userName) {
				return router.push("/login-register");
			}
		}

		validateUserSession();
	}, [router])

	return <></>;
};

export default ValidateUser;