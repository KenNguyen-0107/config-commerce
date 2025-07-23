import { HttpMethod } from "@/app/api/clientApi";
import { IOrder } from "@/components/widgets/CommonRecentOrders/types";
import { useOrderHistoryStore } from "@/store/order-history-store";

export interface OrderParams {
	customerSequence?: string;
	sort?: string;
	fromDate?: string;
	pageSize?: string;
	page?: string;
}

export const defaultParams = {
	customerSequence: "-1",
	sort: "orderDate DESC,erpOrderNumber DESC,webOrderNumber DESC",
	page: "1",
	pageSize: "10",
};

export const fetchOrderHistory = async (params?: OrderParams) => {
	const set = useOrderHistoryStore.setState;
	try {
		set({ isLoading: true, error: null });
		const queryParams = new URLSearchParams({ ...defaultParams, ...params }).toString();
		const reqOrders = await fetch(`/api/orders/history?${queryParams}`, {
			method: HttpMethod.GET,
		});

		if (!reqOrders.ok) {
			throw new Error("Failed to fetch orders");
		}
		let resOrders = JSON.parse(await reqOrders.text());
		set({
			orders: Array.from(resOrders.orders as unknown as IOrder[]),
			currentPage: resOrders.pagination.currentPage,
			resultsPerPage: resOrders.pagination.pageSize,
			pageSizeOptions: resOrders.pagination.pageSizeOptions,
			numberOfPages: resOrders.pagination.numberOfPages,
			totalItemCount: resOrders.pagination.totalItemCount,
		});
		return JSON.parse(await reqOrders.text());
	} catch (error) {
		set({ error: error instanceof Error ? error.message : "Failed to fetch orders" });
	} finally {
		set({ isLoading: false });
	}
};

export const preloadOrderHistory = () => {
	void fetchOrderHistory();
};
