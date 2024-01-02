import { useEffect } from "react";
import { getPosts } from "../../store/slices/post/postService";
import { useDispatch, useSelector } from "react-redux";
import { postsActions } from "../../store/slices/post/postSlice";
import PostItem from "../../components/post/PostItem/PostItem";
import Spinner from "../../ui/Spinner/Spinner";

function PostsPage() {
  const dispatch = useDispatch();
  const { data, isLoading, currentPage, createdAt } = useSelector(
    (state) => state.post
  );

  function handleSortByCreationTime() {
    if (createdAt === "DESC") {
      dispatch(postsActions.setSortType("ASC"));
    } else if (createdAt === "ASC") {
      dispatch(postsActions.setSortType("DESC"));
    }

    dispatch(getPosts());
  }

  function handleNextPage() {
    dispatch(postsActions.setNextPage());
    dispatch(getPosts());
  }

  function handlePrevPage() {
    dispatch(postsActions.setPrevPage());
    dispatch(getPosts());
  }

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul>
      {data.length != 0 && (
        <div>
          <h3>Sort by:</h3>
          <div>
            <button onClick={handleSortByCreationTime}>Creation time</button>
          </div>
        </div>
      )}

      {data.length == 0 && <h3>Seems like there's no posts. </h3>}

      <div>
        {currentPage == 1 ? <></> : <button onClick={handlePrevPage}>⇦</button>}

        <div>
          {data != [] &&
            data.map((post) => <PostItem post={post} key={post.id} />)}
        </div>

        {data.length != 0 && data.slice(-1) && (
          <button onClick={handleNextPage}>⇨</button>
        )}
      </div>
    </ul>
  );
}

export default PostsPage;
