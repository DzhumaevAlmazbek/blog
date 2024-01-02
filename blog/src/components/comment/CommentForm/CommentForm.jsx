import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { commentActions } from "../../../store/slices/comment/commentSlice";
import CommentList from "../CommentList/CommentList";
import { createComment } from "../../../store/slices/comment/commentService";

function CommentForm() {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comment);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentPostId = useParams().id;

  function handleFormChange(e) {
    dispatch(
      commentActions.setCommentForm({
        key: e.target.name,
        value: e.target.value,
        userId: currentUser.id,
        postId: currentPostId,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { content } = comments.commentForm;

    if (!comments) return;

    dispatch(
      createComment({
        content: content,
        userId: currentUser.id,
        postId: currentPostId,
      })
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          value={comments.commentForm.content}
          onChange={(e) => handleFormChange(e)}
        />
        <button type="submit">➤</button>
      </form>
      <CommentList />
    </div>
  );
}

export default CommentForm;
