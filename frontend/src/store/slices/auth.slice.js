import { createSlice } from "@reduxjs/toolkit";

import {
  USER_TOKEN_LOCALSTORAGE_KEY,
  USER_2FA_VERIFY_LOCALSTORAGE_KEY,
} from "../../constants/app.js";

const initialState = {
  isAuthorized: false,
  is2FAuthorized: JSON.parse(
    localStorage.getItem(USER_2FA_VERIFY_LOCALSTORAGE_KEY) || false
  ),
  token: JSON.parse(localStorage.getItem(USER_TOKEN_LOCALSTORAGE_KEY) || null),
};

if (initialState.token !== null) {
  initialState.isAuthorized = true;
}

export const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthorized = true;
      state.is2FAuthorized = false;
      state.token = action.payload;

      localStorage.setItem(
        USER_TOKEN_LOCALSTORAGE_KEY,
        JSON.stringify(state.token)
      );
    },
    login2FAVerify: (state) => {
      state.is2FAuthorized = true;

      localStorage.setItem(
        USER_2FA_VERIFY_LOCALSTORAGE_KEY,
        JSON.stringify(state.is2FAuthorized)
      );
    },
    register: (state, action) => {
      state.isAuthorized = false;
      state.token = action.payload;

      localStorage.setItem(
        USER_TOKEN_LOCALSTORAGE_KEY,
        JSON.stringify(state.token)
      );
    },
    emailVerify: (state) => {
      state.isAuthorized = true;
    },
    logout: (state) => {
      state.isAuthorized = false;
      state.token = null;

      localStorage.removeItem(USER_TOKEN_LOCALSTORAGE_KEY);

      window.location.reload();
    },
  },
});

export const { login, register, emailVerify, logout, login2FAVerify } =
  authSlice.actions;
export default authSlice.reducer;
