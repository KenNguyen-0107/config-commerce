import { create } from "zustand";

export enum StockType {
	AVAILABILITY = 0,
	IN_STOCK = 1,
	OUT_OF_STOCK = 2,
	LOW_STOCK = 3,
}

interface IStock {
	productId: string;
	qtyOnHand: number;
	inventoryAvailabilityDtos: {
		unitOfMeasure: string;
		availability: {
			message: null | string;
			messageType: number;
			requiresRealTimeInventory: boolean;
		};
	}[];
}

interface StockState {
	stock: IStock[];
	setStock: (stock: IStock[]) => void;
	mergeStock: (newStock: IStock[]) => void;
	getStockByProductId: (productId: string) => IStock | undefined;
	loading: boolean;
	setLoading: (loading: boolean) => void;
}

export const useStockStore = create<StockState>((set, get) => ({
	stock: [],

	// Keep original setStock for backward compatibility (but it overwrites)
	setStock: (stock: IStock[]) => set({ stock }),

	// New merge function - combines existing stock with new stock
	mergeStock: (newStock: IStock[]) =>
		set((state) => {
			const existingStock = [...state.stock];

			// Create a map of existing stock by productId for quick lookup
			const existingStockMap = new Map(existingStock.map((stock) => [stock.productId, stock]));

			// Update existing stock or add new stock
			newStock.forEach((newStockItem) => {
				existingStockMap.set(newStockItem.productId, newStockItem);
			});

			// Convert back to array
			return { stock: Array.from(existingStockMap.values()) };
		}),

	// Get stock for a specific product
	getStockByProductId: (productId: string) => {
		return get().stock.find((stock) => stock.productId === productId);
	},

	loading: true,
	setLoading: (loading: boolean) => set({ loading }),
}));
