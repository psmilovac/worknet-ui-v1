import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "./CTModal.module.css";
import Image from "next/image";
import Button from "../ui/buttons/Button";
import ButtonCancel from "../ui/buttons/ButtonCancel";
import Link from "next/link";

const CTModal = ({
  onClose,
  children,
  pack_table,
  unit1,
  setSharedCTState,
}) => {
  const title = "Current Transformers";
  const metering_class_ct = 210; // used for filtering the pack_table
  const relay_class_ct = 211; // used for filtering the pack_table

  // control of show/hide html block of Upper and Lower breaker CT selection (same as CBModal)
  // if busbar layout (bus.pack) has true values for pack_is_brk1 and pack_is_brk2, show
  let showBrk1 = false;
  let showBrk2 = false;
  if (unit1 && unit1.bus) {
    // prevent void props
    showBrk1 = unit1.bus.pack_is_brk1; // show UPPER breaker selection
    showBrk2 = unit1.bus.pack_is_brk2; // show LOWER breaker selection
  }

  const [ct1, setCt1] = useState(unit1.ct1_id > 0 ? unit1.ct1_id : ""); // from the parent the records
  const [ct2, setCt2] = useState(unit1.ct2_id > 0 ? unit1.ct2_id : ""); // value prop cannot be null on select options
  const [ct3, setCt3] = useState(unit1.ct3_id > 0 ? unit1.ct3_id : "");
  const [ct4, setCt4] = useState(unit1.ct4_id > 0 ? unit1.ct4_id : "");
  const [ct5, setCt5] = useState(unit1.ct5_id > 0 ? unit1.ct5_id : "");
  const [ct6, setCt6] = useState(unit1.ct6_id > 0 ? unit1.ct6_id : "");
  const [ct7, setCt7] = useState(unit1.ct7_id > 0 ? unit1.ct7_id : "");
  const [ct8, setCt8] = useState(unit1.ct8_id > 0 ? unit1.ct8_id : "");
  const [ct9, setCt9] = useState(unit1.ct9_id > 0 ? unit1.ct9_id : "");
  const [ct10, setCt10] = useState(unit1.ct10_id > 0 ? unit1.ct10_id : "");
  const [ct11, setCt11] = useState(unit1.ct11_id > 0 ? unit1.ct11_id : "");
  const [ct12, setCt12] = useState(unit1.ct12_id > 0 ? unit1.ct12_id : "");
  const [showMore, setShowMore] = useState(false);

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
  const onCTModalCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  //~~~~~~~~~~~~~~~~~~~ MODAL END ~~~~~~~~~~~~~~~~~~~~~~~~~~

  const onCTModalFormSubmit = (e) => {
    e.preventDefault();
    setSharedCTState({
      ct1_id: ct1 > 0 ? ct1 : null,
      ct2_id: ct2 > 0 ? ct2 : null,
      ct3_id: ct3 > 0 ? ct3 : null,
      ct4_id: ct4 > 0 ? ct4 : null,
      ct5_id: ct5 > 0 ? ct5 : null,
      ct6_id: ct6 > 0 ? ct6 : null,
      ct7_id: ct7 > 0 ? ct7 : null,
      ct8_id: ct8 > 0 ? ct8 : null,
      ct9_id: ct9 > 0 ? ct9 : null,
      ct10_id: ct10 > 0 ? ct10 : null,
      ct11_id: ct11 > 0 ? ct11 : null,
      ct12_id: ct12 > 0 ? ct12 : null,
    });
    onClose();
  };

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER - Breaker 1, Lower Phases  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const Ct1ClearHandler = (value) => {
    if (value) {
      setCt3(""); // metering class
    }
  };

  const Ct2ClearHandler = (value) => {
    if (value) {
      setCt3(""); // metering class
    }
  };

  const Ct3ClearHandler = (value) => {
    if (value) {
      setCt1(""); // relay class
      setCt2(""); // relay class
    }
  };

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER - Breaker 1, Upper Phases  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // this one is flipped ct4 with ct6 brecause the way it is presented on the screen

  const Ct6ClearHandler = (value) => {
    // metering class
    if (value) {
      setCt4("");
    }
  };

  const Ct5ClearHandler = (value) => {
    // metering class
    if (value) {
      setCt4("");
    }
  };

  const Ct4ClearHandler = (value) => {
    // relay class
    if (value) {
      setCt6("");
      setCt5("");
    }
  };

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER - Upper Breaker, Lower Phases  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const Ct7ClearHandler = (value) => {
    if (value) {
      setCt9("");
    }
  };

  const Ct8ClearHandler = (value) => {
    if (value) {
      setCt9("");
    }
  };

  const Ct9ClearHandler = (value) => {
    if (value) {
      setCt7("");
      setCt8("");
    }
  };

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER - Breaker 1, Upper Phases  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // this one is flipped ct4 with ct6 brecause the way it is presented on the screen

  const Ct12ClearHandler = (value) => {
    // metering class
    if (value) {
      setCt10("");
    }
  };

  const Ct11ClearHandler = (value) => {
    // metering class
    if (value) {
      setCt10("");
    }
  };

  const Ct10ClearHandler = (value) => {
    // relay class
    if (value) {
      setCt12("");
      setCt11("");
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
              The current transformers (CTs) are installed on the circuit
              breaker bushings. Each set has three CTs - one per phase. <br />
              <br />
            </p>
            <p style={{ opacity: "0.7" }}>On each location you can install:</p>
            <ul style={{ opacity: "0.7" }}>
              <li>
                <Image src="/circle.svg" alt="circle" width={15} height={15} />
                Two sets of metering class transformers <u>or</u>
              </li>
              <li>
                <Image src="/circle.svg" alt="circle" width={15} height={15} />
                One set of relay class transformer
              </li>
            </ul>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                margin: "0 0 1rem 0",
              }}
            >
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Link
                        href="http://amranit.com/userfiles/product/catalog_pdf/CT342.pdf"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Image
                          src={"/png/CT-M.png"}
                          alt="CT Metering Class"
                          width={200} // this should match with column width
                          height={250}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link
                        href="http://amranit.com/userfiles/product/catalog_pdf/CT344.pdf"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Image
                          src={"/png/CT-R.png"}
                          alt="CT Metering Class"
                          width={170} // this should match with column width
                          height={250}
                        />
                      </Link>
                    </td>
                  </tr>
                  <tr
                    style={{
                      textAlign: "center",
                      fontSize: "0.9rem",
                      opacity: "0.8",
                    }}
                  >
                    <td>
                      <Link
                        href="http://amranit.com/userfiles/product/catalog_pdf/CT342.pdf"
                        rel="noopener noreferrer"
                        target="_blank"
                        style={{ color: "var(--focus)" }}
                      >
                        Metering Class, CT-M
                      </Link>
                    </td>
                    <td>
                      <Link
                        href="http://amranit.com/userfiles/product/catalog_pdf/CT344.pdf"
                        rel="noopener noreferrer"
                        target="_blank"
                        style={{ color: "var(--focus)" }}
                      >
                        Relay Class, CT-R
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {showMore && (
              <p style={{ opacity: "0.7", margin: "0 0 1rem 0" }}>
                <b>Metering class</b> transformers are designed to saturate at
                25% above the nominal current level. They are mainly used for
                metering, but they can be used for protection too.
                <br />
                <br />
                <b>Relay class</b> transformers are designed at 20 times the
                rated current with +/- 10% accuracy to withstand short circuit
                current peak value. They have larger cores than metering class
                transformers and they are selected based on following equation:
                <br />
                <br />
                20 • (Rated Secondary Current) • (Burden) = Relay Class Rating
                <br />
                Example: 20 • (5 amps) • (1.0 Ohm Burden) = C100
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
              onSubmit={onCTModalFormSubmit}
              style={{ margin: "2rem 0 10rem 0" }}
            >
              {/* LOWER BREAKER, BRK1 */}
              {(showBrk1 || showBrk2) && <h3>Current Transformers Options</h3>}
              {!showBrk1 && !showBrk2 && (
                <div style={{ margin: "0 0 1rem 0" }}>
                  Current transformers do not apply to this configuration
                </div>
              )}

              {/* UPPER BREAKER, BRK2 */}
              {/* ---------Upper BREAKER, Load Side --------- */}
              {showBrk2 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: "1rem 0 0rem 0" }}>
                    Upper Breaker, Upper Side
                  </h4>
                  <span className={styles.info_text}>
                    The CTs are mount on the upper side of a circuit breaker,
                    example:
                  </span>
                  <Image
                    src={"/BG15_CT_Location4_w.svg"}
                    alt="CT Metering Class"
                    width={113}
                    height={300}
                    style={{
                      margin: "1rem auto",
                      boxShadow:
                        "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <div className={styles.info_text}>Metering Class, CT-M</div>
                  <select
                    className={styles.form_select}
                    value={ct11}
                    name="ct11"
                    onChange={(e) => {
                      setCt11(Number(e.target.value));
                      Ct11ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === metering_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <select
                    className={styles.form_select}
                    value={ct12}
                    name="ct12"
                    onChange={(e) => {
                      setCt12(Number(e.target.value));
                      Ct12ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === metering_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <div className={styles.info_text}>Relay Class, CT-R</div>
                  <select
                    style={{ margin: "0.5rem 0 2rem 0" }}
                    className={styles.form_select}
                    value={ct10}
                    name="ct10"
                    onChange={(e) => {
                      setCt10(Number(e.target.value));
                      Ct10ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === relay_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
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

              {/* ---------Upper BREAKER, Line Side --------- */}
              {showBrk2 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: "1rem 0 0rem 0" }}>
                    Upper Breaker, Line Side
                  </h4>
                  <span className={styles.info_text}>
                    The CTs are mount on the line side of a circuit breaker,
                    example:
                  </span>
                  <Image
                    src={"/BG15_CT_Location3_w.svg"}
                    alt="CT Metering Class"
                    width={113}
                    height={300}
                    style={{
                      margin: "1rem auto",
                      boxShadow:
                        "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <div className={styles.info_text}>Metering Class, CT-M</div>
                  <select
                    className={styles.form_select}
                    value={ct7}
                    onChange={(e) => {
                      setCt7(Number(e.target.value));
                      Ct7ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === metering_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <select
                    className={styles.form_select}
                    value={ct8}
                    onChange={(e) => {
                      setCt8(Number(e.target.value));
                      Ct8ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === metering_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <div className={styles.info_text}>Relay Class, CT-R</div>
                  <select
                    style={{ margin: "0.5rem 0 2rem 0" }}
                    className={styles.form_select}
                    value={ct9}
                    onChange={(e) => {
                      setCt9(Number(e.target.value));
                      Ct9ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === relay_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
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

              {/* LOWER BREAKER, BRK1 */}
              {/* ---------Lower Breaker, Line Side--------- */}
              {showBrk1 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: "1rem 0 0rem 0" }}>
                    Lower Breaker, Line Side
                  </h4>
                  <span className={styles.info_text}>
                    The CTs are mount on the line side of a circuit breaker,
                    example:
                  </span>
                  <Image
                    src={"/BG15_CT_Location2_w.svg"}
                    alt="CT Metering Class"
                    width={113}
                    height={300}
                    style={{
                      margin: "1rem auto",
                      boxShadow:
                        "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <div className={styles.info_text}>Metering Class, CT-M</div>
                  <select
                    className={styles.form_select}
                    value={ct5}
                    name="ct5"
                    onChange={(e) => {
                      setCt5(Number(e.target.value));
                      Ct5ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === metering_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <select
                    className={styles.form_select}
                    value={ct6}
                    name="ct6"
                    onChange={(e) => {
                      setCt6(Number(e.target.value));
                      Ct6ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === metering_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <div className={styles.info_text}>Relay Class, CT-R</div>
                  <select
                    style={{ margin: "0.5rem 0 2rem 0" }}
                    className={styles.form_select}
                    value={ct4}
                    name="ct4"
                    onChange={(e) => {
                      setCt4(Number(e.target.value));
                      Ct4ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === relay_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
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

              {/* --------- Lower BREAKER, Load Side--------- */}
              {showBrk1 && (
                <div className={styles.dropdown_box}>
                  <h4 style={{ margin: "1rem 0 0rem 0" }}>
                    Lower Breaker, Load Side
                  </h4>
                  <span className={styles.info_text}>
                    The CTs are mount on the lower side of a circuit breaker,
                    example:
                  </span>
                  <Image
                    src={"/BG15_CT_Location1_w.svg"}
                    alt="CT Metering Class"
                    width={113}
                    height={300}
                    style={{
                      margin: "1rem auto",
                      boxShadow:
                        "0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 2px 3px -3px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <div className={styles.info_text}>Metering Class, CT-M</div>
                  <select
                    className={styles.form_select}
                    value={ct1}
                    onChange={(e) => {
                      setCt1(Number(e.target.value));
                      Ct1ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === metering_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <select
                    className={styles.form_select}
                    value={ct2}
                    onChange={(e) => {
                      setCt2(Number(e.target.value));
                      Ct2ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === metering_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
                      .map((pack) => (
                        <option key={pack.pack_id} value={pack.pack_id}>
                          {pack.pack_description.length > 60
                            ? pack.pack_description.slice(0, 60) + "..."
                            : pack.pack_description}
                        </option>
                      ))}
                  </select>
                  <div className={styles.info_text}>Relay Class, CT-R</div>
                  <select
                    style={{ margin: "0.5rem 0 2rem 0" }}
                    className={styles.form_select}
                    value={ct3}
                    onChange={(e) => {
                      setCt3(Number(e.target.value));
                      Ct3ClearHandler(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === relay_class_ct)
                      .sort((a, b) => (a.pack_current < b.pack_current ? -1 : 1))
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

              {/* ---------Lower Breaker, Line Side--------- */}
              <section>
                {(showBrk1 || showBrk2) && (
                  <span style={{ margin: "0 1rem 0 0" }}>
                    <Button type="button" onClick={onCTModalFormSubmit}>
                      Save
                    </Button>
                  </span>
                )}

                <ButtonCancel type="button" onClick={onCTModalCancel}>
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

export default CTModal;
