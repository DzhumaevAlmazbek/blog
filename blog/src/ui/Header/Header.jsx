import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postsActions } from "../../store/slices/post/postSlice";
import { searchPostByTitle } from "../../store/slices/post/postService";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useSelector((state) => state.post.searchPostForm);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUrl = useLocation().pathname;

  const isOnCreatePostPage = "/posts/createPost" == currentUrl;

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title) return;

    dispatch(searchPostByTitle(form.title));
  }

  function handleChangeForm(e) {
    dispatch(
      postsActions.setSearchForm({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__content}>
          <Link to="/">
            <h2 className={styles.header__content_logo}>Blog</h2>
          </Link>

          {isAuthenticated && !isOnCreatePostPage && (
            <>
              <form
                onSubmit={handleSubmit}
                className={styles.header__content_form}
              >
                <input
                  placeholder="Search"
                  name="title"
                  value={form.title}
                  onChange={(e) => handleChangeForm(e)}
                />
                <button type="submit">Search</button>
              </form>

              <button onClick={() => navigate("/posts/createPost")}>
                Create post
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
