import React from "react";
import ProductLayout from "@/components/layouts/ProductLayout";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/components/context/AuthContext";
import axios from "axios";
import { api_root } from "@/global/global_vars";
import styles from "@/styles/styles.module.css";
import FlatPackToItemBomFunction from "@/components/functions/flat_pack_to_item_bom";
import FlatItemBomTable from "@/components/product/bg15/FlatItemBomTable";

export default function Page() {
  const router = useRouter();
  const { isAuthenticated, user, accessToken } = useContext(AuthContext) || {}; // error will show without || {}
  const [pack, setPack] = useState("");
  const [loading, setLoading] = useState(false);
  const pack_id = router.query.pack_id; //catch the lineup1 id

  // console.log("accessToken from pack page", accessToken);
  // console.log("user_id from pack page", user?.user_id);

  // AUTH
  useEffect(() => {
    loadUser();
    GetPack();
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

  // FETCH 2, faster, single fetch, control over url preparation, no mutation (manual refresh)
  const GetPack = async () => {
    const url = api_root + "/api/pack-nested/" + pack_id;
    // const url = lineup1_nested_api_url + pack_id;
    // const config = { "content-type": "application/json" };
    const config = {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    // const bodyParameters = {
    //   key: "value",
    // };
    // console.log(url);
    if (pack_id) {
      setLoading(true);
      setPack("");
      try {
        await axios
          .get(url, config)
          .then((res) => setPack(() => res.data))
          .then(() => setLoading(false));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  // console.log(pack);
  let flatItems = FlatPackToItemBomFunction(pack);

  return (
    <div>
      {pack && (
        <section
          id="pack_info"
          style={{
            // width: "22.5rem",
            fontSize: "0.9rem",
            margin: "0.7rem 0 0 0",
          }}
        >
          <div className={styles.info_text}>
            Description:
            <span>
              <h3>{pack.pack_description}</h3>
            </span>
          </div>

          <div className={styles.info_text}>Name: {pack.pack_name}</div>
          <div className={styles.info_text}>
            Category: {pack.category.category_name}
          </div>
          <div className={styles.info_text}>Pack ID: {pack.pack_id}</div>
        </section>
      )}
      <FlatItemBomTable flatItems={flatItems} pack={pack} />
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
