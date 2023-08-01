import { atom } from "recoil";

export const tokensState = atom({
  key: "tokensState",
  default: {
    accessToken: "",
    refreshToken: "",
  },
});