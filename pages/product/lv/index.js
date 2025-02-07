import ProductLayout from "@/components/layouts/ProductLayout";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Dollar } from "@/components/functions/conversions";
import Image from "next/image";
import { Unit1Price, Lineup1Price, QuotePrice } from "@/components/functions/price";
import styles from "@/styles/styles.module.css";
import Link from "next/link";
import { links } from "@/components/navigation/GlobalLinks";
import { useState, useContext, useEffect } from "react";
import Button from "@/components/ui/buttons/Button";
import ButtonMini from "@/components/ui/buttons/ButtonMini";
import ButtonMiniDelete from "@/components/ui/buttons/ButtonMiniDelete";
import { api_root } from "@/global/global_vars";
import PsSpinner from "@/components/ui/spinners/PsSpinner";
import TriangleMiniSideSpinner from "@/components/ui/spinners/TriangleMiniSideSpinner";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import RenameLineup1Modal from "@/components/modals/RenameLineup1Modal";
import CloneLineup1Modal from "@/components/modals/CloneLineup1Modal";
import axios from "axios";
import AuthContext from "@/components/context/AuthContext";
import ArowLeft from "@/components/ui/icons/ArrowLeft";
import EditTextIcon from "@/components/ui/icons/EditTextIcon";
import Clone from "@/components/ui/icons/Clone";
import UpDownArrowsIcon from "@/components/ui/icons/UpDownArrowsIcon";
import FavoriteStarIcon from "@/components/ui/icons/FavoriteStarIcon";
import Trashcan2Icon from "@/components/ui/icons/Trashcan2Icon";
import Trashcan from "@/components/ui/icons/Trashcan";
import InputNumberAbs from "@/components/functions/input_number_abs";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// API Links
const quote_shallow_api = api_root + "/api/bg/quote-shallow/";
const new_lineup1_api = api_root + "/api/bg/lineup1-new";
const delete_quote_api = api_root + "/api/bg/quote-delete/";
const get_all_lineup1s_api = api_root + "/api/bg/get-all-lineup1"; //sql version
const new_unit1_api_url = api_root + "/api/bg/unit1-new";
const unit1_per_lineup1_api = api_root + "/api/bg/unit1-per-lineup1/";
const unit1_multi_new_api = api_root + "/api/bg/unit1-multi-new";
const lineup1_id_url = "/product/bg15/lineups/";
const delete_lineup1_api_url = api_root + "/api/bg/lineup1-delete/";

const get_all_lvlines_api = api_root + "/api/lv/line"
const lv_line_links = { lineups: "/product/lv/line" };

const enclosure_options = [
  { value: "NEMA1", label: "INDOOR" },
  { value: "NEMA3R", label: "OUTDOOR, Non-Walk-In" },
  // { value: "NEMA3RW", label: "OUTDOOR, Walk-In" },
];

const rated_voltage_options = [5000, 10000, 15000];
console.log("rated_voltage_options", rated_voltage_options[0]);

