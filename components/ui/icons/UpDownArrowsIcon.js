import styles from "@/styles/styles.module.css";

export default function UpDownArrowsIcon(props) {
  return (
    <span
      onClick={props.onClick}
      type={props.type || "button"}
      className={styles.text}
    >
      <span className={styles.icon} style={{position:"relative", top:"2px"}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-6 h-6"
          viewBox="0 0 24 24"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </span>
    </span>
  );
}
