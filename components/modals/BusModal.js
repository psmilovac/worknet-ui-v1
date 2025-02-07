import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "./BusModal.module.css";
import Image from "next/image";
import { api_root } from "@/global/global_vars";
import { filter_bus_funcation } from "../functions/pack_table_filters";
import ButtonIconActive from "../ui/buttons/ButtonIconActive";
import ButtonIcon from "../ui/buttons/ButtonIcon";
import SingleLineIcon from "../ui/icons/SingleLineIcon";

const BusModal = ({
  onClose,
  children,
  pack_table,
  unit1_id,
  unit1,
  lineup1,
  setSharedBusState,
  lineup1_enclosure,
}) => {
  // console.log("lineup1.lineup1_enclosure", lineup1_enclosure);
  // console.log("pack_table", pack_table);
  // console.log("unit1.bus.pack_id", unit1.bus.pack_id)
  // busbar category
  const title = "Bus Bars";
  const category_id = 100;
  const category_name = "bus_id";
  const currentBusId = unit1.bus?.pack_id;

  const [busFilter, setBusFilter] = useState("");
  const [showGroupView, setShowGroupView] = useState(true); // both views are working, but the switch button does not

  let bus_table = {};
  if (lineup1_enclosure.toUpperCase() === "NEMA3R") {
    // filter busbars and nema3R
    bus_table = pack_table?.filter(
      (pck) => pck.category_id === category_id && pck.pack_is_nema3r === true
    );
  } else {
    // filter only busbars
    bus_table = pack_table?.filter((pck) => pck.category_id === category_id);
  }

  // Assistant
  if (unit1.unit1_position == 1) {
    // display one unit1 less than the current
    bus_table = bus_table?.filter((pck) => pck.pack_bus_connector_left === "X");
  }
  if (unit1.unit1_position > 1) {
    // display one unit1 less than the current
    const unit1_position = unit1.unit1_position - 2;
    const previous_unit1_bus_connection =
      lineup1.unit1[unit1_position]?.bus?.pack_bus_connector_right;
    bus_table = bus_table?.filter(
      (pck) => pck.pack_bus_connector_left === previous_unit1_bus_connection
    );
    // console.log("previous_unit1_bus_connection", previous_unit1_bus_connection);
  }

  // const [packTableState, setPackTableState] = useState(
  //   pack_table.filter((pck) => pck.category_id === category_id)
  // );

  // ----------- MODAL ---------------
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

  // ----------- MODAL END ---------------

  const selectCategoryHandler = (category, pack_id) => () => {
    // use shared state between child and parent to send request body
    setSharedBusState({
      category: category,
      pack_id: pack_id,
      unit1_id: unit1_id,
      unit1: unit1,
    });
    onClose();
  };

  // filter busbars based on the type of bus selection, eg. double breaker, single breaker
  let bus_table_filtered = bus_table;
  if (busFilter.length != "") {
    bus_table_filtered = filter_bus_funcation(bus_table, busFilter);
  }

  let bus_types = [];
  bus_types = bus_table_filtered.map((X) => X.pack_name.charAt(0));

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  // extract only unique values and sor the array
  var a = bus_types;
  var unique_bus_types = a.filter(onlyUnique).sort((a, b) => (a < b ? -1 : 1));

  // console.log(unique_bus_types);

  // TODO handler to show grouped bus bars
  // const onGroupViewHandler = (e) => {
  //   // e.preventDefault();
  //   setShowGroupView(!showGroupView);
  //   console.log("here");
  // };

  // const imageToFocus = React.useRef();
  // const focuselement = () => {
  //   imageToFocus.current.focus();
  // }

  // const loadImage = () =>{
  //   imageToFocus.current.focus();
  //   alert("Target loaded")
  // }

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
        {/* style={{ , position: "sticky", top: "0", zIndex: "999", background:"white", padding:"0.5rem 0 0.5rem 0"  }} */}
        <div style={{ fontSize: "0.85rem", opacity: "0.8" }}>
          Section {unit1.unit1_position}
        </div>
        {title && <h1>{title}</h1>}

        {/* ---------CONTENT--------- */}
        <div className={styles.content}>
          {/* -------- TEXT --------- */}

          {/* Checkbox */}
          {/* <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ margin: "0 1rem 0 0", cursor: "pointer" }}>
              <input
                type="checkbox"
                // checked={showBrk1}
                onChange={() => onBrk1Check()}
                style={{ margin: "0 0.5rem 0 0.5rem" }}
              />
              <span
                style={{ fontSize: "0.9rem", opacity: 0.7 }}
                title="Show busbars"
              >
                Circuit Breaker in Upper Compartment
              </span>
            </label>

            <label style={{ margin: "0 1rem 0 0", cursor: "pointer" }}>
              <input
                type="checkbox"
                // checked={showComps}
                // onChange={() => setIsCompsChecked(showComps)}
                style={{ margin: "0 0.5rem 0 0.5rem" }}
              />
              <span
                style={{ fontSize: "0.9rem", opacity: 0.7 }}
                title="Show compartments"
              >
                Circuit Breaker in Lower Compartment
              </span>
            </label>
          </div> */}

          {/* Dropdown Menu */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <label style={{ width: "60%", fontSize: "0.8rem", opacity: "0.8" }}>
              Filter bus bars.
              <select
                className={styles.form_select}
                value={busFilter}
                onChange={(e) => setBusFilter(e.target.value)}
              >
                <option value={""}>Show All</option>
                <option value={"brk_double"}>Double Breaker</option>
                <option value={"brk1"}>
                  Single Breaker in Lower Compartment
                </option>
                <option value={"brk2"}>
                  Single Breaker in Upper Compartment
                </option>
                <option value={"tie1"}>Tie Breaker in Lower Compartment</option>
                <option value={"tie2"}>Tie Breaker in Upper Compartment</option>
                <option value={"cpt15kva"}>CPT 5-15kVA</option>
                <option value={"cpt75kva"}>CPT 25-75kVA</option>
                <option value={"pt_lower"}>VTs in Lower Compartment</option>
                <option value={"pt_upper"}>VTs in Upper Compartment</option>
              </select>
            </label>

            {/* Group filter switch */}
            {/* <label>
              {!showGroupView && (
                <div title="Show as group view">
                  <ButtonIcon onClick={() => onGroupViewHandler()}>
                    !<SingleLineIcon />
                  </ButtonIcon>
                </div>
              )}

              {showGroupView && (
                <div title="Show as group view">
                  <ButtonIconActive onClick={() => onGroupViewHandler()}>
                    <SingleLineIcon />
                  </ButtonIconActive>
                </div>
              )}
            </label> */}
          </div>
          <br />

          <div
            style={{ opacity: "0.7", margin: "0 0 1rem 0", fontSize: "0.8rem" }}
          >
            {bus_table_filtered.length + " options"}
          </div>

          {showGroupView &&
            bus_table_filtered &&
            unique_bus_types.map((ubt) => (
              <div key={ubt} style={{ margin: "1rem 0 1rem 0" }}>
                <h2>{ubt}</h2>
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "row",
                    // margin:"1rem",
                    // padding:"1rem"
                    gap: "2rem",
                    padding: "1rem 0 1rem 0",
                  }}
                >
                  {bus_table_filtered
                    .filter((fltr) => fltr.pack_name.charAt(0) === ubt)
                    .sort((a, b) => (a.pack_name < b.pack_name ? -1 : 1))
                    .map((pack) => (
                      <ul key={pack.pack_id}>
                        {
                          ubt === pack.pack_name.charAt(0) && (
                            //

                            <li
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "125px",
                              }}
                            >
                              {currentBusId == pack.pack_id ? (
                                <Image
                                  className={styles.card1}
                                  src={pack.pack_image_url}
                                  alt="Busbar Image"
                                  width={125}
                                  height={330}
                                  priority
                                  // ref={imageToFocus}
                                  // onLoad={loadImage}

                                  // focuselement This with line on 135
                                  // ref={imageToFocus.current.}
                                  onClick={selectCategoryHandler(
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
                                  alt="Busbar Image"
                                  width={125}
                                  height={330}
                                  onClick={selectCategoryHandler(
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
                                <ul>
                                  <li>
                                    <span style={{ fontWeight: "bold" }}>
                                      Name:
                                    </span>{" "}
                                    {pack.pack_name}
                                  </li>
                                  <li>
                                    <span style={{ fontWeight: "bold" }}>
                                      PN:
                                    </span>{" "}
                                    200V-
                                  </li>
                                  <li>
                                    <span style={{ fontWeight: "bold" }}>
                                      ID:
                                    </span>{" "}
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
                            </li>
                          )
                          // ---
                        }
                      </ul>
                    ))}
                </div>
              </div>
            ))}
          {/* 
          {bus_table_filtered &&
            bus_table_filtered
              .sort((a, b) => (a.pack_name < b.pack_name ? -1 : 1))
              .map((pack) => <div key={pack.pack_id}>{pack.pack_id}</div>)} */}

          {!showGroupView && (
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
                {!!bus_table_filtered &&
                  bus_table_filtered
                    .sort((a, b) => (a.pack_name < b.pack_name ? -1 : 1))
                    .map((pack) => (
                      <li key={pack.pack_id} style={{ width: "125px" }}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Image
                            className={styles.card1}
                            src={pack.pack_image_url}
                            alt="Busbar Image"
                            width={125}
                            height={330}
                            priority
                            onClick={selectCategoryHandler(
                              category_name,
                              pack.pack_id
                            )}
                          />
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
                            <ul>
                              <li>
                                <span style={{ fontWeight: "bold" }}>
                                  Name:
                                </span>{" "}
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
          )}

          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default BusModal;
