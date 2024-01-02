import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../store/slices/auth/authService";
import { getUserByEmail } from "../../store/slices/user/userService";
import Header from "../Header/Header";

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserByEmail());
    } else {
      navigate("/auth/sign-up");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
