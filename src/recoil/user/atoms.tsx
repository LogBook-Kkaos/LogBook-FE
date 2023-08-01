import { atom } from "recoil";
import { User } from "src/recoil/user/User";

export const userState = atom<User>({
    key: 'userState',
    default: {
        userId: 0,
        username: '',
        email: '',
        password: '',
        department: '',
    },
})