import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "users",
  async (usersData, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

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

export const getUserByEmail = createAsyncThunk(
  "users/id",
  async (usersData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const email = JSON.parse(localStorage.getItem("email"));

    try {
      const res = await fetch("http://localhost:3000/api/users");

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      return data.data.find((user) => user.email === email);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
