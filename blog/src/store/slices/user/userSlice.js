import { createSlice } from "@reduxjs/toolkit";
import { getUserByEmail, getUsers } from "./userService";

const initialState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserByEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserByEmail.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
      state.isLoading = false;
    });
    builder.addCase(getUserByEmail.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    });
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
