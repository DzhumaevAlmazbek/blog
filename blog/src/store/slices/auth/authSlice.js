import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, signIn, signUp } from "./authService";

const initialState = {
  signUpForm: {
    username: "",
    email: "",
    password: "",
  },
  signInForm: {
    email: "",
    password: "",
  },
  isAuthenticated: true,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignUpForm(state, { payload }) {
      const { key, value } = payload;
      state.signUpForm[key] = value;
    },
    setSignInForm(state, { payload }) {
      const { key, value } = payload;
      state.signInForm[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        localStorage.setItem("token", JSON.stringify(payload));
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });

    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        localStorage.setItem("token", JSON.stringify(payload));
        localStorage.setItem("email", JSON.stringify(state.signInForm.email));
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });

    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.isAuthenticated = payload;
        state.isLoading = false;

        if (payload === false) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("userId");
        }
      })
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
