import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (authData, thunkApi) => {
    const { getState, rejectWithValue } = thunkApi;

    try {
      const res = await fetch("http://localhost:3000/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify(getState().auth.signUpForm),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      return data.tokens.access_token;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (authData, thunkApi) => {
    const { getState, rejectWithValue } = thunkApi;

    try {
      const res = await fetch("http://localhost:3000/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(getState().auth.signInForm),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      return data.access_token;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (authData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/check?token=${token}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
