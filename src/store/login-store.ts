import { create } from "zustand";

interface LoginState {
  account: IAccount;
}
interface LoginAction {
  updateAccount: (account: IAccount) => void;
  resetStore: () => void;
}

interface IAccount {
    id?: string;
    billToId?: string;
    shipToId?: string;
    isLogin?: boolean;
}

export const useLogin = create<LoginAction & LoginState>((set) => ({
  account: {},
  updateAccount: (account) => set((state) => ({
    account: {
      ...state.account,
      ...account
    }
  })),
  resetStore: () => {
    set({
      account: {
        id: "",
        billToId: "",
        shipToId: "",
        isLogin: false,
      },
    });
  },
}));
