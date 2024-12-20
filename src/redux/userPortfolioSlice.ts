// Redux setup to store the user's portfolio data
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: null,
};

// Portfolio slice
const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setPortfolioData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPortfolioData } = portfolioSlice.actions;
export default portfolioSlice.reducer;
