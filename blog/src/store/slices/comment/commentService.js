import { createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (postId, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await fetch(`http://localhost:3000/api/comments/${postId}`, {
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

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentsData, thunkApi) => {
    const { getState, rejectWithValue } = thunkApi;
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const res = await fetch("http://localhost:3000/api/comments/create", {
        method: "POST",
        body: JSON.stringify(getState().comment.commentForm),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const res = await fetch(
        `http://localhost:3000/api/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return commentId;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
