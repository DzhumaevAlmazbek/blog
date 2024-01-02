import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrong__page}>
      <h1>Page not found</h1>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
}

export default PageNotFound;
