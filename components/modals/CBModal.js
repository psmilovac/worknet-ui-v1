import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "./CBModal.module.css";
import Image from "next/image";
import Button from "../ui/buttons/Button";
import ButtonCancel from "../ui/buttons/ButtonCancel";
import Link from "next/link";
import { api_root } from "@/global/global_vars";

const CBModal = ({
  onClose,
  children,
  pack_table,
  unit1,
  setSharedCBState,
}) => {
  // Circuit Breaker (CB) on the back end is BRK (from breaker)
  // console.log("unit1.brk1:", unit1.brk1.pack_description);
  const title = "Circuit Breakers";
  const brk_category = 200;

  const [brk1, setBrk1] = useState(unit1.brk1_id > 0 ? unit1.brk1_id : ""); // just send from the parent the records for the unit: cb1_id, cb2_id ...
  const [brk2, setBrk2] = useState(unit1.brk2_id > 0 ? unit1.brk2_id : "");
  const [brk1Description, setBrk1Description] = useState(
    unit1.brk1?.pack_description !== "" ? unit1.brk1?.pack_description : ""
  );
  const [brk2Description, setBrk2Description] = useState(
    unit1.brk2?.pack_description !== "" ? unit1.brk2?.pack_description : ""
  );
  const [brk1Designation, setBrk1Designation] = useState(
    unit1.brk1_designation !== "" ? unit1.brk1_designation : ""
  );
  const [brk2Designation, setBrk2Designation] = useState(
    unit1.brk2_designation !== "" ? unit1.brk2_designation : ""
  );
  const [category, setCategory] = useState(null);
  const [showMore, setShowMore] = useState(false);

  // control of show/hide html block of Upper and Lower breaker (same as CTModal)
  // if busbar layout (bus.pack) has true values for pack_is_brk1 and pack_is_brk2, show
  let showBrk1 = false;
  let showBrk2 = false;
  if (unit1 && unit1.bus) {
    // prevent void props
    showBrk1 = unit1.bus.pack_is_brk1; // show UPPER breaker selection
    showBrk2 = unit1.bus.pack_is_brk2; // show LOWER breaker selection
  }

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
  const onCBModalCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  //~~~~~~~~~~~~~~~~~~~ MODAL END ~~~~~~~~~~~~~~~~~~~~~~~~~~

  const onCBModalFormSubmit = (e) => {
    e.preventDefault();
    setSharedCBState({
      brk1_id: brk1 > 0 ? brk1 : null,
      brk2_id: brk2 > 0 ? brk2 : null,
      brk1_designation: brk1Designation !== "" ? brk1Designation : null,
      brk2_designation: brk2Designation !== "" ? brk2Designation : null,
    });
    onClose();
  };

  const onBrk1Selection = (brk1_id) => {
    if (brk1_id > 0) {
      const pack_obj = pack_table?.find((p) => p.pack_id === brk1_id);
      setBrk1Description(pack_obj?.pack_description);
    } else {
      setBrk1Description("None");
      setBrk1Designation("");
    }
  };

  const onBrk2Selection = (brk2_id) => {
    if (brk2_id > 0) {
      const pack_obj = pack_table?.find((p) => p.pack_id === brk2_id);
      setBrk2Description(pack_obj?.pack_description);
    } else {
      setBrk2Description("None");
      setBrk2Designation("");
    }
  };

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
              The ADVAC series is a complete line of ANSI-rated vacuum circuit
              breakers with a spring-charged mechanism offering power
              distribution system customers the advantages of the latest
              technology with a modular design that is easily maintainable.
              <br />
            </p>
            <p style={{ opacity: "1", margin: "0 0 1rem 0" }}></p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 0 1rem 0",
              }}
            >
              <Link
                href="https://library.e.abb.com/public/435bb50fe45944c4a69e5f7682b98292/ADVAC%20Tech%20Guide%201VAL050501-TG%20Rev%20B.pdf?x-sign=y0KgLs80q/7sM7d4hyWO2T6ooWQtZAzUYwwH+W/GLzzRXqYlrNKcRkSL8QndBgi3.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  src={"/png/ADVAC_15kV_1_400x400.jpg"}
                  alt="CT Metering Class"
                  width={350} // this should match with column width
                  height={300}
                />
              </Link>
              <Link
                href="https://library.e.abb.com/public/435bb50fe45944c4a69e5f7682b98292/ADVAC%20Tech%20Guide%201VAL050501-TG%20Rev%20B.pdf?x-sign=y0KgLs80q/7sM7d4hyWO2T6ooWQtZAzUYwwH+W/GLzzRXqYlrNKcRkSL8QndBgi3.pdf"
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "var(--focus)" }}
              >
                ADVAC Circuit Breaker 5kV through 15kV
              </Link>
            </div>

            {showMore && (
              <p style={{ opacity: "0.7", margin: "0 0 1rem 0" }}>
                <ul>
                  <li>
                    <Image
                      src="/circle.svg"
                      alt="circle"
                      width={15}
                      height={15}
                    />
                    5kV, through 15 kV, heavy duty breaker rated at 1200 A,
                    continuous current and up to 50 kA interrupting current
                  </li>
                  <li>
                    <Image
                      src="/circle.svg"
                      alt="circle"
                      width={15}
                      height={15}
                    />
                    Safety features include standard built-in mechanical
                    anti-pumping device, KIRK key, padlocking, push-button cover
                    provisions and closed-door racking
                  </li>
                  <li>
                    <Image
                      src="/circle.svg"
                      alt="circle"
                      width={15}
                      height={15}
                    />
                    Roll of floor feature include additional set of wheel for
                    moving the breaker on the ground.
                  </li>
                </ul>
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
              onSubmit={onCBModalFormSubmit}
              style={{ margin: "2rem 0 10rem 0" }}
            >
              {/* --------- Title --------- */}
              <section>
                {(showBrk1 || showBrk2) && <h3>Circuit Breakers Options</h3>}
                {!showBrk1 && !showBrk2 && (
                  <div>Circuit breakers do not apply to this configuration</div>
                )}
              </section>

              {/* --------- Upper Position --------- */}
              {showBrk2 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: "1rem 0 0rem 0" }}>Upper Compartment</h4>
                  <div className={styles.info_text}>
                    <br />
                    Example:
                  </div>
                  <div style={{ display: "flex" }}>
                    <Image
                      src={
                        api_root + "/images/onelines/bg15/M1.svg"
                      }
                      alt="CPT Lower Compartment Location"
                      width={113}
                      height={300}
                      style={{
                        margin: "1rem auto",
                        boxShadow:
                          "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                        background: "white",
                      }}
                    />

                    {/* <Image
                      src={
                        api_root + "/images/onelines/bg15/bg1_comp_f.svg"
                      }
                      alt="CPT Lower Compartment Location"
                      width={113}
                      height={300}
                      style={{
                        margin: "1rem auto",
                        boxShadow:
                          "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                        background: "white",
                      }}
                    /> */}
                  </div>
                  <br />
                  <div className={styles.info_text}>
                    Selected Circuit Breaker - Description:
                  </div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {brk2Description}
                  </div>

                  <div className={styles.info_text}>
                    Select Circuit Breaker:
                  </div>
                  <select
                    className={styles.form_select}
                    value={brk2}
                    onChange={(e) => {
                      setBrk2(Number(e.target.value));
                      onBrk2Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === brk_category)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <div className={styles.info_text}>Select Designation:</div>
                  <select
                    className={styles.form_select}
                    value={brk2Designation}
                    onChange={(e) => {
                      setBrk2Designation(e.target.value);
                      // Cpt1ClearHandler(e.target.value);
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    <option value={"52-BESS"}>{"52-BESS"}</option>
                    <option value={"52-BESS1"}>{"52-BESS1"}</option>
                    <option value={"52-BESS2"}>{"52-BESS2"}</option>
                    <option value={"52-BESS3"}>{"52-BESS3"}</option>
                    <option value={"52-F"}>{"52-F"}</option>
                    <option value={"52-F1"}>{"52-F1"}</option>
                    <option value={"52-F2"}>{"52-F2"}</option>
                    <option value={"52-F3"}>{"52-F3"}</option>
                    <option value={"52-F4"}>{"52-F4"}</option>
                    <option value={"52-F5"}>{"52-F5"}</option>
                    <option value={"52-F6"}>{"52-F6"}</option>
                    <option value={"52-F7"}>{"52-F7"}</option>
                    <option value={"52-F8"}>{"52-F8"}</option>
                    <option value={"52-F9"}>{"52-F9"}</option>
                    <option value={"52-F10"}>{"52-F10"}</option>
                    <option value={"52-GT"}>{"52-GT"}</option>
                    <option value={"52-GT1"}>{"52-GT1"}</option>
                    <option value={"52-GT2"}>{"52-GT2"}</option>
                    <option value={"52-GT3"}>{"52-GT3"}</option>
                    <option value={"52-M"}>{"52-M"}</option>
                    <option value={"52-M1"}>{"52-M1"}</option>
                    <option value={"52-M2"}>{"52-M2"}</option>
                    <option value={"52-M3"}>{"52-M3"}</option>
                    <option value={"52-PV"}>{"52-PV"}</option>
                    <option value={"52-PV1"}>{"52-PV1"}</option>
                    <option value={"52-PV2"}>{"52-PV2"}</option>
                    <option value={"52-PV3"}>{"52-PV3"}</option>
                    <option value={"52-Spare"}>{"52-Spare"}</option>
                    <option value={"52-T"}>{"52-T"}</option>
                    <option value={"52-T1"}>{"52-T1"}</option>
                    <option value={"52-T2"}>{"52-T2"}</option>
                    <option value={"52-T3"}>{"52-T3"}</option>
                    <option value={"52-UT"}>{"52-UT"}</option>
                    <option value={"52-UT1"}>{"52-UT1"}</option>
                    <option value={"52-UT2"}>{"52-UT2"}</option>
                  </select>
                  <br />
                </div>
              )}
              <br />

              {/* --------- Lower Position --------- */}
              {showBrk1 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: "1rem 0 0rem 0" }}>Lower Compartment</h4>
                  <div className={styles.info_text}>
                    <br />
                    Example:
                  </div>
                  <div style={{ display: "flex" }}>
                    <Image
                      src={
                        api_root + "/images/onelines/bg15/H1.svg"
                      }
                      alt="CPT Lower Compartment Location"
                      width={113}
                      height={300}
                      style={{
                        margin: "1rem auto",
                        boxShadow:
                          "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                        background: "white",
                      }}
                    />
                    {/* <Image
                      src={
                        api_root + "/images/onelines/bg15/bg1_comp_d.svg"
                      }
                      alt="CPT Lower Compartment Location"
                      width={113}
                      height={300}
                      style={{
                        margin: "1rem auto",
                        boxShadow:
                          "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                        background: "white",
                      }}
                    /> */}
                  </div>

                  <br />
                  <div className={styles.info_text}>
                    Selected Circuit Breaker - Description:
                  </div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {brk1Description}
                  </div>
                  <div className={styles.info_text}>
                    Select Circuit Breaker:
                  </div>

                  <select
                    className={styles.form_select}
                    value={brk1}
                    onChange={(e) => {
                      setBrk1(Number(e.target.value));
                      onBrk1Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === brk_category)
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>

                  <div className={styles.info_text}>Select Designation:</div>
                  <select
                    className={styles.form_select}
                    value={brk1Designation}
                    onChange={(e) => {
                      setBrk1Designation(e.target.value);
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    <option value={"52-BESS"}>{"52-BESS"}</option>
                    <option value={"52-BESS1"}>{"52-BESS1"}</option>
                    <option value={"52-BESS2"}>{"52-BESS2"}</option>
                    <option value={"52-BESS3"}>{"52-BESS3"}</option>
                    <option value={"52-F"}>{"52-F"}</option>
                    <option value={"52-F1"}>{"52-F1"}</option>
                    <option value={"52-F2"}>{"52-F2"}</option>
                    <option value={"52-F3"}>{"52-F3"}</option>
                    <option value={"52-F4"}>{"52-F4"}</option>
                    <option value={"52-F5"}>{"52-F5"}</option>
                    <option value={"52-F6"}>{"52-F6"}</option>
                    <option value={"52-F7"}>{"52-F7"}</option>
                    <option value={"52-F8"}>{"52-F8"}</option>
                    <option value={"52-F9"}>{"52-F9"}</option>
                    <option value={"52-F10"}>{"52-F10"}</option>
                    <option value={"52-GT"}>{"52-GT"}</option>
                    <option value={"52-GT1"}>{"52-GT1"}</option>
                    <option value={"52-GT2"}>{"52-GT2"}</option>
                    <option value={"52-GT3"}>{"52-GT3"}</option>
                    <option value={"52-M"}>{"52-M"}</option>
                    <option value={"52-M1"}>{"52-M1"}</option>
                    <option value={"52-M2"}>{"52-M2"}</option>
                    <option value={"52-M3"}>{"52-M3"}</option>
                    <option value={"52-PV"}>{"52-PV"}</option>
                    <option value={"52-PV1"}>{"52-PV1"}</option>
                    <option value={"52-PV2"}>{"52-PV2"}</option>
                    <option value={"52-PV3"}>{"52-PV3"}</option>
                    <option value={"52-Spare"}>{"52-Spare"}</option>
                    <option value={"52-T"}>{"52-T"}</option>
                    <option value={"52-T1"}>{"52-T1"}</option>
                    <option value={"52-T2"}>{"52-T2"}</option>
                    <option value={"52-T3"}>{"52-T3"}</option>
                    <option value={"52-UT"}>{"52-UT"}</option>
                    <option value={"52-UT1"}>{"52-UT1"}</option>
                    <option value={"52-UT2"}>{"52-UT2"}</option>
                  </select>
                  <br />
                </div>
              )}

              <br />

              {/* --------- SAVE/CANCEL BUTTONS --------- */}
              <section>
                {(showBrk1 || showBrk2) && (
                  <span style={{ margin: "0 1rem 0 0" }}>
                    <Button type="button" onClick={onCBModalFormSubmit}>
                      Save
                    </Button>
                  </span>
                )}
                <ButtonCancel type="button" onClick={onCBModalCancel}>
                  Cancel
                </ButtonCancel>
              </section>
            </form>

            {/* <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "start",
                justifyContent: "start",
                gap: "2rem",
              }}
            >
              {!!pack_table &&
                pack_table
                  .filter(
                    (pack_table_filtered) =>
                      pack_table_filtered.category_id === category_id
                  )
                  .sort((a, b) => (a.pack_name < b.pack_name ? -1 : 1))
                  .map((pack) => (
                    <li
                      key={pack.pack_id}
                      className={styles.card1}
                      style={{ width: "125px" }}
                    >
                      <Image
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
                          fontSize: "0.9rem",
                          // width: "100%",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                          padding: "1rem",
                        }}
                        onClick={selectCategoryHandler(
                          category_name,
                          pack.pack_id
                        )}
                      >
                        {pack.pack_name}
                      </div>
                      
                      <div
                        style={{
                          fontSize: "0.9rem",
                          margin: "0.5rem 0 0.5rem 0",
                        }}
                      >
                        id:{pack.pack_id}
                      </div>
                    </li>
                  ))}
            </ul> */}
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CBModal;
