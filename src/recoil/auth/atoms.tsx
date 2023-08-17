import { atom } from 'recoil';

export const isAuthenticatedState = atom({
  key: 'authenticated',
  default: typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') !== null : false,
});

export const tokensState = atom({
  key: 'tokens',
  default: {
    accessToken: typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null,
    refreshToken: typeof window !== 'undefined' ? sessionStorage.getItem('refreshToken') : null
  },
});