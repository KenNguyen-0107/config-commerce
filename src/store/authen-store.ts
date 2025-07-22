import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface UserInfo {
	userName: string;
	userProfileId: string;
	userLabel: string;
	email: string;
	currency: string;
}

interface AuthenStore {
	userInfo: UserInfo;
	setUserInfo: (userInfo: UserInfo) => void;
	getUserInfo: () => UserInfo;
}

const useAuthenStore = create<AuthenStore>()(
	persist(
		(set, get) => ({
			userInfo: {
				userName: '',
				userProfileId: '',
				userLabel: '',
				email: '',
				currency: ''
			},
			setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
			getUserInfo: () => get().userInfo
		}),
		{
			name: 'authen-storage',
			storage: createJSONStorage(() => sessionStorage)
		}
	)
);

export default useAuthenStore;