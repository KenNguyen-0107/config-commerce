import { useStockStore } from "@/store/stock-store";
import { useEffect, useState, useRef } from "react";

export const useFetchStock = (productIds: string[], onFetchComplete?: () => void) => {
	const { mergeStock, loading, setLoading } = useStockStore();
	const [error, setError] = useState<string | null>(null);
	const lastFetchedIds = useRef<string[]>([]);

	useEffect(() => {
		const fetchStock = async () => {
			// Filter out empty/invalid product IDs
			const validProductIds = productIds.filter((id) => id && id.trim() !== "");

			if (!validProductIds.length) {
				if (onFetchComplete) onFetchComplete();
				return;
			}

			// Check if we've already fetched for these exact product IDs
			const sortedNewIds = [...validProductIds].sort();
			const sortedLastIds = [...lastFetchedIds.current].sort();

			if (JSON.stringify(sortedNewIds) === JSON.stringify(sortedLastIds)) {
				if (onFetchComplete) onFetchComplete();
				return;
			}

			setError(null);

			try {
				const response = await fetch("/api/realtimeinventory", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ productIds: validProductIds }),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = JSON.parse(await response.text()).realTimeInventoryResults;
				mergeStock(data);
				lastFetchedIds.current = validProductIds;
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch stock");
			} finally {
				setLoading(false);
				if (onFetchComplete) onFetchComplete();
			}
		};

		fetchStock();
	});

	return { loading, error };
};
