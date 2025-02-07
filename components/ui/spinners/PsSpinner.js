import React from "react";
import styles from "./PsSpinner.module.css";

export default function PsSpinner() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <svg className={styles.svg} viewBox="-3 -4 43.25 44.25">
        <polygon
          className={styles.animation}
          fill="transparent"
          stroke="#007dba"
          strokeWidth="1"
          strokeDasharray="13"
          points="0 34.86 40.25 34.86 40.24 34.85 13.38 28.15 0 34.86"
        ></polygon>
        <polygon
          className={styles.animation}
          fill="transparent"
          stroke="#b2d235"
          strokeWidth="1"
          strokeDasharray="13"
          points="5.07 26.08 0 34.86 13.38 28.15 5.07 26.08"
        ></polygon>
        <polygon
          className={styles.animation}
          fill="transparent"
          stroke="#00bdf2"
          strokeWidth="1"
          strokeDasharray="13"
          points="13.38 28.15 40.24 34.85 31.21 19.21 13.38 28.15"
        ></polygon>
        <polygon
          className={styles.animation}
          fill="transparent"
          stroke="#ed1c24"
          strokeWidth="1"
          strokeDasharray="13"
          points="20.13 0 6.14 24.23 30.14 17.35 20.13 0"
        ></polygon>
        </svg>
      </div>
    </div>
  );
}
