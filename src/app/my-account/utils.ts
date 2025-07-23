import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const validateCurrentSession = async (router: AppRouterInstance) => {
	const reqCurrentSession = await fetch("/api/sessions/current");
	if (!reqCurrentSession.ok) {
		router.push("/");
		return false;
	}

	if (!JSON.parse(await reqCurrentSession.text()).userName) return router.push("/login-register");
	return true;
}