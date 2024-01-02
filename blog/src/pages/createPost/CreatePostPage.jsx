import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../../store/slices/post/postService";
import { postsActions } from "../../store/slices/post/postSlice";

function CreatePostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useSelector((state) => state.post.createPostForm);
  const currentUser = useSelector((state) => state.user.currentUser);

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.description || !form.content) return;

    dispatch(createPost()).then(() => {
      navigate("/");
      dispatch(getPosts());
    });
  }

  function handleChangeForm(e) {
    if (!currentUser) return;

    dispatch(
      postsActions.setCreatePostForm({
        key: e.target.name,
        value: e.target.value,
        userId: currentUser.id,
      })
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={(e) => handleChangeForm(e)}
          />
        </label>
        <label>
          <span>Description</span>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={(e) => handleChangeForm(e)}
          />
        </label>
        <label>
          <span>Content</span>
          <input
            type="text"
            name="content"
            value={form.content}
            onChange={(e) => handleChangeForm(e)}
          />
        </label>
        <button type="submit">Create post</button>
      </form>
    </div>
  );
}

export default CreatePostPage;
