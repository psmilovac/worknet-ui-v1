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
import BuildBomTable from "@/components/product/bg15/BuildBomTable";
import FlatBom4Table from "@/components/product/bg15/FlatBom4Table";
import { FlatBom1PriceFunction } from "@/components/functions/price"; // itemized bill of material

import DownloadXLSX from "@/components/functions/download_xlsx";
import ButtonMini from "@/components/ui/buttons/ButtonMini";
import TriangleMiniSideSpinner from "@/components/ui/spinners/TriangleMiniSideSpinner";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import ButtonIconActive from "@/components/ui/buttons/ButtonIconActive";
import ArrowLeft from "@/components/ui/icons/ArrowLeft";
import { JsonToJsonBom } from "@/components/functions/json_json_bom";
import ExpandableTable from "@/components/ui/tables/ExpandableTable";
import {useTable} from "@tanstack/react-table";
import {data, columns} from "@/components/ui/tables/data";

const build_bom_flat_api = api_root + "/api/bg/lineup1-build-bom1-flat/";
const build_bom_nested_api = api_root + "/api/bg/lineup1-build-bom1-nested/";

export default function Page() {
  const router = useRouter();
  const lineup1_id = router.query.lineup1_id;
  const { isAuthenticated, user, accessToken } = useContext(AuthContext) || {};
  const [build_bom_flat, setBuildBomFlat] = useState("");
  const [build_bom_nested, setBuildBomNested] = useState("");
  const [flat_bom4, setFlatBom4] = useState("");
  const [loading, setLoading] = useState(false);
  const [bomView, setBomView] = useState(true); // Itemized or Sectionalized view

  // AUTH
  useEffect(() => {
    loadUser();
    GetBuildBomFlat();
    GetBuildBomNested();
    // GetFlatBom4();
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

  const lineup1_configurator_url = "/product/bg15/lineups/" + lineup1_id;
  const lineup1_info_api = api_root + "/api/bg/lineup1-info/" + lineup1_id;

  // Use fetch with auth token
  const fetcher1 = (url, token) => axios.get(url, { headers: { Authorization: "Bearer " + token } }).then((res) => res.data);

  const GetBuildBomFlat = async () => {
    setLoading(true);
    const url = build_bom_flat_api + lineup1_id;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios
        .get(url, config)
        .then((res) => setBuildBomFlat(res.data))
        .then(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  const GetBuildBomNested = async () => {
    setLoading(true);
    const url = build_bom_nested_api + lineup1_id;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      await axios
        .get(url, config)
        .then((res) => setBuildBomNested(res.data))
        .then(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Lineup1 Info using fetcher1
  const {
    data: lineup1, // this is array!
    error: error_lineup1,
    isLoading: is_loading_lineup1,
  } = useSWR([lineup1_info_api, accessToken], ([lineup1_info_api, accessToken]) => fetcher1(lineup1_info_api, accessToken)); //

  if (is_loading_lineup1) return <PsSpinner />;

  if (build_bom_nested) {
    JsonToJsonBom(build_bom_nested);
    console.log("Build Bom Nested:", JsonToJsonBom(build_bom_nested));
  }

  // console.log("Build Bom Flat:", build_bom_flat);
  // console.log("build_bom_nested:", build_bom_nested);
console.log("data", data)
console.log("columns", columns)
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
          <Link href={"/"} className={styles.links} style={{ fontSize: "0.8rem" }}>
            Home /
          </Link>
          <Link href={lineup1_configurator_url} className={styles.links} style={{ fontSize: "0.8rem", margin: "0 0 0 5px " }}>
            Lineup /
          </Link>
          <span style={{ margin: "0 0 0 5px ", color: "var(--foreground)" }}>Bill of Material</span>
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
            <h3>{lineup1[0].lineup1_name}</h3>
          </div>
          <div className={styles.info_text}>
            Balance15 {(lineup1[0].lineup1_voltage / 1000).toLocaleString()}kV {lineup1[0].lineup1_current.toLocaleString()}
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
              {/* {build_bom && (
                <span>{Dollar(FlatBom1PriceFunction(build_bom))}</span>
              )} */}
            </h2>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {/* <ButtonMini onClick={DownloadBOM} className={styles.text_button}>
                Download
              </ButtonMini> */}
            </div>
          </div>
        </section>
      )}
      {/* -------------- TABLE ---------------- */}
      <div>
        <div>{<ExpandableTable data={data} columns={columns} />}</div>

        <div>{build_bom_flat && <BuildBomTable build_bom={build_bom_flat} />}</div>
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
