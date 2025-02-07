import React from "react";
import classes from "./ThreeDotsTypingSpinner.module.css";

export default function ThreeDotsTypingSpinner(props) {
  return (
    <div className={classes.backdrop}>
      <div className={classes.spinner_box}>
        <div className={classes.spinner} />
        <div className={classes.spinner_text}>{props.text}</div>
      </div>
    </div>
  );
}