import { create } from 'zustand';

interface CurrentOrder {
	id: string;
	// Add other fields as needed
}

interface CurrentOrderState {
	currentOrder: CurrentOrder;
	setCurrentOrder: (order: CurrentOrder) => void;
	updateCustomerNumber: (customerNumber: string) => void;
}

const useCurrentOrderStore = create<CurrentOrderState>((set) => ({
	currentOrder: { id: '' },
	setCurrentOrder: (order) => set({ currentOrder: order }),
	updateCustomerNumber: (id) =>
		set((state) => ({
			currentOrder: { ...state.currentOrder, id },
		})),
}));

export default useCurrentOrderStore;