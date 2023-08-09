import { atom } from 'recoil';

export const activeView = atom({
    key: 'activeView',
    default: 'issue',
});
