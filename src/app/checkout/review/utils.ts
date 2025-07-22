export const getValidateCurrentSession = async () => {
	const getAuth = await fetch("/api/account/isauthenticated", {
		method: "GET",
	});
	if (getAuth.status !== 200) return {};

	const reqCurrentSession = await fetch("/api/sessions/current")
	const resCurrentSession = await reqCurrentSession.text()
	if (JSON.parse(resCurrentSession).billTo) {
		return  JSON.parse(resCurrentSession)
	}

	const reqCreateAccountIfNotExisted = await fetch("/api/account/create", {
		method: "POST",
		body: JSON.stringify({
			defaultFulfillmentMethod: "Ship",
			isGuest: true,
		}),
	}).catch(err => {
		throw new Error("Generated new account failed.", err);
	})

	if (reqCreateAccountIfNotExisted.status !== 200) return {};
	const resCreateAccountIfNotExisted = await reqCreateAccountIfNotExisted.text()
	if (!!JSON.parse(resCreateAccountIfNotExisted).billToId) {
		return JSON.parse(resCreateAccountIfNotExisted)
	}

	const getCurrentSession = await fetch("/api/sessions/current")
	if (getCurrentSession.status !== 200) return {};
	return JSON.parse(await getCurrentSession.text())
}