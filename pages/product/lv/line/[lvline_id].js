"use client";
import { useEffect, useContext, useState } from "react";
import ProductLayout from "@/components/layouts/ProductLayout";
import { useRouter } from "next/router";
import { api_root, category } from "@/global/global_vars";
import useSWR from "swr";
import axios from "axios";
import AuthContext from "@/components/context/AuthContext";
import SettingsContext from "@/components/context/SettingsContext";
import Link from "next/link";
import Image from "next/image";

// UI
import toast, { Toaster } from "react-hot-toast";
import PsSpinner from "@/components/ui/spinners/PsSpinner";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import NewSectionIcon from "@/components/ui/icons/NewSectionIcon";
import styles from "@/styles/styles.module.css";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import ButtonIconActive from "@/components/ui/buttons/ButtonIconActive";
import ArrowLeft from "@/components/ui/icons/ArrowLeft";
import ArrowRight from "@/components/ui/icons/ArrowRight";
import ButtonIconInactive from "@/components/ui/buttons/ButtonIconInactive";
import SingleLineIcon from "@/components/ui/icons/SingleLineIcon";
import ElevationIcon from "@/components/ui/icons/ElevationIcon";
import DollarCircleIcon from "@/components/ui/icons/DollarCircleIcon";
import LvSectionModal from "@/components/modals-lv/LvSectionModal";
import BomIcon from "@/components/ui/icons/BomIcon";
import Trashcan2Icon from "@/components/ui/icons/Trashcan2Icon";
import Clone from "@/components/ui/icons/Clone";
import CloseIcon from "@/components/ui/icons/CloseIcon";

// modals

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
// unit image size: 150px x 396px, ratio 2.64 (older options: 125 x 330, 145 x 383)

