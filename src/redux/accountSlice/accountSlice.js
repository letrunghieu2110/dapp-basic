import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountAddress: "",
    balanceAmount: 0,
  },
  reducers: {
    getAccountAddress: (state, action) => {
      state.accountAddress = action.payload;
    },
    getBalanceAmount: (state, action) => {
      state.balanceAmount = action.payload;
    },
  },
});

export const { getAccountAddress, getBalanceAmount } = accountSlice.actions;

export default accountSlice.reducer;
