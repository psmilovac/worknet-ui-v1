import * as React from "react";
const SingleLineIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Single_Line"
    viewBox="0 0 256 256"
    width={23}
    {...props}
  >
    <defs>
      <style>
        {
          ".cls-1{stroke-linecap:square}.cls-1,.cls-2{stroke-miterlimit:10;stroke-width:10px}"
        }
      </style>
    </defs>
    <path d="M14.5 120.5h111M187.52 223.52v17" className="cls-1" />
    <path d="m187.97 242.1 1.39 1.92h-2.79l1.39-1.92m0-11.92-5.67 7.81-1.39 1.92-8.06 11.11h30.24l-8.06-11.11-1.39-1.92-5.67-7.81Z" />
    <path d="M125.52 222.52h61.98" className="cls-1" />
    <path
      d="M125.52 222.52v-41M125.52 119.52v-46M117.77 58.52H134v14.61h-16.23zM125.43 58.52v-47"
      className="cls-2"
    />
    <path d="m125.43 11.52 107.07-.02" className="cls-1" />
    <path
      d="M117.47 166.48h16.23v14.61h-16.23zM125.52 166.02v-46"
      className="cls-2"
    />
  </svg>
);
export default SingleLineIcon;
