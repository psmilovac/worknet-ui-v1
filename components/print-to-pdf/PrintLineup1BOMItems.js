import React, { useEffect, useState } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { PDFLineup1BOM } from "./PDFLineup1BOM";
import ButtonMini from "../ui/buttons/ButtonMini";
import { api_root } from "@/global/global_vars";
import axios from "axios";

export default function PrintLineup1BOMItems({ lineup1, showBus, showComps }) {
  const [lineup1Nested, setLineup1Nested] = useState("");

  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef(null);
  const promiseResolveRef = useRef(null);

  let componentRef = useRef();
  const lineup1_name = lineup1.lineup1_name;
  const lineup1_nested_api_url = api_root + "/api/bg/lineup1-nested/";
  const url = lineup1_nested_api_url + lineup1.lineup1_id;
  const config = { "content-type": "application/json" };

  // We watch for the state to change here, and for the Promise resolve to be available
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      GetLineup1Nested();
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const GetLineup1Nested = () => {
    setLineup1Nested("");
    try {
      axios
        .get(url, config)
        .then((res) => setLineup1Nested(() => res.data))
        .then(() => {
          setIsPrinting(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (loadData) {
  //     onBeforeGetContentResolve.current();
  //   }
  // }, [lineup1, onBeforeGetContentResolve]);

  return (
    <>
      <ReactToPrint
        trigger={() => <ButtonMini>BOM Items</ButtonMini>}
        content={() => componentRef}
        onBeforeGetContent={() => {
          return new Promise((resolve) => {
            promiseResolveRef.current = resolve;
            setIsPrinting(true);
          });
        }}
        onAfterPrint={() => {
          // Reset the Promise resolve so we can print again
          promiseResolveRef.current = null;
          setIsPrinting(false);
        }}
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
