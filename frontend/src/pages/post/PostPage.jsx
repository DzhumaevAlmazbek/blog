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
      <div>
        <div>
          <div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.content}</p>
            <p>{post.updatedAt.slice(0, 10)}</p>
          </div>
          {isPostAuthor && (
            <div>
              <button onClick={() => handleClick(currentPostId)}>
                Delete post
              </button>
            </div>
          )}
        </div>
        <div>
          <CommentForm />
        </div>
      </div>
    )
  );
}

export default PostPage;
