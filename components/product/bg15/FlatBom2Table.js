"use client";
import styles from "@/styles/styles.module.css";
import { useState } from "react";
import Link from "next/link";
import { Dollar } from "@/components/functions/conversions";

export default function FlatBom2Table({ flatBom2, lineup1 }) {
  const [search, setSearch] = useState("");
  const pack_item_url = "/product/bg15/application/pack/";

  // available fileds

  // category_name:
  // category_description:
  // pack:
  // pack_id:
  // pack_name:
  // pack_description:
  // pack_price:
  // qty:
  // total:

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0.5rem 0 0 0 ",
        }}
      >
        <div
          style={{
            alignSelf: "flex-end",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          Bill of Material
        </div>
        <div>
          <span className={styles.input_text}>
            <input
              type="text"
              placeholder="Search bill of material..."
              className="search"
              onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            />
          </span>
        </div>
      </div>
      <div className={styles.bom_table_wrapper}>
        <table className={styles.bom_table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>ID</th>
              <th>Description</th>
              <th>Price</th>
              <th>QTY</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {flatBom2 &&
              flatBom2
                .filter(
                  (data) =>
                    data.pack_description.toLowerCase().includes(search) ||
                    data.pack_id.toString().toLowerCase().includes(search) ||
                    data.category_name.toLowerCase().includes(search)
                )
                .sort((a, b) => (a.category_name < b.category_name ? -1 : 1))
                .map((data, index) => (
                  <tr key={data.pack_id}>
                    <td data-cell="Section">{index + 1}</td>
                    <td data-cell="Section">{data.category_name}</td>
                    <td data-cell="Section">{data.pack_id}</td>
                    <td data-cell="Section">
                      <Link href={pack_item_url + data.pack_id}>
                        {data.pack_description}
                      </Link>
                    </td>
                    <td data-cell="Section">{Dollar(data.pack_price)}</td>
                    <td data-cell="Section">{data.qty}</td>
                    <td data-cell="Section">{Dollar(data.total)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
