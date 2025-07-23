export const getValidateCurrentSession = async () => {
  const getAuth = await fetch("/api/account/isauthenticated", {
    method: "GET",
  });
  if (getAuth.status !== 200) return {};

	const reqCurrentSession = await fetch("/api/sessions/current")
	const resCurrentSession = await reqCurrentSession.text()
	if (!!JSON.parse(resCurrentSession).billTo) {
		return JSON.parse(resCurrentSession)
	}

	if (!JSON.parse(resCurrentSession).userName) {
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
			const createdAccountData =  JSON.parse(resCreateAccountIfNotExisted)
			await fetch("/api/sessions/manage", {
				method: "POST",
				body: JSON.stringify({
					password: createdAccountData.password,
					email: createdAccountData.email,
					isSubscribed: createdAccountData.isSubscribed,
					userName: createdAccountData.userName,
				}),
			});
		}
	}

	const getCurrentSession = await fetch("/api/sessions/current")
	if (getCurrentSession.status !== 200) return {};
	return JSON.parse(await getCurrentSession.text())
}

export const mergeSession = async (data: Record<string, any>) => {
	const reqMergeSession = await fetch("/api/sessions/manage", {
		method: "PATCH",
		body: JSON.stringify(data),
	})
	if (!reqMergeSession.ok) return {};
	const getCurrentSession = await fetch("/api/sessions/current")
	if (!getCurrentSession.ok) return {};
	return JSON.parse(await getCurrentSession.text())
}
