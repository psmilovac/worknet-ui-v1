"use client";
import styles from "@/styles/styles.module.css";
import { useState } from "react";
import Link from "next/link";
import ConfirmModal from "@/components/modals/ConfirmModal";
import ConfirmMessageModal from "@/components/modals/ConfirmMessageModal";
import ModalTemplate from "@/components/modals/ModalTemplate";

export default function FlatItemBomTable({flatItems, pack}) {
  const [search, setSearch] = useState("");

  // available fileds
  // category_description
  // category_id
  // category_name
  // item_description
  // item_id
  // qty

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
          Items
        </div>
        <div>
          <span className={styles.input_text}>
            <input
              type="text"
              placeholder="Search items..."
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
              <th>QTY</th>
            </tr>
          </thead>
          <tbody>
            {flatItems &&
              flatItems
                .filter(
                  (data) =>
                    data.item_description.toLowerCase().includes(search) ||
                    data.item_id.toString().toLowerCase().includes(search) ||
                    data.category_name.toLowerCase().includes(search)
                )
                .sort((a, b) => (a.category_name < b.category_name ? -1 : 1))
                .map((data, index) => (
                  <tr key={data.item_id}>
                    <td data-cell="Section">{index + 1}</td>
                    <td data-cell="Section">{data.category_name}</td>
                    <td data-cell="Section">{data.item_id}</td>
                    <td data-cell="Section">{data.item_description}</td>
                    <td data-cell="Section">{data.qty}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
