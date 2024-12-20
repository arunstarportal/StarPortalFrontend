import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userProfileReducer from "./userProfileSlice";
import userPortfolioReducer from "./userPortfolioSlice";

export const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  userPortfolio: userPortfolioReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