export default function Page() {
  const router = useRouter();
  const { isAuthenticated, accessToken, user } = useContext(AuthContext) || {}; // error will show without || {}
  // console.log("accessToken from quote_id page", accessToken);
  // console.log("user_id from quote_id page", user?.user_id);

  // AUTH
  useEffect(() => {
    loadUserTest();
  }, [isAuthenticated]);

  const loadUserTest = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      if (!res.data) {
        // console.log("User is here", res.data.user);
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
      // console.log("Load user in Quotes page error:", error);
    }
  };

  const [lineup1Name, setLineup1Name] = useState("");
  const [lineup1BO, setLineup1BO] = useState("");
  const [lineup1NewName, setLineup1NewName] = useState("");
  const [lineup1NewBO, setLineup1NewBO] = useState("");
  const [lineup1RatedVoltage, setLineup1RatedVoltage] = useState(rated_voltage_options[0]);
  const [lineup1ID, setLineup1ID] = useState(-1);
  const [oldLineup1, setOldLineup1] = useState("");
  const [enclosure, setEnclosure] = useState(enclosure_options[0]["value"]);
  const [enclosureLabel, setEnclosureLabel] = useState(enclosure_options[0]["label"]);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [renameLineup1ModalState, setRenameLineup1ModalState] = useState("");
  const [showRenameLineup1Modal, setShowRenameLineup1Modal] = useState(false);
  const [deleteLineup1State, setDeleteModalState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCloneLineup1Modal, setShowCloneLineup1Modal] = useState(false);
  const [search, setSearch] = useState("");
  // const [sort, setSort] = useState("lineup1_name");
  const [sortAsc, setSortAsc] = useState(true);
  // Custom Breadcrumbs: type the names the way they are in the sidebar
  const title = "Quote";

  const query = router.query;
  let quote_id = Number(Object.values(query)); //extract quote_id

  const fetcher1 = (url, token) =>
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then((res) => res.data)
      .then((res) => res.sort((a, b) => (a.lineup1_opened_date > b.lineup1_opened_date ? -1 : 1)));

  // fetch all lineups
  const {
    data: lineup1_table,
    error,
    isLoading,
    mutate: mutateLineup1,
    // } = useSWR(all_lineups, fetcher);
  } = useSWR([get_all_lineup1s_api, accessToken], ([get_all_lineup1s_api, accessToken]) => fetcher1(get_all_lineup1s_api, accessToken));


  const {
    data: lvLine_table,
    error: lvLine_error,
    isLoading: lvLineIsLoading,
    mutate: mutateLvLine,
    // } = useSWR(all_lineups, fetcher);
  } = useSWR([get_all_lvlines_api, accessToken], ([get_all_lvlines_api, accessToken]) => fetcher1(get_all_lvlines_api, accessToken));




  // console.log("accessToken", accessToken)
  // console.log("lineup1_table", lineup1_table);
  console.log("lvLine_table", lvLine_table);
  // console.log("user", user)

  // if (isLoading) return "Loading...";
  if (isLoading) return <PsSpinner />;
  if (error) return <PsSpinner />;
  if (!lineup1_table) return <p>No profile data</p>;

  if (loading) return <PsSpinner />;
  // const lineup1 = quote; // lineup1 array
  // console.log(quote);

  // useEffect(() => {
  //   console.log("cloneLineup1ModalState", cloneLineup1ModalState)
  // }, [cloneLineup1ModalState]);

  const toQuoteIndexPage = () => {
    router.push("/product/bg15/application/");
  };

  // console.log("enclosure:", enclosure);

  // old way, it works
  // const handleSubmitLineup1 = (e) => {
  //   e.preventDefault();
  //   fetch(new_lineup1_api, {
  //     method: "POST",
  //     body: JSON.stringify(reqBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((lineup1) => toLineup1IdPage(lineup1));
  // };

  // CREATE, create new unit1
  const newLineup1 = async (reqBody) => {
    const url = new_lineup1_api;
    const data = reqBody;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(url, data, config);
      return res.data; // async/await made in a separate function
      // .then((res) => {console.log(res.data);})
      // .then((res) => toLineup1IdPage(res.data)); // go to the lineup1_id page
      // .then((res) => newUnit1(res.data)); // after receiving lineup1 create the first unit
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE, create new unit1
  const newUnit1 = async (lineup1_id) => {
    const reqBody = {
      lineup1_id: lineup1_id,
      unit1_position: 1, // this is the fist unit1 in lineup1
    };
    const url = new_unit1_api_url;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(url, reqBody, config);
      return res.data;
      // .then(() => toLineup1IdPage(lineup1)); // go to the lineup1_id page
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE, create new unit1
  const putLineup1 = async (lineup1) => {
    const reqBody = {
      lineup1_name: lineup1.lineup1_name,
      lineup1_bo: lineup1.lineup1_bo,
    };
    const url = api_root + "/api/bg/lineup1-put/" + lineup1.lineup1_id;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios.put(url, reqBody, config).then(() => mutateLineup1());
    } catch (error) {
      console.log(error);
    }
  };

  const onCloneClick1 = (old_lineup1) => async () => {
    console.log("lineup1_", old_lineup1);
    const reqBody = {
      lineup1_current: old_lineup1.lineup1_current,
      lineup1_kiac: old_lineup1.lineup1_kiac,
      lineup1_voltage: old_lineup1.lineup1_voltage,
      lineup1_enclosure: old_lineup1.lineup1_enclosure,
      lineup1_bo: old_lineup1.lineup1_bo,
      lineup1_name: old_lineup1.lineup1_name + " (Copy)",
      lineup1_note: old_lineup1.lineup1_note,
      lineup1_amount: old_lineup1.lineup1_amount,
      user_id: user.user_id,
    };

    // const reqBody = old_lineup1;

    // create new lineup1
    const new_lineup1 = await newLineup1(reqBody);

    // get all the units that will be copied
    const unit1s = await getUnit1PerLineup1(old_lineup1.lineup1_id);

    // replace the old lineup1_id with the new ID
    unit1s.forEach((x) => {
      x.lineup1_id = Number(new_lineup1.lineup1_id); // insert new ID
      delete x.unit1_id; //drop unit1_id, we'll get the new ones
    });

    // post new units
    await newMultiUnit1(unit1s);

    // push to the unit1 page
    router.push({
      pathname: "/product/bg15/lineups/" + new_lineup1.lineup1_id,
    });
  };

  const handleSubmitLineup1 = async (e) => {
    setLoading(true);
    e.preventDefault();
    const reqBody = {
      lineup1_current: 1200,
      lineup1_enclosure: enclosure,
      lineup1_kaic: 50,
      lineup1_name: lineup1Name,
      lineup1_voltage: Number(lineup1RatedVoltage),
      lineup1_bo: lineup1BO,
      user_id: user.user_id,
    };

    const new_lineup1 = await newLineup1(reqBody); // create new lineup1
    await newUnit1(new_lineup1.lineup1_id); // crete first unit1

    router.push({
      pathname: "/product/bg15/lineups/" + new_lineup1.lineup1_id, // push to the lineup1 page
      // query: { somekey: "someValue" },
    });
    // setLoading(false);
  };

  const deleteLineup1 = async (lineup1_id) => {
    const url = delete_lineup1_api_url + lineup1_id;
    const config = { "content-type": "application/json" };
    if (lineup1) {
      try {
        await axios.delete(url, config).then(() => mutateLineup1()); // avoid mutation and
        // router.push("/"); // get back to the quote page
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onRenameClick = (lineup1_id, lineup1_name, lineup1_bo) => async () => {
    setShowRenameLineup1Modal(true);
    setLineup1NewName(lineup1_name);
    setLineup1NewBO(lineup1_bo);
    setLineup1ID(lineup1_id);
  };

  const onCloneClick = (lineup1) => async () => {
    setOldLineup1(lineup1);
    setShowCloneLineup1Modal(true);
  };

  const onDeleteClick = (lineup1) => async () => {
    setLineup1ID(lineup1.lineup1_id);
    setLineup1Name(lineup1.lineup1_name);
    // console.log(lineup1_id)

    setShowConfirmDeleteModal(true);
    // setOldLineup1(lineup1);
    // setShowCloneLineup1Modal(true);
  };

  if (renameLineup1ModalState) {
    putLineup1(renameLineup1ModalState);
  }

  const Sorter = (val) => {
    if (sortAsc) {
      let X = 1;
    }
    switch (val) {
      case "lineup1_opened_date":
        if (sortAsc) {
          lineup1_table.sort((a, b) => (a.lineup1_opened_date > b.lineup1_opened_date ? 1 : -1));
        } else {
          lineup1_table.sort((a, b) => (a.lineup1_opened_date > b.lineup1_opened_date ? -1 : 1));
        }
        break;
      case "lineup1_bo":
        if (sortAsc) {
          lineup1_table.sort((a, b) => (a.lineup1_bo > b.lineup1_bo ? 1 : -1));
        } else {
          lineup1_table.sort((a, b) => (a.lineup1_bo > b.lineup1_bo ? -1 : 1));
        }
        // console.log("sort by lineup1_bo", sortAsc);
        break;
      case "lineup1_name":
        if (sortAsc) {
          lineup1_table.sort((a, b) => (a.lineup1_name > b.lineup1_name ? 1 : -1));
        } else {
          lineup1_table.sort((a, b) => (a.lineup1_name > b.lineup1_name ? -1 : 1));
        }
        // console.log("sort by lineup1_name", sortAsc);
        break;
      case "last_name":
        if (sortAsc) {
          lineup1_table.sort((a, b) => (a.last_name > b.last_name ? 1 : -1));
        } else {
          lineup1_table.sort((a, b) => (a.last_name > b.last_name ? -1 : 1));
        }
        // console.log("sort by last_name", sortAsc);
        break;
      case "lineup1_enclosure":
        if (sortAsc) {
          lineup1_table.sort((a, b) => (a.lineup1_enclosure > b.lineup1_enclosure ? 1 : -1));
        } else {
          lineup1_table.sort((a, b) => (a.lineup1_enclosure > b.lineup1_enclosure ? -1 : 1));
        }
        // console.log("sort by lineup1_enclosure", sortAsc);
        break;
      case "lineup1_amount":
        if (sortAsc) {
          lineup1_table.sort((a, b) => (a.lineup1_amount > b.lineup1_amount ? 1 : -1));
        } else {
          lineup1_table.sort((a, b) => (a.lineup1_amount > b.lineup1_amount ? -1 : 1));
        }
        // console.log("sort by lineup1_amount", sortAsc);
        break;
    }

    setSortAsc(!sortAsc);
  };

  if (deleteLineup1State) {
    deleteLineup1(lineup1ID);
    setDeleteModalState(false);
  }
  console.log("lineup1RatedVoltage", lineup1RatedVoltage);

  return (
    <div id="main_container">
      <div id="modal-root">
        {showRenameLineup1Modal && (
          <RenameLineup1Modal
            onClose={() => setShowRenameLineup1Modal(false)}
            name={"quote.quote_id"}
            title={"Quote"}
            lineup1_name={lineup1NewName}
            lineup1_id={lineup1ID}
            lineup1_bo={lineup1NewBO}
            setRenameLineup1ModalState={setRenameLineup1ModalState}
          ></RenameLineup1Modal>
        )}
        {showCloneLineup1Modal && (
          <CloneLineup1Modal
            onClose={() => setShowCloneLineup1Modal(false)}
            title={"Copy Lineup"}
            oldLineup1={oldLineup1}
            user_id={user.user_id}
            accessToken={accessToken}
            new_lineup1_api={new_lineup1_api}
            unit1_per_lineup1_api={unit1_per_lineup1_api}
            unit1_multi_new_api={unit1_multi_new_api}
          ></CloneLineup1Modal>
        )}
        {showConfirmDeleteModal && (
          <ConfirmDeleteModal
            onClose={() => setShowConfirmDeleteModal(false)}
            name={lineup1Name}
            title={"Lineup"}
            setDeleteModalState={setDeleteModalState}
          ></ConfirmDeleteModal>
        )}
      </div>
      {/* <Breadcrumbs router={router} query={query} /> */}

      <h2>NexGear LV</h2>
      <div>Low Voltage Switchgear UL 891, up to 4,000A</div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ margin: "0 1rem 0 0" }}>
          <span className={styles.input_text}>
            <input
              type="text"
              placeholder="Search the lineups, and BO"
              className="search"
              onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            />
          </span>
        </div>
        <div style={{ margin: "0 0 0 0" }}>
          <form
            id="form_add_lineup"
            onSubmit={handleSubmitLineup1}
            className={styles.row_input_text}
            style={{ margin: "0 0 0 0" }} //, justifyContent: "flex-end"
          >
            <input
              id="lineup1"
              type="text"
              placeholder="e.g. Lineup A"
              value={lineup1Name}
              onChange={(e) => setLineup1Name(e.target.value)}
              required
              style={{ width: "10rem" }}
              // autoFocus
            ></input>
            <input
              id="bo"
              type="number"
              placeholder="BO#"
              title="Input BO number"
              value={lineup1BO}
              min="0"
              onChange={(e) => setLineup1BO(e.target.value)}
              style={{ width: "5rem" }}
              // autoFocus
            ></input>
            <select className={styles.form_select} value={lineup1RatedVoltage} onChange={(e) => setLineup1RatedVoltage(e.target.value)}>
              <option value={rated_voltage_options[0]}>5kV</option>
              <option value={rated_voltage_options[1]}>10kV</option>
              <option value={rated_voltage_options[2]}>15kV</option>
            </select>
            <select className={styles.form_select} value={enclosure} onChange={(e) => setEnclosure(e.target.value)} style={{ width: "7rem" }}>
              {enclosure_options &&
                enclosure_options.map((x) => (
                  <option key={x["value"]} value={x["value"]}>
                    {x["label"]}
                  </option>
                ))}
            </select>
            <Button type="submit">Add</Button>
          </form>
        </div>
      </div>

      {/* ------------ TABLE ------------------ */}
      <table
        className={styles.content_table}
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                margin: "0",
                padding: "0",
                // textAlign: "right",
                // alignContent: "center",
                // alignItems: "center",
              }}
            ></th>
            <th
            // style={{
            //   margin: "0",
            //   padding: "0",
            // }}
            ></th>
            <th>
              Lineup
              <UpDownArrowsIcon onClick={() => Sorter("lineup1_name")} />
            </th>
            <th style={{ minWidth: "4rem" }}>
              Date
              <UpDownArrowsIcon onClick={() => Sorter("lineup1_opened_date")} />
            </th>
            <th style={{ minWidth: "4rem" }}>
              BO
              <UpDownArrowsIcon onClick={() => Sorter("lineup1_bo")} />
            </th>
            {/* <th>
              ID
              <span>{<UpDownArrowsIcon /> }</span>
            </th> */}
            <th style={{ minWidth: "4rem" }}>
              By
              <UpDownArrowsIcon onClick={() => Sorter("last_name")} />
            </th>

            <th style={{ minWidth: "7rem" }}>
              Enclosure
              <UpDownArrowsIcon onClick={() => Sorter("lineup1_enclosure")} />
            </th>
            <th style={{ textAlign: "right", minWidth: "7rem" }}>
              Amount
              <UpDownArrowsIcon onClick={() => Sorter("lineup1_amount")} />
            </th>
            <th style={{ minWidth: "6rem" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {lvLine_table &&
            lvLine_table
              .filter(
                (lineup1) => lineup1.lvline_designation.toLowerCase().includes(search) || lineup1.lineup1_bo.toString().toLowerCase().includes(search)
              )
              .map((lineup1, index) => (
                <tr key={lineup1.lvline_id}>
                  {/* <td
                    style={{
                      margin: "0",
                      padding: "0",
                      textAlign: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {lineup1.lineup1_is_favorite && <FavoriteStarIcon />}
                  </td> */}

                  <td style={{ opacity: "0.5" }}>{index + 1}</td>
                  {/* <td style={{ opacity: "0.5" }}>{'\u2022'}</td> */}

                  {/* <td>
                    <Image
                      src="/circle.svg"
                      alt="circle"
                      width={15}
                      height={15}
                    />
                  </td> */}

                  <td
                    style={{
                      whiteSpace: "pre-wrap",
                      // position:"absolute",
                      // width: "3rem",
                    }}
                  >
                    {lineup1?.lineup1_saved_date == lineup1?.lineup1_updated_date ? "" : "*"}
                  </td>
                  <td
                    style={{
                      whiteSpace: "pre-wrap",
                      fontWeight: "bold",
                    }}
                    className={styles.table_link}
                  >
                    <span title={"ID:" + lineup1.lvline_id}>
                      <Link href={lv_line_links.lineups + "/" + lineup1.lvline_id}>{lineup1.lvline_designation}</Link>
                    </span>
                  </td>
                  <td>{new Date(lineup1.lvline_opened_date).toLocaleDateString()}</td>
                  <td style={{}}>{lineup1.lvline_bo}</td>
                  {/* <td>{Array.from(lineup1?.first_name)[0] + "." + lineup1.last_name}</td> */}
                  <td>{Array.from(lineup1?.user.first_name)[0] + "." + lineup1?.user.last_name}</td>
                  {/* <td>Name</td> */}
                  <td>
                    {lineup1.lvline_enclosure == "NEMA1" && (
                      <span
                        style={{
                          backgroundColor: "var(--ps-lightblue2)",
                          padding: "0.2rem 0.4rem 0.2rem 0.4rem",
                          borderRadius: "12px",
                          // color: "white",
                        }}
                      >
                        Indoor
                      </span>
                    )}

                    {lineup1.lvline_enclosure == "NEMA3R" && (
                      <span
                        style={{
                          backgroundColor: "var(--ps-lightgreen2)",
                          padding: "0.2rem 0.6rem 0.2rem 0.4rem",
                          borderRadius: "12px",

                          // color:"white"
                        }}
                      >
                        Outdoor
                      </span>
                    )}

                    {lineup1.lvline_enclosure == "NEMA3RW" && "Walk-in"}
                  </td>
                  <td style={{ textAlign: "right", padding: "0 2rem 0 0 " }}>{lineup1.lvline_amount && Dollar(lineup1.lvline_amount)}</td>

                  <td>
                    <span
                      title="Edit Lineup Name"
                      className={styles.ctrl_icons_sm}
                      onClick={onRenameClick(lineup1.lineup1_id, lineup1.lineup1_name, lineup1.lineup1_bo)}
                    >
                      <EditTextIcon />
                    </span>
                    <span title="Copy Lineup" className={styles.ctrl_icons_sm} onClick={onCloneClick(lineup1)}>
                      <Clone />
                    </span>
                    <span title="Delete" style={{ padding: "0 0 0 2px" }} className={styles.ctrl_icons_sm} onClick={onDeleteClick(lineup1)}>
                      {<Trashcan />}
                    </span>

                    {/* it works but we do not need it */}
                    {/* <span
                      title="Favorite"
                      className={styles.ctrl_icons_sm}
                      style={{ opacity: "1" }}
                    >
                      {lineup1.lineup1_is_favorite && <FavoriteStarIcon />}
                    </span> */}
                  </td>
                  {/* works in nested schema */}
                  {/* <td>{Dollar(Lineup1Price(lineup1))}</td> */}
                </tr>
              ))}
        </tbody>
      </table>
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
