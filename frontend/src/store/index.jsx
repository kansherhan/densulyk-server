import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth.slice.js";
import settingsSlice from "./slices/settings.slice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
