import { createSlice } from "@reduxjs/toolkit";
import { getComments, createComment, deleteComment } from "./commentService";
import { useParams } from "react-router-dom";

const initialState = {
  data: [],
  commentForm: {
    content: "",
    postId: "",
    userId: "",
  },
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentForm(state, { payload }) {
      const { key, value, userId, postId } = payload;
      state.commentForm[key] = value;
      state.commentForm.postId = postId;
      state.commentForm.userId = userId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        state.data = payload.data;
        state.isLoading = false;
      })
      .addCase(getComments.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });

    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.data.push(payload);
        state.isLoading = false;
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.data = state.data.filter((comment) => comment.id !== payload);
        state.isLoading = false;
      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice.reducer;
