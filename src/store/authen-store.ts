import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
export interface UserInfo {
	userName?: string;
	userProfileId?: string;
	userLabel?: string;
	email?: string;
	currency?: string;
	billTo?: string;
}

interface AuthenStore {
	userInfo: UserInfo;
	isLogin: boolean;
	setUserInfo: (userInfo: UserInfo) => void;
	resetUserInfo: () => void;
	getUserInfo: () => UserInfo;
	setIsLogin: (isLogin: boolean) => void;
}

const useAuthenStore = create<AuthenStore>()(
	persist(
		(set, get) => ({
			userInfo: {
				userName: '',
				userProfileId: '',
				userLabel: '',
				email: '',
				currency: '',
				billTo: '',
			},
			isLogin: false,
			setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
			resetUserInfo: () => set({
					userInfo: {
							userName: '',
							userProfileId: '',
							userLabel: '',
							email: '',
							currency: '',
							billTo: '',
					}
			}),
			setIsLogin: (isLogin: boolean) => set({ isLogin }),
			getUserInfo: () => get().userInfo
		}),
		{
			name: 'authen-storage',
			storage: createJSONStorage(() => sessionStorage)
		}
	)
);

export default useAuthenStore;