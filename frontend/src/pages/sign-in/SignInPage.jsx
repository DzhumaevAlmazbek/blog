import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/slices/auth/authSlice";
import { signIn } from "../../store/slices/auth/authService";

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useSelector((state) => state.auth.signInForm);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      return;
    }

    dispatch(signIn());
  }

  function handleChangeForm(e) {
    dispatch(
      authActions.setSignInForm({ key: e.target.name, value: e.target.value })
    );
  }

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => handleChangeForm(e)}
            autoComplete="email"
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={(e) => handleChangeForm(e)}
            autoComplete="current-password"
          />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default SignInPage;
