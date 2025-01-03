import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  token: string;
  eth_Address: string;
  sol_Address: string;
  name?: string;
  profileIcon?: string;
  is2faEnbaled: boolean;
}

interface UserProfileState {
  user: User | null;
}

const initialState: UserProfileState = {
  user: null,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfileData(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    clearUserProfileData(state) {
      state.user = null;
    },
  },
});

export const { setUserProfileData, clearUserProfileData } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
