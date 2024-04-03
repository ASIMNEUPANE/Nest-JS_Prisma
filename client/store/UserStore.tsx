import { create } from 'zustand'


const user = {
    user: {},
    isLoggedIn: false,
    roles: [],
}
const UserStore = create((set) => ({
    user,
 

    setIsloggedIn: () => set((state: any) => ({ sta: state.payload }))
}
))