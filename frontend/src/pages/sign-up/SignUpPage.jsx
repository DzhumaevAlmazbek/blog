import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/slices/auth/authSlice";
import { signUp } from "../../store/slices/auth/authService";

function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useSelector((state) => state.auth.signUpForm);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.username || !form.password) {
      return;
    }

    dispatch(signUp());
  }

  function handleChangeForm(e) {
    dispatch(
      authActions.setSignUpForm({ key: e.target.name, value: e.target.value })
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
            value={form.email}
            name="email"
            onChange={(e) => handleChangeForm(e)}
            autoComplete="email"
          />
        </label>
        <label>
          <span>Username</span>
          <input
            type="text"
            value={form.username}
            name="username"
            onChange={(e) => handleChangeForm(e)}
            autoComplete="username"
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            name="password"
            onChange={(e) => handleChangeForm(e)}
            autoComplete="current-password"
          />
        </label>
        <button type="submit">Sign up</button>
        <p>
          Already have an account?
          <Link to="/auth/sign-in">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;
