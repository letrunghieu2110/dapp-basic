import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice/accountSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice,
  },
});
