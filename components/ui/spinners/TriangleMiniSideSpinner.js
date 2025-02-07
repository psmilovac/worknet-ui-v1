import styles from "./TriangleMiniSideSpinner.module.css";

export default function TriangleMiniSideSpinner() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <svg className={styles.svg} viewBox="-3 -4 39 39">
          <polygon
            className={styles.animation}
            fill="transparent"
            stroke="var(--ps-blue)"
            // stroke="white"
            strokeWidth="2.5"
            points="16,0 32,32 0,32"
            strokeDasharray={17}
          ></polygon>
        </svg>
      </div>
    </div>
  );
}
