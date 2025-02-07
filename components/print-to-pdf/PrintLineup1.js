import React from "react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { PDFLineup1 } from "./PDFLineup1";
import ButtonMini from "../ui/buttons/ButtonMini";
import DrawingIcon from "../ui/icons/DrawingIcon";
import ButtonIcon from "../ui/buttons/ButtonIcon";
import PrintIcon from "../ui/icons/PrintIcon";

export default function PrintLineup1({ lineup1, showBus, showComps }) {
  let componentRef = useRef();

  return (
    <>
      <ReactToPrint
        trigger={() => <span title="Print Single Line Diagram and Elevation Views">
        
            <ButtonIcon  >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: "0.8rem",
                padding: "0px 10px 0 3px",
              }}
            >
              <span style={{ padding: "0px 0 0 3px" }}>
              <PrintIcon/>
              </span>
              <div style={{ padding: "3px 0 0 0" }}>Drawings</div>
            </div>
            </ButtonIcon>
       
        </span>}
        content={() => componentRef}
        documentTitle={lineup1.lineup1_name}
        pageStyle="@media print { 
                    @page {
                      size: 17in 11in;
                      margin: 0;
                      }
                    }"
      />
      <div style={{ display: "none" }}>
        <PDFLineup1
          ref={(el) => (componentRef = el)}
          lineup1={lineup1}
          showBus={showBus}
          showComps={showComps}
        />
      </div>
    </>
  );
}
