import { useEffect } from "react";
import { useOrderHistoryStore } from "@/store/order-history-store";
import { fetchOrderHistory } from "@/utils/orderUtils";

export const useFetchOrdersHistory = () => {
	const {
		isLoading,
		error,
		orders,
		currentPage,
		resultsPerPage,
		pageSizeOptions,
		numberOfPages,
		totalItemCount,
	} = useOrderHistoryStore();

	const set = useOrderHistoryStore.setState;

	useEffect(() => {
		fetchOrderHistory();
	}, [set]);

	return {
		isLoading,
		error,
		orders,
		currentPage,
		resultsPerPage,
		pageSizeOptions,
		numberOfPages,
		totalItemCount,
	};
};
