import styles from "./CommentList.module.css";
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
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comments__item}>
          <div className={styles.comments__item_content}>
            <p>{comment.user.username}</p>
            <p>{comment.content}</p>
          </div>
          {currentUser.id === comment.user.id && (
            <button onClick={() => handleDeleteComment(comment.id)}>X</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentList;
