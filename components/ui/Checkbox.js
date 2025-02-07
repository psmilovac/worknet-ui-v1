import React from "react";
import { useState } from "react";

export default function Checkbox({ label, checked, ...props }) {
  const defaultChecked = checked ? checked : true;
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="checkbox-wrapper" >
      <label style={{cursor:"pointer"}}>
        <input
          type="checkbox"
          checked={isChecked}
          value={label}
          onChange={() => setIsChecked((prev) => !prev)}
          style={{cursor:"pointer"}}
        />
        <span>{" "}{label}</span>
      </label>
      {/* <p>{isChecked ? "Selected" : "Unchecked"}</p> */}
    </div>
  );
}
