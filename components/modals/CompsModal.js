import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "./CompsModal.module.css";
import Image from "next/image";
import Link from "next/link";
import { bus_filter_comps } from "../functions/pack_table_filters";
import { Unit1FilterComps } from "../functions/unit1_filter_comps";
import { Unit1FeaturesAll } from "../functions/unit1_features";
import { category } from "@/global/global_vars";
import ButtonCancel from "../ui/buttons/ButtonCancel";

const CompsModal = ({
  onClose,
  children,
  pack_table,
  unit1_id,
  unit1,
  setSharedCompsState,
  bus_id,
}) => {
  // compartments category
  const title = "Compartments";
  const comps_asm = category.compartment;
  const bus_asm = category.bus_bar_asm;
  const category_name = "comps_id";
  const currentCompId = unit1.comps?.pack_id;
  // console.log("currentCompId", currentCompId);

  const [showMore, setShowMore] = useState(false);
  // console.log("pack_table", pack_table);

  // Filters the Compartments based on the bus selection. The piece of main logic.
  // old way
  // let comps_table = bus_filter_comps(pack_table, comps_asm, bus_id);

  const comps_only_pack_table = pack_table?.filter(
    (comp) => comp.category_id === comps_asm //&& comp.pack_variation === 1
  );

  const bus_pack = pack_table?.find((bus) => bus.pack_id === bus_id);
  // console.log("bus", bus);
  // console.log("comps_only_pack_table", comps_only_pack_table);
  // console.log("pack_table", pack_table);

  // console.log("unit1", unit1);
  let features = Unit1FeaturesAll(unit1);
  // console.log("features", features);

  // new way for matching the compartments with the bus bars
  let comps_table = Unit1FilterComps(features, comps_only_pack_table, bus_pack);

  // create ref for the styled container component
  const modalContainerRef = React.useRef();

  // check if the user has clicked inside or outside the modal
  // useCallback is used to store the function reference, so that on modal closure, the correct callback can be cleaned in window.removeEventListener
  const backdropHandler = useCallback((e) => {
    if (!modalContainerRef?.current?.contains(e.target)) {
      onClose();
    }
  }, []);

  useEffect(() => {
    // We wrap it inside setTimeout in order to prevent the eventListener to be attached before the modal is open.
    setTimeout(() => {
      window.addEventListener("click", backdropHandler);
    });
  }, []);

  useEffect(() => {
    // remove the event listener when the modal is closed
    return () => window.removeEventListener("click", backdropHandler);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const selectCompartmentHandler = (category, pack_id) => () => {
    // use shared state between child and parent to send request body
    // console.log("pack_id:", pack_id);
    setSharedCompsState({
      category: category,
      pack_id: pack_id,
      unit1_id: unit1_id,
      unit1: unit1,
    });
    onClose();
  };

  const onCompsModalClose = () => {
    // e.preventDefault();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.backdrop}>
      <div className={styles.container} ref={modalContainerRef}>
        <div
          href="#"
          onClick={handleCloseClick}
          style={{ fontSize: "1.5rem", textAlign: "right", cursor: "pointer" }}
        >
          x
        </div>
        <div style={{ fontSize: "0.85rem", opacity: "0.8" }}>
          Section {unit1.unit1_position}
        </div>
        {title && <h1>{title}</h1>}

        {/* ---------CONTENT--------- */}
        <div className={styles.content}>
          {/* -------- TEXT --------- */}

          <p style={{ opacity: "0.7", margin: "0 0 1rem 0" }}>
            Compartments Legend:
          </p>
          <ul style={{ opacity: "0.7", margin: "0 0 1rem 0" }}>
            <li>
              <b>CB</b> - Circuit Breaker
            </li>
            <li>
              <b>CPT</b> - Current Power Transformer up to 5-15 kVA
            </li>
            <li>
              <b>FT</b> - Fuse Truck for CPT rated 25-75 kVA
            </li>
            <li>
              <b>LV</b> - Low Voltage Compartment
            </li>

            <li>
              <b>VT</b> - Voltage Transformer
            </li>
          </ul>
          {/* <br /> */}

          {showMore && (
            <div>
              <p style={{ opacity: "0.7", margin: "0 0 1rem 0" }}>
                The compartments come in a few sizes and can be arranged in
                multiple ways. There are two main types of compartments:
              </p>
              <ul
                style={{
                  opacity: "0.7",
                }}
              >
                <li>
                  <Image
                    src="/circle.svg"
                    alt="circle"
                    width={15}
                    height={15}
                  />
                  Low Voltage
                </li>
                <li>
                  <Image
                    src="/circle.svg"
                    alt="circle"
                    width={15}
                    height={15}
                  />
                  Power Compartments
                </li>
              </ul>
              <br />
              <table>
                <tr>
                  <td>
                    <Image
                      src={"/png/lv_comps.png"}
                      alt="CT Metering Class"
                      width={230} // this should match with column width
                      height={230}
                    />
                  </td>
                  <td>
                    <Image
                      src={"/png/power_comps.png"}
                      alt="CT Metering Class"
                      width={230} // this should match with column width
                      height={230}
                    />
                  </td>
                </tr>
                <tr
                  style={{
                    textAlign: "center",
                    fontSize: "0.9rem",
                    opacity: "0.8",
                  }}
                >
                  <td>Low Voltage Compartments</td>
                  <td>Power Compartments</td>
                </tr>
              </table>
              <br />
            </div>
          )}

          <button
            className={styles.more}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
          <br />
          <br />
          {comps_table.length < 1 && (
            <div>
              A compartment do not apply to this configuration.
              <br />
              <ButtonCancel type="button" onClick={onCompsModalClose}>
                Cancel
              </ButtonCancel>
            </div>
          )}

          <div>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "start",
                justifyContent: "start",
                gap: "2rem",
              }}
            >
              {!!comps_table &&
                comps_table
                  // .filter(
                  //   (pack_table_filtered) =>
                  //     pack_table_filtered.category_id === category_id
                  // )
                  .sort((a, b) => (a.pack_name < b.pack_name ? -1 : 1))
                  .map((pack) => (
                    <li key={pack.pack_id} style={{ width: "125px" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {currentCompId == pack.pack_id ? (
                          <Image
                            className={styles.card1}
                            src={pack.pack_image_url}
                            alt="Compartments Image"
                            width={125}
                            height={330}
                            priority
                            onClick={selectCompartmentHandler(
                              category_name,
                              pack.pack_id
                            )}
                            style={{
                              border: "solid 1.5px black",
                              boxShadow:
                                "2px 2px 2px 1px rgba(50, 50, 93, 0.25)",
                            }}
                          />
                        ) : (
                          <Image
                            className={styles.card1}
                            src={pack.pack_image_url}
                            alt="Compartments Image"
                            width={125}
                            height={330}
                            priority
                            onClick={selectCompartmentHandler(
                              category_name,
                              pack.pack_id
                            )}
                            
                          />
                        )}

                        <div
                          style={{
                            fontSize: "0.7rem",
                            // width: "100%",
                            overflow: "hidden",
                            // whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            textAlign: "left",
                            padding: "5px 0 0 3px",
                          }}
                        >
                          {/* id: {pack.pack_id} */}
                          <ul>
                            <li>
                              <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                              {pack.pack_name}
                            </li>
                            <li>
                              <span style={{ fontWeight: "bold" }}>PN:</span>{" "}
                              200V-
                            </li>
                            <li>
                              <span style={{ fontWeight: "bold" }}>ID:</span>{" "}
                              {pack.pack_id}
                            </li>
                            <li>
                              <span style={{ fontWeight: "bold" }}>
                                Description:
                              </span>{" "}
                              {pack.pack_description}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CompsModal;
