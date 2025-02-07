import ProductLayout from "@/components/layouts/ProductLayout";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Dollar } from "@/components/functions/conversions";
import {
  Unit1Price,
  Lineup1Price,
  QuotePrice,
} from "@/components/functions/price";
import styles from "@/styles/styles.module.css";
import Link from "next/link";
import { links } from "@/components/navigation/GlobalLinks";
import { useState, useContext, useEffect } from "react";
import Button from "@/components/ui/buttons/Button";
import ButtonMini from "@/components/ui/buttons/ButtonMini";
import ButtonMiniDelete from "@/components/ui/buttons/ButtonMiniDelete";
import { api_root } from "@/global/global_vars";
import PsSpinner from "@/components/ui/spinners/PsSpinner";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import RenameLineup1Modal from "@/components/modals/RenameLineup1Modal";
import axios from "axios";
import AuthContext from "@/components/context/AuthContext";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// API Links
const quote_shallow_api = api_root + "/api/bg/quote-shallow/";
const new_lineup1_api = api_root + "/api/bg/lineup1-new";
const delete_quote_api = api_root + "/api/bg/quote-delete/";
const new_unit1_api_url = api_root + "/api/bg/unit1-new";

const quotes_url = "/product/bg15/application/quotes";

const enclosure_options = [
  { value: "NEMA1", label: "INDOOR" },
  { value: "NEMA3R", label: "OUTDOOR, Non-Walk-In" },
  // { value: "NEMA3RW", label: "OUTDOOR, Walk-In" },
];

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
        router.push("/");
      }
    } catch (error) {
      router.push("/");
      // console.log("Load user in Quotes page error:", error);
    }
  };

  const [lineup1Name, setLineup1Name] = useState("");
  const [lineup1BO, setLineup1BO] = useState("");
  const [lineup1Rename, setLineup1Rename] = useState("");
  const [lineup1RenameBO, setLineup1RenameBO] = useState("");
  const [lineup1RenameID, setLineup1RenameID] = useState(-1);
  const [renameLineup1ModalState, setRenameLineup1ModalState] = useState("");
  const [enclosure, setEnclosure] = useState(enclosure_options[0]["value"]);
  const [enclosureLabel, setEnclosureLabel] = useState(
    enclosure_options[0]["label"]
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showRenameLineup1Modal, setShowRenameLineup1Modal] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);

  // Custom Breadcrumbs: type the names the way they are in the sidebar
  const title = "Quote";

  const query = router.query;
  let quote_id = Number(Object.values(query)); //extract quote_id

  // fetch quote data
  const quote_api_url = quote_shallow_api + quote_id; //build url
  const {
    data: quote,
    error,
    isLoading,
    mutate: mutateLineup1,
  } = useSWR(quote_api_url, fetcher);
  if (isLoading) return "Loading...";
  // if (isLoading) return <PsSpinner />;
  if (error) return <div>Failed to load</div>;
  if (!quote) return <p>No profile data</p>;

  const lineup1 = quote.lineup1; // lineup1 array
  // console.log(quote);

  const toLineup1IdPage = (lineup1) => {
    router.push({
      pathname:
        "/product/bg15/application/quotes/lineups/" + lineup1.lineup1_id,
      query: { somekey: "someValue" },
    });
  };

  const toQuoteIndexPage = () => {
    router.push("/product/bg15/application/quotes");
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
      await axios
        .post(url, data, config)
        // .then((res) => {console.log(res.data);})
        // .then((res) => toLineup1IdPage(res.data)); // go to the lineup1_id page
        .then((res) => newUnit1(res.data)); // after receiving lineup1 create the first unit
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE, create new unit1
  const newUnit1 = async (lineup1) => {
    const reqBody = {
      lineup1_id: lineup1.lineup1_id,
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
      await axios
        .post(url, reqBody, config)
        .then(() => toLineup1IdPage(lineup1)); // go to the lineup1_id page
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

  const handleSubmitLineup1 = (e) => {
    e.preventDefault();
    const reqBody = {
      lineup1_current: 1200,
      lineup1_enclosure: enclosure,
      lineup1_kaic: 50,
      lineup1_name: lineup1Name,
      lineup1_voltage: 15000,
      quote_id: quote_id,
      lineup1_bo: lineup1BO,
    };
    newLineup1(reqBody); // create new lineup1 then create new unit1
  };

  const deleteQuoteHandler = () => {
    setShowConfirmDeleteModal(true);
  };

  const deleteQuote = () => {
    fetch(delete_quote_api + quote_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then(() => toQuoteIndexPage());
  };

  if (deleteModalState) {
    deleteQuote();
  }

  const onRenameClick = (lineup1_id, lineup1_name, lineup1_bo) => async () => {
    setShowRenameLineup1Modal(true);
    setLineup1Rename(lineup1_name);
    setLineup1RenameBO(lineup1_bo);
    setLineup1RenameID(lineup1_id);
  };

  if (renameLineup1ModalState) {
    putLineup1(renameLineup1ModalState);
  }

  return (
    <div id="main_container">
      <div id="modal-root">
        {showConfirmDeleteModal && (
          <ConfirmDeleteModal
            onClose={() => setShowConfirmDeleteModal(false)}
            name={quote.quote_id}
            title={"Quote"}
            setDeleteModalState={setDeleteModalState}
          ></ConfirmDeleteModal>
        )}
        {showRenameLineup1Modal && (
          <RenameLineup1Modal
            onClose={() => setShowRenameLineup1Modal(false)}
            name={quote.quote_id}
            title={"Quote"}
            lineup1_name={lineup1Rename}
            lineup1_id={lineup1RenameID}
            lineup1_bo={lineup1RenameBO}
            setRenameLineup1ModalState={setRenameLineup1ModalState}
          ></RenameLineup1Modal>
        )}
      </div>
      {/* <Breadcrumbs router={router} query={query} /> */}

      <div style={{ margin: "1rem 0 0 0" }}>
        <Link href={quotes_url} className={styles.links}>
          Back to Home
        </Link>
      </div>
      <h2 style={{}}>
        {/* {title}: {quote.quote_id} */}
        {quote.quote_customer}
      </h2>
      <div className={styles.info_text}>
        BalanceGear 15kV, 1,200A
        {/* <div className={styles.info_text}>Customer: {quote.quote_customer}</div> */}
        {/* <span>
          <ButtonMiniDelete onClick={deleteQuoteHandler}>
            Delete
          </ButtonMiniDelete>
        </span> */}
      </div>

      <div
        style={{
          fontSize: "0.9rem",
        }}
      >
        {/* Pricing works in nested schema */}
        {/* <ul style={{ textAlign: "end", listStyle: "none" }}>
          <li>Total</li>
          <li style={{}}>
            <h2 style={{ margin: "0 0 0 0" }}>{Dollar(QuotePrice(quote))}</h2>
            <h2 style={{ margin: "0 0 0 0" }}>Price</h2>
          </li>
        </ul> */}
      </div>

      <div>
        <form
          onSubmit={handleSubmitLineup1}
          className={styles.input_text}
          style={{ margin: "1rem 0 0 0", display: "flex" }} //, justifyContent: "flex-end"
        >
          <input
            id="lineup1"
            type="text"
            placeholder="e.g. Main Lineup, Room 1"
            value={lineup1Name}
            onChange={(e) => setLineup1Name(e.target.value)}
            required
            // autoFocus
          ></input>
          <input
            id="bo"
            type="text"
            placeholder="BO #"
            value={lineup1BO}
            onChange={(e) => setLineup1BO(e.target.value)}
            style={{ width: "7rem" }}
            // autoFocus
          ></input>
          <select
            className={styles.form_select}
            value={enclosure}
            onChange={(e) => setEnclosure(e.target.value)}
          >
            {enclosure_options &&
              enclosure_options.map((x) => (
                <option key={x["value"]} value={x["value"]}>
                  {x["label"]}
                </option>
              ))}
          </select>
          <Button type="submit">Add Lineup</Button>
        </form>
      </div>

      {/* table */}
      <table
        className={styles.content_table}
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "2rem" }}></th>
            <th>BO</th>
            <th>Lineup</th>
            <th>ID</th>
            {/* <th style={{ width: "9rem" }}>Sections</th> */}
            {/* <th style={{ width: "5rem" }}>Price</th> */}
            <th>Enclosure</th>
            {/* <th>Current A</th>
            <th>Voltage kV</th> */}
            {/* <th>kAIC</th> */}
            <th></th>
            {/* <th style={{ columnWidth: "3rem" }}>Total</th> */}
          </tr>
        </thead>
        <tbody>
          {lineup1 &&
            lineup1
              .sort((a, b) => (a.lineup1_name > b.lineup1_name ? 1 : -1))
              .map((row, index) => (
                <tr key={row.lineup1_id}>
                  <td style={{opacity:"0.5"}}>{index + 1}</td>
                  <td style={{}}>{row.lineup1_bo}</td>
                  <td
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                    className={styles.table_link}
                  >
                    <Link href={links.lineups + "/" + row.lineup1_id}>
                      {row.lineup1_name}
                    </Link>
                  </td>
                  <td>{row.lineup1_id}</td>
                  <td>
                    {row.lineup1_enclosure == "INDOOR"}
                    {row.lineup1_enclosure == "NEMA1" && "INDOOR"}
                    {row.lineup1_enclosure == "NEMA3R" &&
                      "OUTDOOR, NON-WALK-IN"}
                    {row.lineup1_enclosure == "NEMA3RW" && "OUTDOOR, WALK-IN"}
                  </td>

                  {/* <td>
                  {row.lineup1_current && row.lineup1_current.toLocaleString()}
                </td> */}
                  {/* <td>{row.lineup1_voltage / 1000}</td> */}
                  {/* <td>{row.lineup1_kaic}</td> */}
                  <td
                    onClick={onRenameClick(row.lineup1_id, row.lineup1_name, row.lineup1_bo)}
                    className={styles.table_link}
                  >
                    Edit
                  </td>
                  {/* works in nested schema */}
                  {/* <td>{Dollar(Lineup1Price(row))}</td> */}
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
