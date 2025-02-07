import styles from "./ButtonMini.module.css";
import Link from "next/link";

// using Button as a link or regular button => onClick
export default function ButtonMini(props) {
    // As a regular link
  if (props.link) {
    return (
      <Link href={props.link} className={styles.button}>
        {props.children}
      </Link>
    );
  }

  // As regular button
  return (
    <button
      className={styles.button}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
