import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userProfileReducer from "./userProfileSlice";

export const rootReducer = combineReducers({
  userProfile: userProfileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
