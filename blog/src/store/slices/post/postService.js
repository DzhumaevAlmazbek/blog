import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "posts",
  async (postsData, thunkApi) => {
    const { getState, rejectWithValue } = thunkApi;

    try {
      const res = await fetch(
        `http://localhost:3000/api/posts?page=${
          getState().post.currentPage
        }&limit=${getState().post.limit}&sortBy=createdAt:${
          getState().post.createdAt
        }`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
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

export const getPostById = createAsyncThunk(
  "posts/getById",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`);

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

export const searchPostByTitle = createAsyncThunk(
  "posts/searchPost",
  async (title, thunkApi) => {
    const { getState, rejectWithValue } = thunkApi;

    try {
      const res = await fetch(
        `http://localhost:3000/api/posts?search=${title}&limit=${
          getState().post.limit
        }&sortBy=createdAt:${getState().post.createdAt}&page=${
          getState().post.currentPage
        }`
      );

      const data = await res.json();

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postsData, thunkApi) => {
    const { getState, rejectWithValue } = thunkApi;
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const res = await fetch("http://localhost:3000/api/posts/create", {
        method: "POST",
        body: JSON.stringify(getState().post.createPostForm),
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
      return rejectWithValue(e);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
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
      return rejectWithValue(e);
    }
  }
);
