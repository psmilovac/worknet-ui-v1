import styles from "@/styles/styles.module.css";

export default function Clone(props) {
  return (
    <span
      onClick={props.onClick}
      type={props.type || "button"}
      className={styles.text}
    >
      <span className={styles.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // fill="none"
          fill="currentColor"
          viewBox="0 0 512 512"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M64 464h224c8.8 0 16-7.2 16-16v-64h48v64c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V224c0-35.3 28.65-64 64-64h64v48H64c-8.84 0-16 7.2-16 16v224c0 8.8 7.16 16 16 16zm96-400c0-35.35 28.7-64 64-64h224c35.3 0 64 28.65 64 64v224c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V64zm64 240h224c8.8 0 16-7.2 16-16V64c0-8.84-7.2-16-16-16H224c-8.8 0-16 7.16-16 16v224c0 8.8 7.2 16 16 16z"
          />
        </svg>
      </span>
      <span>{props.children}</span>
    </span>
  );
}
