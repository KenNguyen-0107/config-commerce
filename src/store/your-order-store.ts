import { CartLine } from "@/components/widgets/Product/types";
import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface IOrderInfo {
  orderDate: string;
  orderCode: string;
  status: string;
  cartLines: CartLine[]
};
export interface IYourOrder {
  yourOrder: IOrderInfo;
  updateYourOrder: (data: IOrderInfo) => void
}

const cartStoreCreator: StateCreator<
  IYourOrder,
  [],
  [["zustand/persist", unknown]]
> = (set, get) => ({
  yourOrder: {
    orderDate: "",
    orderCode: "",
    status: "",
    cartLines: []
  },
  updateYourOrder: (data: IOrderInfo) => {
    set((state) => ({
      yourOrder: {
        ...state.yourOrder,
        ...data,
      },
    }));
  },
});

// Use the state creator with persist
export const useYourOrderStore = create<IYourOrder>()(
  persist(cartStoreCreator, {
    name: "account-storage",
    storage: createJSONStorage(() => localStorage),
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...(persistedState as IYourOrder),
    }),
  })
);
