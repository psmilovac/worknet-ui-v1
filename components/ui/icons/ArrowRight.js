import styles from "@/styles/styles.module.css";

export default function ArrowRight(props) {
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
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </span>
    </span>
  );
}
