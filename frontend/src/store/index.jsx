import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

import { USER_TOKEN_LOCALSTORAGE_KEY } from "../constants/app.js";

const store = (set) => ({
  token: JSON.parse(localStorage.getItem(USER_TOKEN_LOCALSTORAGE_KEY) || null),
  login: (tokenData) =>
    set((state) => {
      state.token = tokenData;
      localStorage.setItem(
        USER_TOKEN_LOCALSTORAGE_KEY,
        JSON.stringify(tokenData)
      );
    }),
});

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = createStore(store);
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useContextStore = (selector) => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Missing StoreProvider");
  }

  return useStore(store, selector);
};
