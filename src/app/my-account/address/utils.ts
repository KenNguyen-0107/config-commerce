export const updateDefaultShippToId = async (billToId: string, shipToId: string) => {
	const reqUpdate = await fetch("/api/sessions/current", {
		method: "PATCH",
		body: JSON.stringify({
			billTo: {
				id: billToId,
			},
			customerWasUpdated: true,
			shipTo: {
				id: shipToId,
			},
		}),
	})

	if (!reqUpdate.ok) {
		throw new Error("Failed to update default shipping address")
	}
}