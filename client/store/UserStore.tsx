import { create } from 'zustand'

type user = {
    name: string,
    email: string,
    password: string,
    images?: string,
    roles?: string[],

}
type UserStateType = {
    user: user | null,
    isLoggedIn: boolean,
    roles: string[],
}
type UserActionType = {
    setIsLoggedIn: (payload: user) => void,
    setLogOut: () => void,

}
type UserStoreType = UserStateType & UserActionType
const initialUserState: UserStateType = {
    user: null,
    isLoggedIn: false,
    roles: [],
};

export const UserStore = create<UserStoreType>((set) => ({
    ...initialUserState,

    setIsLoggedIn: (payload: user) => set((state: any) => ({ ...state, isLoggedIn: true, user: payload, roles: payload.roles })),
    setLogOut: () => set(initialUserState), // Reset to initial state on logout
}
))