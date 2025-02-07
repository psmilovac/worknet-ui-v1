import ProductLayout from "@/components/layouts/ProductLayout";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { useRouter } from "next/router";
import { api_root } from "@/global/global_vars";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import styles from "@/styles/styles.module.css";
import Image from "next/image";
import { useState } from "react";
import ImageFallback from "@/components/ui/ImageFallback";
import { PackPrice, Unit1Price } from "@/components/functions/price";
import { Dollar } from "@/components/functions/conversions";
import PsSpinner from "@/components/ui/spinners/PsSpinner";

// api url
const base_api_url = api_root + "/api/bg/lineup1-nested/";
const put_unit1_base_api_url = api_root + "/api/bg/unit1-put/";

export default function Page() {
  const [busImg, setBusImg] = useState("/bg15_busbar.svg");
  const [compartmentImage, setCompartmentImage] = useState(
    "/bg15_compartment.svg"
  );

  // Custom Breadcrumbs: type the names the way they are in the sidebar
  const title = "Section";
  const router = useRouter();
  const lineup1_id = Number(router.query.unit?.[0]); // check for not existing
  const lineups_url = router.pathname.split("[")[0]; // return the url before '[' symbol
  const unit1_id = Number(router.query.unit?.[1]);
  //   console.log("path_name", path_name)

  // API URL
  const get_lineup1_api_url = base_api_url + lineup1_id;

  // Page URL
  const lineup1_id_url = lineups_url + lineup1_id;

  // GET lineup1
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // const get_pack_api_url = api_root + "/api/pack-nested"; //maximum depth. includes all items
  const get_pack_api_url = api_root + "/api/pack"; //shallow depth, no nested elements

  // needed for multiple feches
  function fetcher(...urls) {
    const f = (u) => fetch(u).then((r) => r.json());
    if (urls.length > 1) {
      return Promise.all(urls.map(f));
    }
    return f(urls);
  }

  // GET PACK nested table with all items
  const {
    data: pack_table,
    error: error_pack_table,
    isLoading: isLoading_pack_table,
  } = useSWR(get_pack_api_url, fetcher);

  // GET lineup1
  const {
    data: lineup1,
    error: error_lineup1,
    isLoading: isLoading_lineup1,
    mutate: mutate_lineup1,
  } = useSWR(get_lineup1_api_url, fetcher);
  if (isLoading_lineup1 || isLoading_pack_table) return <PsSpinner />;
  if (!lineup1 || !pack_table) return <p>No profile data</p>;
  if (error_lineup1 || error_pack_table) return <div>Failed to load</div>;

  // console.log("pack_table", pack_table);
  // console.log("lineup1", lineup1);

  // get and sort unit1s
  let unit1_arr = [];
  // if (lineup1) {
  //   unit1_arr = lineup1.unit1.sort(
  //     (a, b) => a.unit1_position - b.unit1_position
  //   );
  // }

  // find the unit1
  let unit1 = [];
  for (let u of unit1_arr) {
    if (u.unit1_id === unit1_id) {
      unit1 = u;
    }
  }

  const selectBusbarHandler = (category, pack_id) => async () => {
    // send what category we are updating and its value
    // categories are from the unit1 table. e.g. bus_id is for the oneline busbar
    const reqBody = { [category]: pack_id };
    putUnit1(reqBody);
  };

  const clearHandler = (unit1, pack) => () => {
    // pack is type of object, e.g bus, comps, ct
    // need to convert from NestedSchema to PlainSchema e.g. from unit1:{ bus: { pack_id:2 }} to bus_id = 2
    if (!!unit1[pack]) {
      let reqBody = {};
      reqBody[pack + "_id"] = null;
      putUnit1(reqBody);
    }
  };

  // basic fetch for updating the Unit
  // reqBody comes prepared, and unit1 and api_url are already defined
  // Unit1 gets refresh through mutate useSWR for the entire lineup1
  const putUnit1 = (reqBody) => {
    // console.log("reqB", reqBody);
    fetch(put_unit1_base_api_url + unit1_id, {
      method: "PUT",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => mutate_lineup1());
  };

  const setBusImgHandler = () => {
    console.log("setBusImgHandler");
  };

  return (
    <div>hi</div>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <>
      <ProductLayout>{page}</ProductLayout>
    </>
  );
};
