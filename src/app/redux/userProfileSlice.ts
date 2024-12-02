import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfileState {
  user: any | null;
}

const initialState: UserProfileState = {
  user: null,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfileData(state, action: PayloadAction<any>) {
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
