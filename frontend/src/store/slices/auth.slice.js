import { createSlice } from "@reduxjs/toolkit";

import { USER_TOKEN_LOCALSTORAGE_KEY } from "../../constants/app.js";

const initialState = {
  isAuthorized: false,
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
      state.token = action.payload;

      localStorage.setItem(
        USER_TOKEN_LOCALSTORAGE_KEY,
        JSON.stringify(state.token)
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
  },
});

export const { login, register, emailVerify } = authSlice.actions;
export default authSlice.reducer;
