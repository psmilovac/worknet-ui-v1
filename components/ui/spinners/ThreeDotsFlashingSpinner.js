import React from "react";
import classes from "./ThreeDotsFlashingSpinner.module.css";

export default function ThreeDotsFlashingSpinner(props) {
  return (
    <div className={classes.backdrop}>
      <div className={classes.spinner_box}>
        <div className={classes.spinner} />
        <div className={classes.spinner_text}>{props.text}</div>
      </div>
    </div>
  );
}