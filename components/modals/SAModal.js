import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "./SAModal.module.css";
import Image from "next/image";
import Button from "../ui/buttons/Button";
import ButtonCancel from "../ui/buttons/ButtonCancel";
import Link from "next/link";

const SAModal = ({
  onClose,
  children,
  pack_table,
  unit1,
  setSharedSAState,
}) => {
  const title = "Surge Arrester";
  const category_id = 260; // Surge Arrester Group for drop down menu

  // console.log(unit1);

  // Ground CT can be mounted only on the cable entry
  let showSa1 = unit1.bus?.pack_is_cable1 || unit1.bus?.pack_is_cable2;
  let showSa2 = unit1.bus?.pack_is_cable3 || unit1.bus?.pack_is_cable4;

  // console.log("unit1.bus", unit1.bus);

  const [sa1ID, setSa1ID] = useState(unit1?.sa1_id > 0 ? unit1.sa1_id : "");

  const [sa2ID, setSa2ID] = useState(unit1?.sa2_id > 0 ? unit1.sa2_id : "");

  const [showMore, setShowMore] = useState(false);

  const [sa1Description, setSa1Description] = useState(
    sa1ID > 0
      ? pack_table?.find((p) => p.pack_id === sa1ID)?.pack_description
      : "None"
  );

  const [sa2Description, setSa2Description] = useState(
    sa2ID > 0
      ? pack_table?.find((p) => p.pack_id === sa2ID)?.pack_description
      : "None"
  );

  const [sa1Name, setSa1Name] = useState(
    sa1ID > 0
      ? pack_table?.find((p) => p.pack_id === sa1ID)?.pack_name
      : "None"
  );

  const [sa2Name, setSa2Name] = useState(
    sa2ID > 0
      ? pack_table?.find((p) => p.pack_id === sa2ID)?.pack_name
      : "None"
  );

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
  const onCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  //~~~~~~~~~~~~~~~~~~~ MODAL END ~~~~~~~~~~~~~~~~~~~~~~~~~~

  const onFormSubmit = (e) => {
    e.preventDefault();
    setSharedSAState({
      sa1_id: sa1ID > 0 ? sa1ID : null,
      sa2_id: sa2ID > 0 ? sa2ID : null,
    });
    // console.log("sa1ID", sa1ID)
    // console.log("sa2ID", sa2ID)
    onClose();
  };

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER   ~~~~~~~~~~~~~~~~~~~~~~~~~~

  const onSa1Selection = (sa1_id) => {
    if (sa1_id > 0) {
      setSa1Description(
        pack_table?.find((p) => p.pack_id === sa1_id)?.pack_description
      );
      setSa1Name(pack_table?.find((p) => p.pack_id === sa1_id)?.pack_name);
    } else {
      setSa1Description("None");
      setSa1Name("None");
    }
  };

  const onSa2Selection = (sa2_id) => {
    if (sa2_id > 0) {
      setSa2Description(
        pack_table?.find((p) => p.pack_id === sa2_id)?.pack_description
      );
      setSa2Name(pack_table?.find((p) => p.pack_id === sa2_id)?.pack_name);
    } else {
      setSa2Description("None");
      setSa2Name("None");
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
            {/* <p style={{ opacity: "0.7", margin: "0 0 1rem 0" }}>
              Description goes here...
              <br />
            </p> */}
            <br />
            {/* <p style={{ opacity: "1", margin: "0 0 1rem 0" }}></p> */}
            <ul style={{ color: "var(--focus)" }}>
              <li>
                <Link
                  href="https://www.gegridsolutions.com/products/brochures/arrestertranquelldistpolyriser.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {/* <Image
                    src="/circle.svg"
                    alt="circle"
                    width={15}
                    height={15}
                  /> */}
                  GE Tranquell 9L20 series
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.gegridsolutions.com/products/brochures/arrestertranquellpolyporc.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {/* <Image
                    src="/circle.svg"
                    alt="circle"
                    width={15}
                    height={15}
                  /> */}
                  GE Tranquell 9L12 series
                </Link>
              </li>
             <li>
                <Link
                  href="https://www.gegridsolutions.com/products/brochures/arrestertranquellpolyporc.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {/* <Image
                    src="/circle.svg"
                    alt="circle"
                    width={15}
                    height={15}
                  /> */}
                  GE Tranquell 9L11 series
                </Link>
              </li>
            </ul>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 0 1rem 0",
              }}
            >
              <br />
              {/* <Link
                href="https://selinc.com/api/download/10734/"
                rel="noopener noreferrer"
                target="_blank"
              > */}
              <Image
                src={"/png/SAx2sm.png"}
                alt="Gground CT"
                width={200} // this should match with column width
                height={200}
              />
              {/* </Link> */}
              {/* <Link
                href="https://selinc.com/api/download/10734/"
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "var(--focus)" }}
              >
                Controls
              </Link> */}
            </div>
            {/* SHOW MORE - save for latter */}
            {/* {showMore && (
              <div
                style={{
                  opacity: "0.7",
                  margin: "0 0 1rem 0",
                  fontSize: "0.9rem",
                }}
              >
                <ul>
                  <li>Bullet point 1...</li>
                  <li>Bullet point 2...</li>
                </ul>
              </div>
            )}
            <button
              className={styles.more}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </button> */}
            {/* ---------MAIN FORM--------- */}
            <form onSubmit={onFormSubmit} style={{ margin: "2rem 0 10rem 0" }}>
              {/* --------- Title --------- */}
              <section>
                {(showSa1 || showSa2) && <h3>Surge Arrester</h3>}
                {!showSa1 && !showSa2 && (
                  <div>Surge Arresters CTs do not apply to this configuration</div>
                )}
              </section>

              {/* --------- Top GCT --------- */}
              {showSa2 && (
                <div className={styles.dropdown_box}>
                  {/* <h4 style={{ margin: "1rem 0 0rem 0" }}>
                    Options
                    <br />
                  </h4> */}
                  {/* <div className={styles.info_text}>
                    Text...
                    <br />
                    Example:
                  </div> */}
                  <div style={{ display: "flex", margin: "0 0 1rem 0" }}>
                    {/* <Image
                      src={"/bg1_cpt_location2.svg"}
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
                  <h4>Surge Arrester - Upper Cable Connection</h4>
                  <br />
                  {/* <div className={styles.info_text}>Name:</div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {ctrl2Name}
                  </div> */}
                  <div className={styles.info_text}>Description:</div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {sa2Description}
                  </div>

                  <div className={styles.info_text}>Surge Arrester:</div>
                  <select
                    className={styles.form_select}
                    value={sa2ID}
                    onChange={(e) => {
                      setSa2ID(Number(e.target.value));
                      onSa2Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === category_id)
                      .sort((a, b) => (a.pack_name < b.pack_name ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <br />
                </div>
              )}
              <br />

              {/* --------- Bottom Breaker --------- */}
              {showSa1 && (
                <div className={styles.dropdown_box}>
                  {/* <h4 style={{ margin: "1rem 0 0rem 0" }}>
                    Options
                    <br />
                  </h4> */}
                  {/* <div className={styles.info_text}>
                    Text...
                    <br />
                    Example:
                  </div> */}
                  <div style={{ display: "flex", margin: "0 0 1rem 0" }}>
                    {/* <Image
                      src={"/bg1_cpt_location2.svg"}
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
                  <h4>Surger Arrester - Lower Cable Connection</h4>
                  <br />
                  {/* <div className={styles.info_text}>Name:</div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {ctrl1Name}
                  </div> */}
                  <div className={styles.info_text}>Description:</div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {sa1Description}
                  </div>

                  <div className={styles.info_text}>Control Package:</div>
                  <select
                    className={styles.form_select}
                    value={sa1ID}
                    onChange={(e) => {
                      setSa1ID(Number(e.target.value));
                      onSa1Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === category_id)
                      .sort((a, b) => (a.pack_name < b.pack_name ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <br />
                </div>
              )}
              <br />

              {/* --------- SAVE/CANCEL Buttons --------- */}
              <section>
                {(showSa1 || showSa2) && (
                  <span style={{margin:"0 1rem 0 0"}}><Button type="button" onClick={onFormSubmit}>
                    Save
                  </Button></span>
                )}
                <ButtonCancel type="button" onClick={onCancel}>
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

export default SAModal;
