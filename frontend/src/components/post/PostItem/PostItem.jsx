import { useNavigate } from "react-router-dom";

function PostItem({ post }) {
  const navigate = useNavigate();
  const { createdAt, id, title, description, author } = post;

  return (
    <li onClick={() => navigate(`/posts/${id}`)}>
      <div>
        <p>{author.username}</p>
        <p>{createdAt.slice(0, 10)}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
}

export default PostItem;
