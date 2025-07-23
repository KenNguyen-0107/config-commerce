import { IOrder } from "@/components/widgets/CommonRecentOrders/types";
import { create } from "zustand";
import { OrderDetail } from "./order-detail";
import { IAddress } from "@/app/my-account/address/types";

export type SortField = "order" | "total" | "poNumber" | "date" | "status" | "address" | undefined;

interface OrderHistoryState {
	orders: IOrder[];
	orderItem: OrderDetail;
	isLoading: boolean;
	totalItemCount: number;
	error: string | null;
	currentPage: number;
	resultsPerPage: number;
	searchTerm: string;
	sortField: SortField;
	sortDirection: "asc" | "desc";
	pageSizeOptions: number[];
	isPageSizeOptionsOpen: boolean;
	numberOfPages: number;
	currentShipping: IAddress;
	currentBilling: IAddress;
}

interface OrderHistoryActions {
	storeCurrentShipping: (address: IAddress) => void;
	storeCurrentBilling: (address: IAddress) => void;
	setOrders: (orders: IOrder[]) => void;
	setOrderItem: (orderItem: OrderDetail) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	setCurrentPage: (page: number) => void;
	setResultsPerPage: (items: number) => void;
	setTotalItemCount: (items: number) => void;
	setSearchTerm: (term: string) => void;
	setSortField: (field: SortField) => void;
	setSortDirection: (direction: "asc" | "desc") => void;
	resetStore: () => void;
	setPageSizeOptions: (options: number[]) => void;
	setIsPageSizeOptionsOpen: (isOpen: boolean) => void;
	setNumberOfPages: (numberOfPages: number) => void;
}

export const useOrderHistoryStore = create<OrderHistoryState & OrderHistoryActions>((set) => ({
	orders: [],
	orderItem: {},
	isLoading: true,
	error: null,
	currentPage: 1,
	resultsPerPage: 10,
	totalItems: 0,
	totalItemCount: 0,
	numberOfPages: 1,
	searchTerm: "",
	sortField: "date",
	sortDirection: "desc",
	pageSizeOptions: [8, 16, 24, 32],
	isPageSizeOptionsOpen: false,
	currentShipping: {},
	currentBilling: {},

	storeCurrentShipping: (currentShipping) => set({ currentShipping }),
	storeCurrentBilling: (currentBilling) => set({ currentBilling }),
	setOrders: (orders) => set({ orders }),
	setOrderItem: (orderItem) => set({ orderItem }),
	setLoading: (loading) => set({ isLoading: loading }),
	setError: (error) => set({ error }),
	setCurrentPage: (page) => set({ currentPage: page }),
	setResultsPerPage: (items) => set({ resultsPerPage: items }),
	setSearchTerm: (term) => set({ searchTerm: term }),
	setSortField: (field: SortField) => set({ sortField: field }),
	setSortDirection: (direction) => set({ sortDirection: direction }),
	setPageSizeOptions: (options) => set({ pageSizeOptions: options }),
	setIsPageSizeOptionsOpen: (isOpen) => set({ isPageSizeOptionsOpen: isOpen }),
	setNumberOfPages: (numberOfPages) => set({ numberOfPages: numberOfPages }),
	setTotalItemCount: (totalItemCount) => set({ totalItemCount: totalItemCount }),

	resetStore: () => {
		set({
			orders: [],
			isLoading: false,
			error: null,
			currentPage: 1,
			totalItemCount: 0,
			resultsPerPage: 10,
			searchTerm: "",
			sortField: "date",
			sortDirection: "desc",
		});
	},
}));
