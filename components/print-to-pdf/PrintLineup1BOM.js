import React from "react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { PDFLineup1BOM } from "./PDFLineup1BOM";
import ButtonMini from "../ui/buttons/ButtonMini";
import ButtonIcon from "../ui/buttons/ButtonIcon";
import PrintIcon from "../ui/icons/PrintIcon";
import BomIcon from "../ui/icons/BomIcon";

export default function PrintLineup1BOM({
  lineup1,
  showBus,
  showComps,
  lineup1Nested,
}) {
  let componentRef = useRef();
  const lineup1_name = lineup1.lineup1_name;

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <ButtonIcon >
            <BomIcon  />
          </ButtonIcon>
        )}
        content={() => componentRef}
        documentTitle={
          "PowerSecure - " + lineup1_name + " - BOM with Parts Cost"
        }
        pageStyle="@media print { 
          @page {
            size: 8.5in 11in;
            margin: 40px 40px;
            }
          }"
      />
      <div style={{ display: "none" }}>
        <PDFLineup1BOM
          ref={(el) => (componentRef = el)}
          lineup1={lineup1}
          showBus={showBus}
          showComps={showComps}
          lineup1Nested={lineup1Nested}
        />
      </div>
    </>
  );
}
