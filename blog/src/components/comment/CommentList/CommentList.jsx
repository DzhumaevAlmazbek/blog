import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../store/slices/comment/commentService";

function CommentList() {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comment.data);
  const currentUser = useSelector((state) => state.user.currentUser);

  function handleDeleteComment(commentId) {
    dispatch(deleteComment(commentId));
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.user.username}</p>
          <p>{comment.content}</p>
          {currentUser.id === comment.user.id && (
            <button onClick={() => handleDeleteComment(comment.id)}>
              Delete comment
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentList;
