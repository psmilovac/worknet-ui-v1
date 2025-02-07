import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "./VTModal.module.css";
import Image from "next/image";
import Button from "../ui/buttons/Button";
import ButtonCancel from "../ui/buttons/ButtonCancel";
import Link from "next/link";

// PT is the same as VT !

const VTModal = ({
  onClose,
  children,
  pack_table,
  unit1,
  setSharedVTState,
}) => {
  // console.log("pack_table", pack_table.filter(item=>item.category_id==110));

  // control of show/hide html block of Upper and Lower PT selection
  // if busbar layout (bus.pack) has true values for pack_is_pt1..., show
  let showPt1 = false;
  let showPt2 = false;
  let showPt3 = false;
  let showPt4 = false;

  if (unit1 && unit1.bus) {
    // console.log(unit1.bus);
    
    // prevent void props
    showPt1 = unit1.bus.pack_is_pt1; // show Lower PT selection
    showPt2 = unit1.bus.pack_is_pt2; // show Lower-Mid PT selection
    showPt3 = unit1.bus.pack_is_pt3; // show Upper-Mid PT selection
    showPt4 = unit1.bus.pack_is_pt4; // show Upper PT selection
  }

  // console.log(
  //   "showPt1:",
  //   showPt1,
  //   "  showPt2:",
  //   showPt2,
  //   "  showPt3:",
  //   showPt3,
  //   "  showPt4:",
  //   showPt4
  // );

  // get the PTs from the unit1
  const [pt1, setPt1] = useState(unit1.pt1_id > 0 ? unit1.pt1_id : ""); // default falue send from the parent component
  const [pt2, setPt2] = useState(unit1.pt2_id > 0 ? unit1.pt2_id : "");
  const [pt3, setPt3] = useState(unit1.pt3_id > 0 ? unit1.pt3_id : "");
  const [pt4, setPt4] = useState(unit1.pt4_id > 0 ? unit1.pt4_id : "");

  // get the PT connection
  const [pt1Connection, setPt1Connection] = useState(
    unit1.pt1_con > 0 ? unit1.pt1_con : null
  );
  const [pt2Connection, setPt2Connection] = useState(
    unit1.pt2_con > 0 ? unit1.pt2_con : null
  );
  const [pt3Connection, setPt3Connection] = useState(
    unit1.pt3_con > 0 ? unit1.pt3_con : null
  );
  const [pt4Connection, setPt4Connection] = useState(
    unit1.pt4_con > 0 ? unit1.pt4_con : null
  );

  // disable the dropdown menu for fuse if PT is not selected
  const [isPt1FuseDisabled, setIsPt1FuseDisabled] = useState(
    pt1 > 0 ? false : true
  );
  const [isPt2FuseDisabled, setIsPt2FuseDisabled] = useState(
    pt2 > 0 ? false : true
  );
  const [isPt3FuseDisabled, setIsPt3FuseDisabled] = useState(
    pt3 > 0 ? false : true
  );
  const [isPt4FuseDisabled, setIsPt4FuseDisabled] = useState(
    pt4 > 0 ? false : true
  );

  const [pt1Fuse, setPt1Fuse] = useState(
    unit1.pt1_fuse_id > 0 ? unit1.pt1_fuse_id : ""
  );
  const [pt2Fuse, setPt2Fuse] = useState(
    unit1.pt2_fuse_id > 0 ? unit1.pt2_fuse_id : ""
  );
  const [pt3Fuse, setPt3Fuse] = useState(
    unit1.pt3_fuse_id > 0 ? unit1.pt3_fuse_id : ""
  );
  const [pt4Fuse, setPt4Fuse] = useState(
    unit1.pt4_fuse_id > 0 ? unit1.pt4_fuse_id : ""
  );

  const [pt1Description, setPt1Description] = useState(
    pt1 > 0
      ? pack_table?.find((p) => p.pack_id === pt1)?.pack_description
      : "None"
  );
  const [pt2Description, setPt2Description] = useState(
    pt2 > 0
      ? pack_table?.find((p) => p.pack_id === pt2)?.pack_description
      : "None"
  );
  const [pt3Description, setPt3Description] = useState(
    pt3 > 0
      ? pack_table?.find((p) => p.pack_id === pt3)?.pack_description
      : "None"
  );
  const [pt4Description, setPt4Description] = useState(
    pt4 > 0
      ? pack_table?.find((p) => p.pack_id === pt4)?.pack_description
      : "None"
  );

  const [showMore, setShowMore] = useState(false);

  const title = "Voltage Transformers";
  const voltage_transformer = 220; // MV Voltage Transformer
  const voltage_transformer_accessory = 205; // MV Voltage Transformer accessory
  const fuse = 223; // MV Voltage Transformer fuse

  const onPt1Selection = (pt1_id) => {
    if (pt1_id > 0) {
      setPt1Description(
        pack_table?.find((p) => p.pack_id === pt1_id)?.pack_description
      );
      setIsPt1FuseDisabled(false);
    } else {
      setPt1Description(""); // clear Description
      setPt1Fuse(""); // clear fuse
      setPt1Connection("");
      setIsPt1FuseDisabled(true);
    }
  };

  const onPt2Selection = (pt2_id) => {
    if (pt2_id > 0) {
      setPt2Description(
        pack_table?.find((p) => p.pack_id === pt2_id)?.pack_description
      );
      setIsPt2FuseDisabled(false);
    } else {
      setPt2Description("None"); // clear Description
      setPt2Fuse(""); // clear fuse
      setPt2Connection("");
      setIsPt2FuseDisabled(true);
    }
  };

  const onPt3Selection = (pt3_id) => {
    if (pt3_id > 0) {
      setPt3Description(
        pack_table?.find((p) => p.pack_id === pt3_id)?.pack_description
      );
      setIsPt3FuseDisabled(false);
    } else {
      setPt3Description("None"); // clear Description
      setPt3Fuse(""); // clear fuse
      setPt3Connection("");
      setIsPt3FuseDisabled(true);
    }
  };

  const onPt4Selection = (pt4_id) => {
    if (pt4_id > 0) {
      setPt4Description(
        pack_table?.find((p) => p.pack_id === pt4_id)?.pack_description
      );
      setIsPt4FuseDisabled(false);
    } else {
      setPt4Description("None"); // clear Description
      setPt4Fuse(""); // clear fuse
      setPt4Connection("");
      setIsPt4FuseDisabled(true);
    }
  };

  //~~~~~~~~~~~~~~~~~~~ MODAL ~~~~~~~~~~~~~~~~~~~~~~~~~~
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

  // on Cancel Button
  const onVTModalCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  //~~~~~~~~~~~~~~~~~~~ MODAL END ~~~~~~~~~~~~~~~~~~~~~~~~~~

  const onVTModalFormSubmit = (e) => {
    e.preventDefault();
    setSharedVTState({
      pt1_id: Number(pt1) > 0 && Number(pt1Connection) > 0 ? Number(pt1) : null,
      pt2_id: Number(pt2) > 0 && Number(pt2Connection) > 0 ? Number(pt2) : null,
      pt3_id: Number(pt3) > 0 && Number(pt3Connection) > 0 ? Number(pt3) : null,
      pt4_id: Number(pt4) > 0 && Number(pt4Connection) > 0 ? Number(pt4) : null,
      pt1_con:
        Number(pt1) > 0 && Number(pt1Connection) > 0
          ? Number(pt1Connection)
          : null,
      pt2_con:
        Number(pt2) > 0 && Number(pt2Connection) > 0
          ? Number(pt2Connection)
          : null,
      pt3_con:
        Number(pt3) > 0 && Number(pt3Connection) > 0
          ? Number(pt3Connection)
          : null,
      pt4_con:
        Number(pt4) > 0 && Number(pt4Connection) > 0
          ? Number(pt4Connection)
          : null,
      pt1_fuse_id: Number(pt1Fuse) > 0 ? Number(pt1Fuse) : null,
      pt2_fuse_id: Number(pt2Fuse) > 0 ? Number(pt2Fuse) : null,
      pt3_fuse_id: Number(pt3Fuse) > 0 ? Number(pt3Fuse) : null,
      pt4_fuse_id: Number(pt4Fuse) > 0 ? Number(pt4Fuse) : null,
    });
    onClose();
  };

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER - Breaker 1, Lower Phases  ~~~~~~~~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER - Breaker 1, Upper Phases  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // this one is flipped ct4 with ct6 brecause the way it is presented on the screen

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER - Upper Breaker, Lower Phases  ~~~~~~~~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER - Breaker 1, Upper Phases  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // this one is flipped ct4 with ct6 brecause the way it is presented on the screen

  return ReactDOM.createPortal(
    <div className={styles.backdrop}>
      <div className={styles.container} ref={modalContainerRef}>
        {/* ---------HEADER--------- */}
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
        {/* ---------TITLE--------- */}
        <div>{title && <h1>{title}</h1>}</div>

        {/* ---------CONTENT--------- */}
        <div className={styles.content}>
          <div>
            {/* -------- TEXT --------- */}
            <p style={{ opacity: "0.7", margin: "0 0 1rem 0" }}>
              The voltage transformers, VTs (also called potential transformers,
              PTs), are installed on a drawout cart. The VT set contains three
              VTs with the secondary output connected in a "Y" (star)
              configuration.
              <br />
              <br />
            </p>
            <ul style={{ color: "var(--focus)" }}>
              <li>
                <Link
                  href="https://library.e.abb.com/public/e1448476767a4b9ba65fa692983def26/1VAP429551-DB_VIZ-75,11_April%202021.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    src="/circle.svg"
                    alt="circle"
                    width={15}
                    height={15}
                  />
                  VIZ-11, 15kV, 110kV BIL, Indoor
                </Link>
              </li>
              <li>
                <Link
                  href="https://library.e.abb.com/public/8b4bb423f9cb469598787355843f344b/1VAP429511-DB_VIY-60_Rev%20I.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    src="/circle.svg"
                    alt="circle"
                    width={15}
                    height={15}
                  />
                  VIY-60, 5kV, 60kV BIL, Indoor
                </Link>
              </li>
            </ul>
            <br />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 0 1rem 0",
              }}
            >
              <Link href="#" rel="noopener noreferrer" target="_blank">
                <Image
                  src={"/png/VIZ11.jpg"}
                  alt="Voltage Transformer"
                  width={270} // this should match with column width
                  height={270}
                />
              </Link>
              {/* <Link
                href="https://library.e.abb.com/public/e1448476767a4b9ba65fa692983def26/1VAP429551-DB_VIZ-75,11_April%202021.pdf"
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "var(--focus)" }}
              >
                Voltage Transformer Assembly
              </Link> */}
              Voltage Transformer Assembly
            </div>

            {showMore && (
              <p style={{ opacity: "0.7", margin: "0 0 1rem 0" }}>
                VIZ-11, and VIY-60 indoor voltage transformers are designed for
                service in metalclad switchgear and are used for metering,
                relaying, or control power.
                <br />
                <br />
              </p>
            )}
            <button
              className={styles.more}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </button>
            {/* ---------MAIN FORM--------- */}
            <form
              onSubmit={onVTModalFormSubmit}
              style={{ margin: "2rem 0 10rem 0" }}
            >
              {/* --------- Title  --------- */}
              <section>
                {(showPt1 || showPt2 || showPt3 || showPt4) && (
                  <h3>Voltage Transformers Options</h3>
                )}
                {!showPt1 && !showPt2 && !showPt3 && !showPt4 && (
                  <div style={{ margin: "0 0 1rem 0" }}>
                    Voltage transformers do not apply to this configuration
                  </div>
                )}
              </section>

              {/* --------- Upper --------- */}
              {showPt4 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: "1rem 0 0rem 0" }}>Upper Compartment</h4>
                  Example:
                  <Image
                    src={"/bg1_vt_location4.svg"}
                    alt="Voltage Transformer"
                    width={113}
                    height={300}
                    style={{
                      margin: "1rem auto",
                      boxShadow:
                        "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                      backgroundColor: "white",
                    }}
                  />
                  <div className={styles.info_text}>Description:</div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {pt4Description !== "" ? pt4Description : "None"}
                  </div>
                  <div className={styles.info_text}>Voltage Transformer</div>
                  <select
                    style={{ margin: "0.5rem 0 1rem 0" }}
                    className={styles.form_select}
                    value={pt4}
                    onChange={(e) => {
                      setPt4(Number(e.target.value));
                      onPt4Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === voltage_transformer)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 59
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <div className={styles.info_text}>
                    Connection to Bus Bars:
                  </div>
                  <select
                    style={{ margin: "0rem 0 1rem 0" }}
                    className={styles.form_select}
                    value={pt4Connection}
                    onChange={(e) => {
                      setPt4Connection(Number(e.target.value));
                    }}
                  >
                    <option value="">None</option>
                    {unit1.bus?.pack_is_pt41 && (
                      <option value="1">Riser</option>
                    )}
                    {unit1.bus?.pack_is_pt42 && <option value="2">Line</option>}
                    {unit1.bus?.pack_is_pt43 && (
                      <option value="3">Bottom Compartment</option>
                    )}
                    {unit1.bus?.pack_is_pt44 && (
                      <option value="4">Left Section</option>
                    )}
                    {unit1.bus?.pack_is_pt45 && (
                      <option value="5">Right Section</option>
                    )}
                  </select>
                  <div className={styles.info_text}>Fuse</div>
                  <select
                    style={{ margin: "0.5rem 0 2rem 0" }}
                    className={styles.form_select}
                    value={pt4Fuse}
                    disabled={isPt4FuseDisabled}
                    onChange={(e) => {
                      setPt4Fuse(Number(e.target.value));
                      // onPt4Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === fuse)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* --------- Upper-Mid --------- */}
              {showPt3 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: "1rem 0 0rem 0" }}>
                    Upper-Mid Compartment
                  </h4>
                  Example:
                  <Image
                    src={"/bg1_vt_location3.svg"}
                    alt="Voltage Transformer"
                    width={113}
                    height={300}
                    style={{
                      margin: "1rem auto",
                      boxShadow:
                        "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                      backgroundColor: "white",
                    }}
                  />
                  <div className={styles.info_text}>Description:</div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {pt3Description !== "" ? pt3Description : "None"}
                  </div>
                  <div className={styles.info_text}>Voltage Transformer</div>
                  <select
                    style={{ margin: "0.5rem 0 1rem 0" }}
                    className={styles.form_select}
                    value={pt3}
                    onChange={(e) => {
                      setPt3(Number(e.target.value));
                      onPt3Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === voltage_transformer)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.slice(0, 60) + "..."}
                        </option>
                      ))}
                  </select>
                  <div className={styles.info_text}>Connection to:</div>
                  <select
                    style={{ margin: "0.5rem 0 1rem 0" }}
                    className={styles.form_select}
                    value={pt3Connection}
                    onChange={(e) => {
                      setPt3Connection(Number(e.target.value));
                    }}
                  >
                    <option value="">None</option>
                    {unit1.bus?.pack_is_pt31 && (
                      <option value="1">Riser</option>
                    )}
                    {unit1.bus?.pack_is_pt32 && <option value="2">Line</option>}
                  </select>
                  <div className={styles.info_text}>Fuse</div>
                  <select
                    style={{ margin: "0.5rem 0 2rem 0" }}
                    className={styles.form_select}
                    disabled={isPt3FuseDisabled}
                    value={pt3Fuse}
                    onChange={(e) => {
                      setPt3Fuse(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === fuse)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* --------- Lower-Mid --------- */}
              {showPt2 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: "1rem 0 0rem 0" }}>
                    Lower-Mid Compartment
                  </h4>
                  Example:
                  <Image
                    src={"/bg1_vt_location2.svg"}
                    alt="Voltage Transformer"
                    width={113}
                    height={300}
                    style={{
                      margin: "1rem auto",
                      boxShadow:
                        "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                      backgroundColor: "white",
                    }}
                  />
                  <div className={styles.info_text}>Description:</div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {pt2Description !== "" ? pt2Description : "None"}
                  </div>
                  <div className={styles.info_text}>Voltage Transformer</div>
                  <select
                    style={{ margin: "0.5rem 0 1rem 0" }}
                    className={styles.form_select}
                    value={pt2}
                    onChange={(e) => {
                      setPt2(Number(e.target.value));
                      onPt2Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === voltage_transformer)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <div className={styles.info_text}>Connection</div>
                  <select
                    style={{ margin: "0.5rem 0 1rem 0" }}
                    className={styles.form_select}
                    value={pt2Connection}
                    onChange={(e) => {
                      setPt2Connection(Number(e.target.value));
                    }}
                  >
                    <option value="">None</option>
                    {unit1.bus?.pack_is_pt21 && (
                      <option value="1">Riser</option>
                    )}
                    {unit1.bus?.pack_is_pt22 && <option value="2">Line</option>}
                  </select>
                  <div className={styles.info_text}>Fuse</div>
                  <select
                    style={{ margin: "0.5rem 0 2rem 0" }}
                    className={styles.form_select}
                    value={pt2Fuse}
                    disabled={isPt2FuseDisabled}
                    onChange={(e) => {
                      setPt2Fuse(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === fuse)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* --------- Bottom --------- */}
              {showPt1 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: "1rem 0 0rem 0" }}>Lower Compartment</h4>
                  Example:
                  <Image
                    src={"/bg1_vt_location1.svg"}
                    alt="Voltage Transformer"
                    width={113}
                    height={300}
                    style={{
                      margin: "1rem auto",
                      boxShadow:
                        "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                      backgroundColor: "white",
                    }}
                  />
                  <div className={styles.info_text}>Description:</div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {pt1Description !== "" ? pt1Description : "None"}
                  </div>
                  <div className={styles.info_text}>Voltage Transformer</div>
                  <select
                    style={{ margin: "0.5rem 0 1rem 0" }}
                    className={styles.form_select}
                    value={pt1}
                    onChange={(e) => {
                      setPt1(Number(e.target.value));
                      onPt1Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === voltage_transformer)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <div className={styles.info_text}>Connection</div>
                  <select
                    style={{ margin: "0.5rem 0 1rem 0" }}
                    className={styles.form_select}
                    value={pt1Connection}
                    onChange={(e) => {
                      setPt1Connection(Number(e.target.value));
                    }}
                  >
                    <option value="">None</option>
                    {unit1.bus?.pack_is_pt11 && (
                      <option value="1">Riser</option>
                    )}
                    {unit1.bus?.pack_is_pt12 && <option value="2">Line</option>}
                    {unit1.bus?.pack_is_pt13 && (
                      <option value="3">Upper Compartment</option>
                    )}
                    {unit1.bus?.pack_is_pt14 && (
                      <option value="4">Left Section</option>
                    )}
                    {unit1.bus?.pack_is_pt15 && (
                      <option value="5">Right Section</option>
                    )}
                  </select>
                  <div className={styles.info_text}>Fuse</div>
                  <select
                    style={{ margin: "0.5rem 0 2rem 0" }}
                    className={styles.form_select}
                    value={pt1Fuse}
                    disabled={isPt1FuseDisabled}
                    onChange={(e) => {
                      setPt1Fuse(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === fuse)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* --------- SAVE/CANCEL Buttons--------- */}
              <section>
                {(showPt1 || showPt2 || showPt3 || showPt4) && (
                  <span style={{ margin: "0 1rem 0 0" }}>
                    <Button type="button" onClick={onVTModalFormSubmit}>
                      Save
                    </Button>
                  </span>
                )}
                <ButtonCancel type="button" onClick={onVTModalCancel}>
                  Cancel
                </ButtonCancel>
              </section>
            </form>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default VTModal;
