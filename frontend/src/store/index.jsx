import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth.slice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
