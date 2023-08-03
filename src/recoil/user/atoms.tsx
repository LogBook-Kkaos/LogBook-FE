import { atom } from "recoil";
import { User } from "src/recoil/user/User";

export const userState = atom<User>({
    key: 'userState',
    default: {
        userId: 0,
        userName: '',
        email: '',
        password: '',
        department: '',
    },
})

export const loginUserState = atom({
    key: 'loginUserState',
    default: {
        userName: typeof window !== 'undefined' ? sessionStorage.getItem('userName') : null,
        email: typeof window !== 'undefined' ? sessionStorage.getItem('email') : null,
        department: typeof window !== 'undefined' ? sessionStorage.getItem('department') : null,
    }
})