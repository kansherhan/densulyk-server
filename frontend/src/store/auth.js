import { create } from "zustand";
import { USER_TOKEN_LOCALSTORAGE_KEY } from "../constants/app.js";

export const useAuthStore = create((set) => ({
  token: JSON.parse(localStorage.getItem(USER_TOKEN_LOCALSTORAGE_KEY) || null),
  login: (tokenData) =>
    set((state) => {
      state.token = tokenData;
      localStorage.setItem(
        USER_TOKEN_LOCALSTORAGE_KEY,
        JSON.stringify(tokenData)
      );
    }),
}));
