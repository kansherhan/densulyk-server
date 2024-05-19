import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headersBackPage: [],
};

export const settingsSlice = createSlice({
  name: "settings-slice",
  initialState,
  reducers: {
    addBackPage: (state, action) => {
      state.headersBackPage.push(action.payload);
    },
    backPage: (state) => {
      return state.headersBackPage.pop();
    },
    clearBackPage: (state) => {
      state.headersBackPage = [];
    },
  },
});

export const { addBackPage, backPage, clearBackPage } = settingsSlice.actions;
export default settingsSlice.reducer;
