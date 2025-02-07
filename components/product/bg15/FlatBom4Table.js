"use client";
// itemized bill of material
import styles from "@/styles/styles.module.css";
import { useState } from "react";
import Link from "next/link";
import { Dollar } from "@/components/functions/conversions";
import { FlatBom4PriceFunction } from "@/components/functions/price";
import { redirect } from "next/dist/server/api-utils";
import BomGrouping from "@/components/functions/bom_grouping";

export default function FlatBom4Table({ flat_bom4, lineup1 }) {
  let flat_bom4_modified = BomGrouping(flat_bom4, "Bus Bar") 
  flat_bom4_modified = BomGrouping(flat_bom4_modified, "Bus Boots")
  const [flatBom4, setFlatBom4] = useState(flat_bom4_modified);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const cats = [
    ...new Set(
      flat_bom4.map((unique_catagories) => unique_catagories.unit1_position)
    ),
  ]; // set unique categories as unit1 positions

  // on Category click filter flat_bom4
  const onFilterHandler = (e) => {
    const fltr = e.target.value;
    setFilter(fltr);
    if (fltr != "all") {
      const temp = flat_bom4.filter((x) => x.unit1_position === Number(fltr));
      setFlatBom4(temp);
    } else {
      setFlatBom4(flat_bom4);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1rem 1rem 3rem 1rem",
        margin: "0.5rem 0 1rem 0",
        // border: "1px solid lightgray",
        boxShadow: "0 3px 6px -2px rgba(50, 50, 93, 0.25)",
      }}
    >
      {/* -----------caption block---------- */}
      <div
        style={{
          textTransform: "uppercase",
          fontWeight: "600",
          margin: "0.5rem 0 0rem 0",
        }}
      >
        Sectionalized Bill of Material
      </div>

      {/* Filters */}
      <div
        id="caption_block"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0.5rem 0 0.5rem 0 ",
          width: "100%",
        }}
      >
        <select
          className={styles.form_select}
          value={filter}
          onChange={onFilterHandler}
        >
          <option key={"no_flter"} value={"all"} style={{ opacity: "0.6" }}>
            Show All
          </option>
          {cats.sort().map((cat, index) => (
            <option key={index} value={cat}>
              Section {cat}
            </option>
          ))}
        </select>

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

      {/* -----------table------------- */}
      <div className={styles.bom_table_wrapper} style={{}}>
        <table
          className={styles.content_table}
          style={{
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "2rem" }}></th>
              <th style={{ width: "3rem" }}>Section</th>
              <th style={{ width: "5rem" }}>Part ID</th>
              <th style={{ width: "5rem" }}>OEM's Part ID</th>
              <th style={{ width: "7rem" }}>Category</th>
              <th>Description</th>
              <th style={{ width: "3rem", textAlign: "right" }}>Price</th>
              <th style={{ width: "3rem", textAlign: "right" }}>QTY</th>
              <th style={{ width: "3rem", textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {flatBom4 &&
              flatBom4
                .filter(
                  (data) =>
                    data.item_description.toLowerCase().includes(search) ||
                    data.item_id.toString().toLowerCase().includes(search) ||
                    data.category_name.toLowerCase().includes(search)
                )
                .sort((a, b) =>
                  a.unit1_position !== b.unit1_position
                    ? a.unit1_position - b.unit1_position
                    : a.category_name < b.category_name
                    ? -1
                    : 1
                )
                .map((data, index) => (
                  <tr key={index}>
                    <td style={{ opacity: "0.5" }}>{index + 1}</td>
                    <td style={{}}>{data.unit1_position}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{data.item_id}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{data.item_supplier_part_number}</td>
                    <td>{data.category_name}</td>
                    <td>{data.item_description}</td>
                    <td style={{ textAlign: "right" }}>
                      {Dollar(data.price_item)}
                    </td>
                    <td style={{ textAlign: "right" }}>{data.qty}</td>
                    <td style={{ textAlign: "right" }}>
                      {Dollar(data.price_total)}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        <div
          style={{
            float: "right",
            padding: "0.5rem 0.5rem 2rem 0 ",
            fontSize: "0.9rem",
            fontWeight: "600",
          }}
        >
          Total: {" "}
          {Dollar(
            FlatBom4PriceFunction(
              flatBom4.filter(
                (data) =>
                  data.item_description.toLowerCase().includes(search) ||
                  data.item_id.toString().toLowerCase().includes(search) ||
                  data.category_name.toLowerCase().includes(search)
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
