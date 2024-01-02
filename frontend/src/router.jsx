import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./ui/AppLayout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AppLayout />,
    children: [
      {
        path: "sign-up",
        async lazy() {
          let SignUpPage = await import("./pages/sign-up/SignUpPage");
          return { Component: SignUpPage.default };
        },
      },
      {
        path: "sign-in",
        async lazy() {
          let SignInPage = await import("./pages/sign-in/SignInPage");
          return { Component: SignInPage.default };
        },
      },
    ],
  },
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "",
        async lazy() {
          let PostsPage = await import("./pages/posts/PostsPage");
          return { Component: PostsPage.default };
        },
      },
      {
        path: "/posts/:id",
        async lazy() {
          let PostPage = await import("./pages/post/PostPage");
          return { Component: PostPage.default };
        },
      },
      {
        path: "/posts/createPost",
        async lazy() {
          let CreatePostPage = await import(
            "./pages/createPost/CreatePostPage"
          );
          return { Component: CreatePostPage.default };
        },
      },
      {
        path: "*",
        async lazy() {
          let PageNotFound = await import("./ui/PageNotFound/PageNotFound");
          return { Component: PageNotFound.default };
        },
      },
    ],
  },
]);

export default router;
