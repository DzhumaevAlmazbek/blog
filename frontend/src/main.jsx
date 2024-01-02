import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import router from "./router";
import store from "./store/store.js";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
