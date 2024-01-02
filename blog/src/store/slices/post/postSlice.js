import { createSlice } from "@reduxjs/toolkit";
import {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  searchPostByTitle,
} from "./postService";

const initialState = {
  data: [],
  post: null,
  searchPostForm: {
    title: "",
  },
  createPostForm: {
    title: "",
    description: "",
    content: "",
    authorId: "",
    tags: [],
  },
  currentPage: 1,
  limit: 6,
  createdAt: "ASC",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCreatePostForm(state, { payload }) {
      const { key, value, userId } = payload;
      state.createPostForm[key] = value;
      state.createPostForm.authorId = userId;
    },
    setSearchForm(state, { payload }) {
      const { key, value } = payload;
      state.searchPostForm[key] = value;
    },
    setNextPage(state) {
      state.currentPage += 1;
    },
    setPrevPage(state) {
      state.currentPage -= 1;
    },
    setSortType(state, { payload }) {
      state.createdAt = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.data = payload.data;
        state.isLoading = false;
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });

    builder
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostById.fulfilled, (state, { payload }) => {
        state.post = payload;
        state.isLoading = false;
      })
      .addCase(getPostById.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.createPostForm = {};
        state.isLoading = false;
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });

    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.data = state.data.filter((item) => item.id !== payload);
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });

    builder
      .addCase(searchPostByTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchPostByTitle.fulfilled, (state, { payload }) => {
        state.data = payload.data;
        state.isLoading = false;
      })
      .addCase(searchPostByTitle.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const postsActions = postSlice.actions;

export default postSlice.reducer;