export default function Page() {
  const router = useRouter();
  const { isAuthenticated, accessToken, user } = useContext(AuthContext) || {}; // error will show without || {}
  // console.log("accessToken from Lineup1", accessToken);
  console.log("logged user_id", user?.user_id);

  // AUTH
  useEffect(() => {
    loadUser();
    // GetLvline(); //  useEffect creates reloading and jittering
    // GetLvItemTable(); // we can access then on modal opening
  }, [isAuthenticated]);

  const loadUser = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      if (!res.data) {
        // console.log("User is here", res.data.user);
        router.push("/");
      }
    } catch (error) {
      router.push("/");
      // console.log("Load user in Quotes page error:", error);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // const [lvline, setLvline] = useState();
  const [itemTable, setItemTable] = useState();
  const [showLvSectionModal, setShowLvSectionModal] = useState(true);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [sharedLvSectionState, setSharedLvSectionState] = useState(null);

  let scaling_img_coeff = 4.4;

  // User Settings Context
  const {
    showSingleLineContext,
    showFrontViewContext,
    showPriceContext,
    setShowSingleLineContext,
    setShowFrontViewContext,
    setShowPriceContext,
  } = useContext(SettingsContext);

  const lvline_id = router.query.lvline_id; //catch the lineup1 id from the route

  // page url
  const quote_url = "/product/bg15/application/quotes/";

  let bus_error_array = [null];

  // FETCH by classic approach
  // get using useEffect on the page load
  // const GetLvline = async () => {
  //   const url = api_root + "/api/lv/line/" + lvline_id;
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       "content-type": "application/json",
  //     },
  //   };
  //   if (lvline_id) {
  //     setLvline("");
  //     try {
  //       await axios.get(url, config).then((res) => setLvline(() => res.data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // console.log(lvline);

  // const GetLvItemTable = async () => {
  //   const url = api_root + "/api/lv/item";
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       "content-type": "application/json",
  //     },
  //   };
  //   try {
  //     await axios.get(url, config).then((res) => setItemTable(() => res.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(itemTable);

  // FETCH by useSWR (it lacks Bearer token)
  // Get LvLine using useSWR

  const fetcherB = (url) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
      })
      .then((res) => res.data);

  // FETCH LINEUP
  const {
    data: lvline,
    error: error_lvline,
    isLoading: is_loading_lvline,
    mutate: mutateLvLine,
  } = useSWR(api_root + "/api/lv/line-flat/" + lvline_id, fetcherB); // it is SQL flat table output
  if (is_loading_lvline) return <PsSpinner />; // fire spinner on startup
  if (!lvline) return <p>No lineup profile data</p>;
  if (error_lvline) return <PsSpinner />;
  console.log(lvline);

  // FETCH ITEM TABLE
  // const {
  //   data: lvitem_table,
  //   error: error_lvitem_table,
  //   isLoading: is_loading_lvitem_table,
  //   mutate: mutateLvItem,
  // } = useSWR(api_root + "/api/lv/item", fetcherB); //
  // if (is_loading_lvitem_table) return <PsSpinner />; // fire spinner on startup
  // if (!lvitem_table) return <p>No item data</p>;
  // if (error_lvitem_table) return <PsSpinner />;
  // console.log(lvitem_table);

  // CREATE, create new lv section
  const newLvSection = async (reqBody) => {
    const url = api_root + "/api/lv/section";
    const data = reqBody;
    console.log("reqBody", reqBody);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios.post(url, data, config).then(() => mutateLvLine());
      // .then(() => setLoading(false)); // works faster if it is before mutate
    } catch (error) {
      console.log(error);
    }
    // if (showPriceContext) GetFlatBom3();
  };

  const DeleteLvSection = async (lvsection_id) => {
    console.log("lvsection_id", lvsection_id);
    const url = api_root + "/api/lv/section/" + lvsection_id;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios.delete(url, config).then(() => mutateLvLine());
      // .then(() => mutateLineup1())
      // .then(() => setLoading(false));
      // .then(() => GetLineup1Nested());
    } catch (error) {
      console.log(error);
    }
    // if (showPriceContext) GetFlatBom3();
  };

  const addSectionHandler = (e) => {
    e.preventDefault();
    if (lvline.length < 20) {
      // setLoading(true);
      const reqBody = {
        lvline_id: lvline_id,
        lvsection_position: lvline.length + 1,
      };

      const myPromise = newLvSection(reqBody);
      toast.promise(myPromise, {
        loading: `The new section added`,
        success: `The new section added`,
        error: "Error when fetching",
      });
      // setUnit1New(""); // empty the input box on the Add Section
    } else {
      setConfirmMessageModal(true);
    }
  };

  const onCancel = () => {
    // const myPromise = CancelLineup1();
    const myPromise = True;
    toast.promise(myPromise, {
      loading: `Modification canceled`,
      success: `Write: Modification canceled`,
      error: "Error when fetching",
    });
  };

  const onSave = () => {
    // const myPromise = CancelLineup1();
    const myPromise = True;
    toast.promise(myPromise, {
      loading: `Modification canceled`,
      success: `Write: Modification saved`,
      error: "Error when fetching",
    });
  };

  const deleteLvSectionHandler = (lvsection_id) => (async) => {
    // console.log(lvsection_id);
    DeleteLvSection(lvsection_id);
    // const myPromise = DeleteLvSection(section_id);
    // toast.promise(myPromise, {
    //   loading: `The section deleted`,
    //   success: `The section deleted`,
    //   error: "Error when fetching",
    // });
  };

  return (
    <div id="main_container">
      {/* <Toaster /> */}
      <div id="modal-root">
        {/* ~~~~~~~~~~ MODALS ~~~~~~~~~~~~~~~~~~ */}
        <LvSectionModal isOpen={isModalOpen} onClose={closeModal} lvline={lvline}>
          {/* <h2>Modal Title</h2>
          <p>This is a modal window. You can include any content here.</p> */}
          {/* <button onClick={closeModal}>Close</button> */}
        </LvSectionModal>

        <section style={{ fontSize: "0.8rem", margin: "0.7rem 0 0 0" }}>
          <div
            style={{
              margin: "0rem 0 1rem 0",
              display: "flex",
              color: "var(--focus)",
            }}
          >
            <HomeIcon />
            <Link href={"/product/lv"} className={styles.links} style={{ fontSize: "0.8rem" }}>
              Home /
            </Link>
            <span style={{ margin: "0 0 0 5px ", color: "var(--foreground)" }}>Lineup</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Link href={"/product/lv"}>
              <ButtonIconActive>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "0.8rem",
                    padding: "0 10px 0 3px",
                  }}
                >
                  <span style={{ padding: "1px 0 0 0" }}>
                    <ArrowLeft />
                  </span>
                  <div style={{ padding: "0 0 0px 0" }}>Home</div>
                </div>
              </ButtonIconActive>
            </Link>

            {lvline?.lvline_updated_date != lvline?.lvline_saved_date ? (
              <div>
                {/* add onClick={onCancel} */}
                <ButtonIcon>
                  <div style={{ padding: "0 10px 0px 10px" }}>CANCEL</div>
                </ButtonIcon>
                <span style={{ margin: "0 0 0 6px" }} disabled>
                  {/* add onClick={onSave} */}
                  <ButtonIconActive>
                    <div style={{ padding: "0 10px 0px 10px" }}>SAVE</div>
                  </ButtonIconActive>
                </span>
              </div>
            ) : (
              <div>
                <ButtonIconInactive>
                  <div style={{ padding: "0 10px 0px 10px" }}>CANCEL</div>
                </ButtonIconInactive>
                <span style={{ margin: "0 0 0 6px" }} disabled>
                  <ButtonIconInactive>
                    <div style={{ padding: "0 10px 0px 10px" }}>SAVE</div>
                  </ButtonIconInactive>
                </span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~ LINEUP INFO ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <section id="lineup1_info" style={{ fontSize: "0.9rem", margin: "0.7rem 0 0 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>
              {lvline?.lvline_saved_date == lvline?.lvline_updated_date ? "" : "*"}
              {lvline?.lvline_designation}
              {lvline?.lvline_saved_date == lvline?.lvline_updated_date ? "" : " (unsaved)"}
            </h3>
            <span></span>
            <div className={styles.info_text}>
              NextGear Low Voltage UL 891 {/* Balance Gear {(lvline.lvline_voltage / 1000).toLocaleString()}kV{" "} */}
              {lvline?.lvline_ampacity?.toLocaleString()}
              {"A, "}
              {lvline?.lvline_enclosure == "INDOOR"}
              {lvline?.lvline_enclosure == "NEMA1" && "INDOOR"}
              {lvline?.lvline_enclosure == "NEMA3R" && "OUTDOOR Non-Walk-In"}
              {lvline?.lvline_enclosure == "NEMA3RW" && "OUTDOOR, WALK-IN"}
            </div>
            <div className={styles.info_text}>
              BO: {lvline?.lvline_bo}, Lineup ID: {lvline?.lvline_id}
            </div>
            <div style={{ minHeight: "1.8rem" }}>
              <h2>$100,000</h2>
            </div>

            {/* ~~~~~~~~~~~~~~~~ MESSAGE   ~~~~~~~~~~~~~~~   */}
            {/* Note: <br />
            Add $13,000/section for OUTDOOR Non-Walk-In.
            <br />
            Add $9,000/section for INDOOR. */}
          </div>

          <div style={{ fontSize: "0.8rem", textAlign: "right" }}>
            {lvline?.lvline_saved_date ? (
              <span>
                Last save on{" "}
                {new Date(lvline?.lvline_saved_date).toLocaleString("en-US", {
                  hour12: true,
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            ) : (
              "Unsaved lineup"
            )}
          </div>
        </div>
      </section>

      {/* ~~~~~~~~~~~~~~ MAIN MENU BUTTONS ~~~~~~~~~~~~~~~~~~~~~ */}
      <section
        style={{
          // margin: "1rem 0rem 0rem 0",
          display: "flex",
          justifyContent: "space-between",
          // alignSelf: "flex-end"
          position: "relative",
          flexWrap: "wrap",
        }}
      >
        <div style={{ margin: "1rem 0rem 0rem 0" }}>
          <span title="New Section">
            <ButtonIcon onClick={addSectionHandler}>
              <NewSectionIcon />
            </ButtonIcon>
          </span>
          {!showSingleLineContext && (
            <span title="Single Line View">
              <ButtonIcon>
                <SingleLineIcon />
              </ButtonIcon>
            </span>
          )}
          {showSingleLineContext && (
            <span title="Single Line View">
              <ButtonIconActive>
                <SingleLineIcon />
              </ButtonIconActive>
            </span>
          )}

          {!showFrontViewContext && (
            <span title="Elevation View">
              <ButtonIcon>
                <ElevationIcon />
              </ButtonIcon>
            </span>
          )}
          {showFrontViewContext && (
            <span title="Elevation View">
              <ButtonIconActive>
                <ElevationIcon />
              </ButtonIconActive>
            </span>
          )}
          {!showPriceContext && (
            <span title="Check Pricing">
              <ButtonIcon>
                <DollarCircleIcon />
              </ButtonIcon>
            </span>
          )}
          {showPriceContext && (
            <span title="Check Pricing">
              <ButtonIconActive>
                <DollarCircleIcon />
              </ButtonIconActive>
            </span>
          )}
        </div>
        <div style={{ margin: "1rem 0rem 0rem 0" }}>
          {user?.user_id === 1 ? (
            <span title="Build">
              <ButtonIcon>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "0.8rem",
                    padding: "0 10px 0 3px",
                  }}
                >
                  <span style={{ padding: "1px 0 0 0" }}>
                    <BomIcon title="build" />
                  </span>
                  <div style={{ padding: "3px 0 0 0" }}>Build</div>
                </div>
              </ButtonIcon>
            </span>
          ) : (
            ""
          )}
          <span title="Bill of Material">
            <ButtonIcon>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "0.8rem",
                  padding: "0 10px 0 3px",
                }}
              >
                <span style={{ padding: "1px 0 0 0" }}>
                  <BomIcon />
                </span>
                <div style={{ padding: "3px 0 0 0" }}>BOM</div>
              </div>
            </ButtonIcon>
          </span>

          {/* Print BOM */}

          {/* Print PDF Drawing */}
          {/* <span title="Print Drawings">
            <PrintLineup1
              lineup1={lineup1}
              showBus={showSingleLineContext}
              showComps={showFrontViewContext}
            />
          </span> */}

          <span title="Delete the Lineup" style={{}}>
            <ButtonIcon>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "0.8rem",
                  padding: "0 10px 0 3px",
                }}
              >
                <span style={{ padding: "1px 0 0 0" }}>
                  <Trashcan2Icon />
                </span>
                <div style={{ padding: "3px 0 0 0" }}>Delete</div>
              </div>
            </ButtonIcon>
          </span>
        </div>
      </section>

      {/* ~~~~~~~~~~~~~~~~~~~ CONFIGURATOR ~~~~~~~~~~~~~~~~~~~~~~ */}
      <section
        id="configurator"
        style={{
          display: "inline-block", //fix extra right-empty-space added to the lieup1 block
          position: "relative",
          width: "100%",
          margin: "0.2rem 0 0 0",
        }}
      >
        {lvline && (
          <div className={styles.lineup1}>
            {lvline.map((sec, index) => (
              <div
                className={styles.lvsection_column}
                key={sec.lvsection_id}
                style={{ width: `${sec?.lvitem_width * scaling_img_coeff}px`, height: "auto" }}
              >
                {/* ~~~~~~~~~~~~~~~~~~~~~ SECTION MENU ~~~~~~~~~~~~~~~~~~~~~~~    */}
                <div
                  className={styles.unit1_row}
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    margin: "0.3rem 0 0rem 0",
                    padding: "0.5rem 0 0 0",
                  }}
                >
                  <span className={styles.ctrl_icons_sm} title="Move">
                    <ArrowLeft />
                  </span>
                  <span className={styles.ctrl_icons_sm} title="Move">
                    <ArrowRight />
                  </span>
                  <span className={styles.ctrl_icons_sm} title="Copy">
                    <Clone />
                  </span>
                  <span className={styles.ctrl_icons_sm} title="Delete">
                    <CloseIcon onClick={deleteLvSectionHandler(sec.lvsection_id)} />
                  </span>
                </div>
                {/* ~~~~~~~~~~~~~~ SECTION NAME ~~~~~~~~~~~~~~~~~~~~~~~        */}
                <div
                  className={styles.unit1_row}
                  title={"Section ID: " + sec.section_id}
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.7,
                    padding: "0.7rem 0 0.7rem 0 ",
                  }}
                >
                  <span
                    className={styles.links}
                    style={{
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      color: "var(--focus-dark)",
                    }}
                    // style={styles.links}
                  >
                    Section {index + 1}
                    {/* #{index + 1} - &nbsp; */}
                    {/* {unit1.bus !== null ? unit1.bus.pack_name : "--"}
                      {unit1.comps !== null ? unit1.comps.pack_name : "--"}
                      {unit1.metal1 !== null ? unit1.metal1.pack_name : "-"} */}
                  </span>
                </div>

                {/* ~~~~~~~~~~~~~~~~~~~~ DIAGRAMS ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                <div
                  // className={styles.unit_row}  this is gone
                  style={{
                    height: `${sec.lvitem_heigth * scaling_img_coeff + 30}px`,
                    position: "relative",
                    // border: "0.5px dashed var(--lightgray)",
                    // className={styles.card2} // turnded off BUG 128
                    // cursor: "pointer", // turnded off BUG 128
                  }}
                  // onClick={onUnit1BOMModalClickHandler(unit1)}
                >
                  {sec.lvitem_front_img ? (
                    <Image
                      src={sec.lvitem_front_img}
                      alt="Front View"
                      width={Math.round(sec.lvitem_width * scaling_img_coeff)} // double witdth awith offest
                      height={Math.round(sec.lvitem_heigth * scaling_img_coeff)}
                      priority
                      className={styles.unit1_row}
                      style={{ position: "absolute", right: "0px" }}
                    />
                  ) : (
                    // fallback image
                    <Image
                      src={"/200V-A0029507_front.svg"}
                      alt="Front View"
                      width={Math.round(sec.lvitem_width * scaling_img_coeff)} // double witdth awith offest
                      height={Math.round(sec.lvitem_heigth * scaling_img_coeff)}
                      priority
                      className={styles.unit1_row}
                      style={{ position: "absolute", right: "0px" }}
                    />
                  )}
                </div>
                <button onClick={openModal}>Open Modal</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <>
      <ProductLayout>{page}</ProductLayout>
    </>
  );
};
