import styles from "./PostPage.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getPostById,
  getPosts,
} from "../../store/slices/post/postService";
import { getComments } from "../../store/slices/comment/commentService";
import CommentForm from "../../components/comment/CommentForm/CommentForm";
import Spinner from "../../ui/Spinner/Spinner";

function PostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPostAuthor, setIsPostAuthor] = useState(false);
  const currentPostId = useParams().id;

  const { post, isLoading } = useSelector((state) => state.post);
  const currentUser = useSelector((state) => state.user.currentUser);

  function handleClick(id) {
    dispatch(deletePost(id));
    dispatch(getPosts());
    navigate("/");
  }

  useEffect(() => {
    dispatch(getPostById(currentPostId));
  }, [dispatch]);

  useEffect(() => {
    if (post && currentUser) {
      dispatch(getComments(currentPostId));
      setIsPostAuthor(currentUser.id === post.author.id);
    }
  }, [post, currentUser]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    post && (
      <div className={styles.post}>
        <div className={styles.post__content}>
          <div className={styles.post__content_text}>
            <h2>{post.title}</h2>
            <p>
              <span>Created at:</span> {post.updatedAt.slice(0, 10)}
            </p>
            <p>
              <span>Description:</span> {post.description}
            </p>
            <p>
              <span>Content:</span> {post.content}
            </p>
          </div>
          {isPostAuthor && (
            <button onClick={() => handleClick(currentPostId)}>
              Delete post
            </button>
          )}
        </div>
        <div className={styles.post__comments}>
          <CommentForm />
        </div>
      </div>
    )
  );
}

export default PostPage;
