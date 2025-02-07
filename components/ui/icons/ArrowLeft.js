import styles from "@/styles/styles.module.css";

export default function ArrowLeft(props) {
  return (
    <span
      onClick={props.onClick}
      type={props.type || "button"}
      className={styles.text}
    >
      <span className={styles.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </span>
      <span>{props.children}</span>
    </span>
  );
}
