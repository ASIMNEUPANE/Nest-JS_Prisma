import { create } from 'zustand';
import { setToken } from '@/utils/session';
type User = {
    name: string;
    email: string;
    password: string;
    images?: string;
    roles?: string[];
};

type UserStateType = {
    user: User | null;
    isLoggedIn: boolean;
    roles: string[];
};

type UserActionType = {
    setIsLoggedIn: (payload: { user: User }) => void;
    setLogOut: () => void;
};

type UserStoreType = UserStateType & UserActionType;

const initialUserState: UserStateType = {
    user: null,
    isLoggedIn: false,
    roles: [],
};

console.log(initialUserState, 'initialUserState');


export const UserStore = create<UserStoreType>((set) => ({
    ...initialUserState,

    setIsLoggedIn: (payload: { user: User }) => set((state: any) =>

    ({ ...state,
         isLoggedIn: true,
         user: payload.user,
         roles: payload.user.roles || [],
         }
        
    )),
    setLogOut: () => set(initialUserState), // Reset to initial state on logout
}));
