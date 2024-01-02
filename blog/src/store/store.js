import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import userReducer from "./slices/user/userSlice";
import postReducer from "./slices/post/postSlice";
import commentReducer from "./slices/comment/commentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
  },
  devTools: true,
});

export default store;
