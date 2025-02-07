import * as React from "react"
const DrawingIcon = (props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Drawings"
    viewBox="0 0 256 256"
    width={23}
    {...props}
  >
    <defs>
      <style>
        {".cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:10px}"}
      </style>
    </defs>
    <path d="M24.5 204.5v-152h206v95L130 147v57.5H24.5z" />
    <path
      d="M230.5 147.5v57h-206v-152h206v95zM130 204.5V147M230.5 147.5 130 147"
      className="cls-1"
    />
  </svg>
)
export default DrawingIcon