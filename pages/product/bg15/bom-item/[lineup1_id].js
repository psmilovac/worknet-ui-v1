"use client";
// itemized bill of material
import React from "react";
import ProductLayout from "@/components/layouts/ProductLayout";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/components/context/AuthContext";
import axios from "axios";
import useSWR from "swr";
import { api_root } from "@/global/global_vars";
import styles from "@/styles/styles.module.css";
import Link from "next/link";
import PsSpinner from "@/components/ui/spinners/PsSpinner";
import { Dollar } from "@/components/functions/conversions";
import FlatBom1Table from "@/components/product/bg15/FlatBom1Table";
import FlatBom4Table from "@/components/product/bg15/FlatBom4Table";
import { FlatBom1PriceFunction } from "@/components/functions/price"; // itemized bill of material

import DownloadXLSX from "@/components/functions/download_xlsx";
import ButtonMini from "@/components/ui/buttons/ButtonMini";
import TriangleMiniSideSpinner from "@/components/ui/spinners/TriangleMiniSideSpinner";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import ButtonIconActive from "@/components/ui/buttons/ButtonIconActive";
import ArrowLeft from "@/components/ui/icons/ArrowLeft";

export default function Page() {
  const router = useRouter();
  const lineup1_id = router.query.lineup1_id;
  const { isAuthenticated, user, accessToken } = useContext(AuthContext) || {};
  const [flat_bom1, setFlatBom1] = useState("");
  const [flat_bom4, setFlatBom4] = useState("");
  const [loading, setLoading] = useState(false);
  const [bomView, setBomView] = useState(true); // Itemized or Sectionalized view

  // AUTH
  useEffect(() => {
    loadUser();
    GetFlatBom1();
    GetFlatBom4();
  }, [isAuthenticated]);

  const loadUser = async () => {
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

  // SQLs for Flat Bom
  const flat_bom1_api = api_root + "/api/bg/lineup1-flat-bom1/" + lineup1_id; // itemized BOM
  const flat_bom4_api = api_root + "/api/bg/lineup1-flat-bom4/" + lineup1_id; // sectionalized BOM
  const lineup1_configurator_url = "/product/bg15/lineups/" + lineup1_id;
  const lineup1_info_api = api_root + "/api/bg/lineup1-info/" + lineup1_id;

  // Use fetch with auth token
  const fetcher1 = (url, token) =>
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then((res) => res.data);

  // OLD WAY - GET BOM using axios fetch method, not useSWR because it cashes the values without updates
  // fetch bom using fetcher1, that has authorization headers
  // const {
  //   data: flat_bom1,
  //   error: error_flat_bom1,
  //   isLoading: is_loading_flat_bom1,
  //   mutate: mutate_flat_bom1,
  // } = useSWR([flat_bom1_api, accessToken], ([flat_bom1_api, accessToken]) =>
  //   fetcher1(flat_bom1_api, accessToken)
  // );

  const GetFlatBom1 = async () => {
    setLoading(true);
    const url = flat_bom1_api;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios
        .get(url, config)
        .then((res) => setFlatBom1(res.data))
        .then(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  // sectionalized BOM
  // get pricing per each Unit, 
  const GetFlatBom4 = async () => {
    const url = flat_bom4_api;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    if (lineup1_id) {
      setFlatBom4("");
      try {
        await axios
          .get(url, config)
          .then((res) => setFlatBom4(() => res.data));
      } catch (error) {
        console.log(error);
      }
    }
  };
  // console.log("flat_bom4", flat_bom4)
  // console.log("flat_bom1", flat_bom1)

  // Fetch Lineup1 Info using fetcher1
  const {
    data: lineup1, // this is array!
    error: error_lineup1,
    isLoading: is_loading_lineup1,
  } = useSWR(
    [lineup1_info_api, accessToken],
    ([lineup1_info_api, accessToken]) => fetcher1(lineup1_info_api, accessToken)
  ); //

  // console.log("lineup1[0]", lineup1);
  // console.log("flat_bom1", flat_bom1);
  if (is_loading_lineup1) return <PsSpinner />;

  // download Excel file
  const DownloadBOM = () => {
    const file_name = lineup1[0].lineup1_name + ", " + new Date().toDateString().substring(4);
    // add item counter
    let counter = 1;
    for (let i in flat_bom1) {
      flat_bom1[i]["item"] = counter;
      counter += 1;
    }

    // rename headings
    const new_flat_bom1 = flat_bom1.map((rec) => {
      return {
        Item: rec.item,
        ID: rec.item_id,
        OEM_ID: rec.item_supplier_part_number,
        Category: rec.category_name,
        Description: rec.item_description,
        Price: rec.price_item,
        QTY: rec.qty,
        Total: rec.price_total,
      };
    });
    // console.log(new_flat_bom1);
    flat_bom1.sort((a, b) => (a.category_name < b.category_name ? -1 : 1));
    DownloadXLSX(new_flat_bom1, file_name);
  };

  const ItemizedBOMHandler = () => {
    setBomView(true);
  };
  const SectionalizedBOMHandler = () => {
    setBomView(false);
  };

  // console.log("flat_bom4", flat_bom4);
  return (
    <div id="main_container">
      {loading && <PsSpinner />}
      <section style={{ fontSize: "0.8rem", margin: "0.7rem 0 0 0" }}>
        {/* <Breadcrumbs router={router} /> */}
        <div
          style={{
            margin: "0rem 0 1rem 0",
            display: "flex",
            color: "var(--focus)",
          }}
        >
          <HomeIcon />
          <Link
            href={"/"}
            className={styles.links}
            style={{ fontSize: "0.8rem" }}
          >
            Home /
          </Link>
          <Link
            href={lineup1_configurator_url}
            className={styles.links}
            style={{ fontSize: "0.8rem", margin: "0 0 0 5px " }}
          >
            Lineup /
          </Link>
          <span style={{ margin: "0 0 0 5px ", color: "var(--foreground)" }}>
            Bill of Material
          </span>
        </div>
        <Link href={lineup1_configurator_url}>
          <ButtonIconActive>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: "0.80rem",
                padding: "0 10px 0 4px",
              }}
            >
              <span style={{ padding: "1px 0 0 0" }}>
                <ArrowLeft />
              </span>
              <div style={{ padding: "0 0 0px 0" }}>Back</div>
            </div>
          </ButtonIconActive>
        </Link>
      </section>
      <section style={{ fontSize: "0.9rem", margin: "1rem 0 0 0" }}>
        <div></div>
      </section>
      {/* ----------------INFO-------------- */}
      {lineup1 && (
        <section
          id="lineup1_info"
          style={{
            fontSize: "0.9rem",
            margin: "0.7rem 0 0 0",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <h3>
              {lineup1[0].lineup1_name}
              {/* {flat_bom1 && (
                <span> {Dollar(FlatBom1PriceFunction(flat_bom1))}</span>
              )} */}
            </h3>
          </div>
          <div className={styles.info_text}>
            Balance15 {(lineup1[0].lineup1_voltage / 1000).toLocaleString()}kV{" "}
            {lineup1[0].lineup1_current.toLocaleString()}
            {"A, "}
            {lineup1[0].lineup1_enclosure == "INDOOR"}
            {lineup1[0].lineup1_enclosure == "NEMA1" && "INDOOR"}
            {lineup1[0].lineup1_enclosure == "NEMA3R" && "OUTDOOR Non-Walk-In"}
            {lineup1[0].lineup1_enclosure == "NEMA3RW" && "OUTDOOR, WALK-IN"}
          </div>
          <div className={styles.info_text}>
            BO: {lineup1[0].lineup1_bo}, Lineup ID: {lineup1[0].lineup1_id}
          </div>
          <div style={{ minHeight: "1.8rem" }}>
            <h2>
              {flat_bom1 && (
                <span>{Dollar(FlatBom1PriceFunction(flat_bom1))}</span>
              )}
            </h2>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <div>
                <ButtonMini
                  onClick={ItemizedBOMHandler}
                  className={styles.text_button}
                >
                  Itemized BOM
                </ButtonMini>
              </div>
              <div>
                <ButtonMini
                  onClick={SectionalizedBOMHandler}
                  className={styles.text_button}
                >
                  Sectionalized BOM
                </ButtonMini>
              </div>
            </div>

            <div>
              <ButtonMini onClick={DownloadBOM} className={styles.text_button}>
                Download
              </ButtonMini>
            </div>
          </div>
        </section>
      )}
      {/* -------------- TABLE ---------------- */}
      <div>
        <div>
          {flat_bom1 && bomView && (
            <FlatBom1Table lineup1={lineup1[0]} flat_bom1={flat_bom1} />
          )}
        </div>
        <div>
          {flat_bom4 && !bomView && <FlatBom4Table flat_bom4={flat_bom4} />}
        </div>
      </div>
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
