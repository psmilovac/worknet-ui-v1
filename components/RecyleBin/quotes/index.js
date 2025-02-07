"use client";
import ProductLayout from "@/components/layouts/ProductLayout";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import QuoteTable from "@/components/product/bg15/QuoteTable";
import Button from "@/components/ui/buttons/Button";
import { useRouter } from "next/router";
import useSWR from "swr";
import styles from "@/styles/styles.module.css";
import { useState, useContext, useEffect } from "react";
import { redirect } from "next/navigation";
import Pagination from "@/components/navigation/Pagination";
import { api_root } from "@/global/global_vars";
import Link from "next/link";
import { Dollar } from "@/components/functions/conversions";
import { QuotePrice } from "@/components/functions/price";
import PsSpinner from "@/components/ui/spinners/PsSpinner";
import AuthContext from "@/components/context/AuthContext";
import axios from "axios";

// import "@/styles/form.module.css";


const quote_api_url = api_root + "/api/bg/quote";

export default function Page(props) {
  const router = useRouter();
  const { isAuthenticated, user, accessToken } = useContext(AuthContext) || {}; // error will show without || {}
  // console.log("accessToken from quote/index", accessToken);
  // console.log("user_id from quote/index", user?.user_id);

  // AUTH
  useEffect(() => {
    loadUser();
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

  // COMMON
  const [customerName, setCustomerName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const title = "Quotes"; // Custom Breadcrumbs: type the names the way they are in the sidebar
  // const router = useRouter();
  const quote_new_api_url =
    api_root + "/api/bg/quote-new";
  const quote_detail_page = router.pathname;

  // fetch quote data
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(quote_api_url, fetcher);

  // useEffect(() => {
  //   setAuthenticated(isAuthenticated);
  // }, [isAuthenticated]);

  // if (isLoading) return <PsSpinner />;
  if (isLoading) return "Loading...";
  if (error) return <div>Failed to load</div>;
  if (!data) return <p>No profile data</p>;

  const data_sorted = data.sort((a, b) => (a.quote_id > b.quote_id ? -1 : 1));
  // handle new quote
  const toQuoteIdPage = (quote) => {
    router.push(router.pathname + "/" + quote.quote_id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    // if (customerName.trim() === "") {
    //   setIsValidCustomerName(false);
    //   return;
    // }
    // setIsValidCustomerName(true);

    const reqBody = {
      quote_customer: customerName,
      user_id: user.user_id,
      quote_opened_date: Date.now(),
    };
    fetch(quote_new_api_url, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((quote) => toQuoteIdPage(quote));
  };

  // pagination
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentData = data_sorted.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      {/* Authenticated: {isAuthenticated ? "True" : "False"} */}
      {/* <Breadcrumbs router={router} /> */}
      <h2>{title}</h2>
      {/* <h4>Balance Gear 15kV</h4> */}
      <div style={{ fontWeight: 600, opacity: "0.8" }}>BalanceGear 15kV</div>
      <div>
        <form onSubmit={handleSubmit} className={styles.input_text}>
          {/* <label htmlFor="new_quote">Add Quote</label> */}
          <input
            id="quote"
            type="text"
            placeholder="e.g. ABC Company"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            // autoFocus
          ></input>
          <span style={{ margin: "0 0 0 0.5rem" }}>
            <Button type="submit">New Quote</Button>
          </span>
        </form>
      </div>
      <div>
        <table
          style={{
            width: "100%",
            // height: "100%",
            // position: "relative",
            // position: "absolute",
          }}
          className={styles.content_table}
        >
          <thead>
            <tr>
              <th style={{ width: "6rem", backgroundColor: "var(--ps-blue)" }}>
                Quote
              </th>
              {/* <th style={{ width: "7rem", backgroundColor: "var(--ps-blue)" }}>
                Created by
              </th> */}
              <th style={{ backgroundColor: "var(--ps-blue)" }}>Customer</th>
              <th style={{ width: "7rem", backgroundColor: "var(--ps-blue)" }}>
                Amount
              </th>
              <th style={{ width: "6rem", backgroundColor: "var(--ps-blue)" }}>
                Opened
              </th>
              <th style={{ width: "6rem", backgroundColor: "var(--ps-blue)" }}>
                Closed
              </th>
            </tr>
          </thead>
          <tbody>
            {/* // "data &&" for empty data do not continue forward */}

            {currentData &&
              currentData.map((row, index) => (
                <tr key={row.quote_id}>
                  <td>
                    <Link
                      href={router.pathname + "/" + row.quote_id}
                      className={styles.inside_table_button}
                    >
                      {row.quote_id}
                    </Link>
                  </td>
                  {/* <td>
                    <Link href="#">{row.quote_user}</Link>
                  </td> */}
                  <td>
                    <Link href={router.pathname + "/" + row.quote_id}>
                      {row.quote_customer}
                    </Link>
                  </td>
                  <td>
                    Price
                    {/* <Link href={router.pathname + "/" + row.quote_id}>
                      {Dollar(QuotePrice(row))}
                    </Link> */}
                  </td>
                  <td>
                    <Link href="#">
                      {new Date(row.quote_opened_date).toLocaleDateString()}
                    </Link>
                  </td>
                  <td>
                    <Link href="#">{row.quote_closed}</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      {/* <div>
        <span>
          Showing {firstPostIndex + 1} to {lastPostIndex} of {data.length}{" "}
          entries
        </span>
        <Pagination
          totalPosts={data.length}
          postsPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div> */}
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
