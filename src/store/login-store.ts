import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface IAccount {
  account: {
    id: string,
    billToId: string,
    shipToId: string,
  };
}

const cartStoreCreator: StateCreator<
IAccount,
  [],
  [["zustand/persist", unknown]]
> = (set, get) => ({
  account: {
    id: '6cd6501e-afcf-4ae2-a4e4-b2990035e027',
    billToId: '30485933-6cd5-47b4-a567-b2990035e02a',
    shipToId: '30485933-6cd5-47b4-a567-b2990035e02a',
  },
  updateAccount: (data: IAccount) => {
    set((state) => ({
      account: {
        ...state.account,
        ...data
      }
    }))
  }
});

// Use the state creator with persist
export const useAccountStore = create<IAccount>()(
  persist(cartStoreCreator, {
    name: "account-storage",
    storage: createJSONStorage(() => localStorage),
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...(persistedState as IAccount),
    }),
  })
);
