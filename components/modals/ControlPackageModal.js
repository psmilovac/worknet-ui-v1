import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import useSWR from "swr";
import styles from "./ControlPackageModal.module.css";
import Image from "next/image";
import Button from "../ui/buttons/Button";
import ButtonCancel from "../ui/buttons/ButtonCancel";
import Link from "next/link";
import axios from "axios";
import { api_root } from "@/global/global_vars";

const fetcher1 = (url, token) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

const ControlPackageModal = ({
  onClose,
  children,
  pack_table,
  unit1,
  setSharedControlPackageState,
  accessToken,
}) => {
  // console.log("unit1:", unit1);
  // console.log("pack_table:", pack_table);
  const title = "Controls";
  const control_package_category = 118;
  const quote_shallow_api = api_root + "/api/bg/quote-shallow/";
 
  // fetch quote data
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // const { data, error, isLoading } = useSWR(
  //   [pack_api, accessToken],
  //   ([pack_api, accessToken]) => fetcher1(pack_api, accessToken)
  // );

  // // useEffect(() => {
  // //   setAuthenticated(isAuthenticated);
  // // }, [isAuthenticated]);

  // // if (isLoading) return <PsSpinner />;
  // if (isLoading) return "Loading...";
  // if (error) return <div>Failed to load</div>;
  // if (!data) return <p>No profile data</p>;
  // console.log("data:", data);

  // control of show/hide html block of CPT locations
  // eg. show ctrl1 if busbar layout (bus.pack_is_ctrl1) has true values for pack_is_ctrl1
  let showControlPackage = true;
  // console.log(unit1);
  let showCtrl1 = unit1 ? unit1.bus?.pack_is_ctrl1 : false;
  let showCtrl2 = unit1 ? unit1.bus?.pack_is_ctrl2 : false;

  // does not apply
  // if (unit1 && unit1.bus) {
  //   // prevent void props
  //   showControlPackage = unit1.bus.pack_is_control_package; // pack_is_control_package does not exist
  // }

  // console.log("showControlPackage", showControlPackage);

  const [ctrl1ID, setCtrl1ID] = useState(
    unit1?.ctrl1_id > 0 ? unit1.ctrl1_id : ""
  );

  const [ctrl2ID, setCtrl2ID] = useState(
    unit1?.ctrl2_id > 0 ? unit1.ctrl2_id : ""
  );

  const [showMore, setShowMore] = useState(false);

  const [ctrl1Description, setCtrl1Description] = useState(
    ctrl1ID > 0
      ? pack_table?.find((p) => p.pack_id === ctrl1ID)?.pack_description
      : "None"
  );

  const [ctrl2Description, setCtrl2Description] = useState(
    ctrl2ID > 0
      ? pack_table?.find((p) => p.pack_id === ctrl2ID)?.pack_description
      : "None"
  );

  const [ctrl1Name, setCtrl1Name] = useState(
    ctrl1ID > 0
      ? pack_table?.find((p) => p.pack_id === ctrl1ID)?.pack_name
      : "None"
  );

  const [ctrl2Name, setCtrl2Name] = useState(
    ctrl2ID > 0
      ? pack_table?.find((p) => p.pack_id === ctrl2ID)?.pack_name
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
    setSharedControlPackageState({
      ctrl1_id: ctrl1ID > 0 ? ctrl1ID : null,
      ctrl2_id: ctrl2ID > 0 ? ctrl2ID : null,
    });
    onClose();
  };

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER   ~~~~~~~~~~~~~~~~~~~~~~~~~~

  const onCtrl1Selection = (ctrl1_id) => {
    if (ctrl1_id > 0) {
      setCtrl1Description(
        pack_table?.find((p) => p.pack_id === ctrl1_id)?.pack_description
      );
      setCtrl1Name(pack_table?.find((p) => p.pack_id === ctrl1_id)?.pack_name);
    } else {
      setCtrl1Description("None");
      setCtrl1Name("None");
    }
  };

  const onCtrl2Selection = (ctrl2_id) => {
    if (ctrl2_id > 0) {
      setCtrl2Description(
        pack_table?.find((p) => p.pack_id === ctrl2_id)?.pack_description
      );
      setCtrl2Name(pack_table?.find((p) => p.pack_id === ctrl2_id)?.pack_name);
    } else {
      setCtrl2Description("None");
      setCtrl2Name("None");
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
            {/* save for later */}
            {/* <p style={{ opacity: "0.7", margin: "0 0 1rem 0" }}>
              Description goes here...
              <br />
            </p> */}
            <br />
            {/* <p style={{ opacity: "1", margin: "0 0 1rem 0" }}></p> */}
            <ul style={{ color: "var(--focus)" }}>
              <li>
                <Link
                  href="https://selinc.com/products/700G/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {/* <Image
                    src="/circle.svg"
                    alt="circle"
                    width={15}
                    height={15}
                  /> */}
                  Sel-700GT
                </Link>
              </li>
              <li>
                <Link
                  href="https://selinc.com/products/751A/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {/* <Image
                    src="/circle.svg"
                    alt="circle"
                    width={15}
                    height={15}
                  /> */}
                  Sel-751A
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
                src={"/png/sel751A_400x400.png"}
                alt="CT Metering Class"
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

            {/* SHOW MORE - save for later */}
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
                {showControlPackage && <h3>Control Packages</h3>}
                {!showControlPackage && (
                  <div>Controls do not apply to this configuration</div>
                )}
              </section>

              {/* --------- Top Breaker --------- */}
              {showCtrl2 && (
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
                  <h4>Upper Section/Breaker</h4>
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
                    {ctrl2Description}
                  </div>

                  <div className={styles.info_text}>Control Package:</div>
                  <select
                    className={styles.form_select}
                    value={ctrl2ID}
                    onChange={(e) => {
                      setCtrl2ID(Number(e.target.value));
                      onCtrl2Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === control_package_category)
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
              {showCtrl1 && (
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
                  <h4>Lower Section/Breaker</h4>
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
                    {ctrl1Description}
                  </div>

                  <div className={styles.info_text}>Control Package:</div>
                  <select
                    className={styles.form_select}
                    value={ctrl1ID}
                    onChange={(e) => {
                      setCtrl1ID(Number(e.target.value));
                      onCtrl1Selection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === control_package_category)
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

              {/* --------- Control Packages Selection --------- */}
              {/* {showControlPackage && (
                <div className={styles.dropdown_box}>
                 
                  <div style={{ display: "flex", margin: "0 0 1rem 0" }}>
                    
                  </div>

                  <div className={styles.info_text}>Name:</div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {controlPackageName}
                  </div>
                  <div className={styles.info_text}>Description:</div>
                  <div
                    style={{
                      opacity: "0.9",
                      margin: "0 0 1rem 0",
                      fontSize: "0.8",
                    }}
                  >
                    {controlPackageDescription}
                  </div>

                  <div className={styles.info_text}>
                    Control Package:
                  </div>
                  <select
                    className={styles.form_select}
                    value={controlPackageID}
                    onChange={(e) => {
                      setControlPackageID(Number(e.target.value));
                      onControlPackageSelection(Number(e.target.value));
                    }}
                  >
                    <option value={""}>{"None"}</option>
                    {pack_table
                      .filter((p) => p.category_id === control_package_category)
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
              <br /> */}

              {/* --------- SAVE/CANCEL Buttons --------- */}
              <section>
                {showControlPackage && (
                  <span style={{ margin: "0 1rem 0 0" }}>
                    <Button type="button" onClick={onFormSubmit}>
                      Save
                    </Button>
                  </span>
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

export default ControlPackageModal;
