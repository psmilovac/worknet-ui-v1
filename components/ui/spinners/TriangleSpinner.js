import styles from "./TriangleSpinner.module.css";

export default function TriangleSpinner() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <svg className={styles.svg} viewBox="-3 -4 39 39">
          <polygon
            className={styles.animation}
            fill="transparent"
            stroke="var(--ps-blue)"
            stroke-width="1.5"
            points="16,0 32,32 0,32"
            strokeDasharray={17}
          ></polygon>
        </svg>
      </div>
    </div>
  );
}
