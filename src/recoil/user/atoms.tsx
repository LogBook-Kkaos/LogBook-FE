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