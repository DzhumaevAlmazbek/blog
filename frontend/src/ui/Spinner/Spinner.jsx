import styles from "./Spinner.module.css";
import { Audio } from "react-loader-spinner";

function Spinner() {
  return (
    <div className={styles.spinner}>
      <Audio
        height="50"
        width="50"
        radius="7"
        color="#555"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
}

export default Spinner;
