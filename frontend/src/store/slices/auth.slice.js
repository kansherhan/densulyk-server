import { createSlice } from "@reduxjs/toolkit";

import { USER_TOKEN_LOCALSTORAGE_KEY } from "../../constants/app.js";

const initialState = {
  token: JSON.parse(localStorage.getItem(USER_TOKEN_LOCALSTORAGE_KEY) || null),
};

export const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;

      localStorage.setItem(
        USER_TOKEN_LOCALSTORAGE_KEY,
        JSON.stringify(state.token)
      );
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
