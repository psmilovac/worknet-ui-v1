import styles from "@/styles/styles.module.css";

// width={150}
// height={396}
// style={{ position: "realtive", right: "0" }}

export default function TextTestSvg({ custom_text, boxWidth, boxHeight, X, Y }) {
  const viewBoxVar = "0 0 " + { boxWidth } + " " + { boxHeight };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBoxVar}>
      <style>
        {".cutom_text_style{font-family: Arial, Helvetica, sans-serif}"}
      </style>
      <text x={X} y={Y} className="cutom_text_style" style={{
          font: "italic 40px serif",
          fill: custom_text,
        }}>
        {custom_text}
        
      </text>
    </svg>
  );
}
