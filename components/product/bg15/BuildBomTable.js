"use client";
// itemized bill of material
import styles from "@/styles/styles.module.css";
import { useState } from "react";
import Link from "next/link";
import { Dollar } from "@/components/functions/conversions";
import { FlatBom1PriceFunction } from "@/components/functions/price";
import { redirect } from "next/dist/server/api-utils";
import BomGrouping from "@/components/functions/bom_grouping";
import BomIcon from "@/components/ui/icons/BomIcon";
import FolderIcon from "@/components/ui/icons/FolderIcon";
import ChevronRightIcon from "@/components/ui/icons/ChevronRightIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";

export default function BuildBomTable({ flat_bom1 }) {
  // console.log("lineup1", lineup1);
  // group specific categories BOM
  // let flat_bom1_modified = BomGrouping(flat_bom1, "Bus Bar")
  // flat_bom1_modified = BomGrouping(flat_bom1_modified, "Bus Boots")
  // console.log("flat_bom1_modified", flat_bom1_modified)

  const [flatBom1, setFlatBom1] = useState(flat_bom1);




  let folders = [
    {
      name: "Home",
      folders: [
        {
          name: "Movies",
          folders: [
            {
              name: "Comedy",
              folders: [
                { name: 2010, folders: [{ name: "Popular", folders: [] }] },
                { name: 2011, folders: [] },
              ],
            },
            {
              name: "Action",
              folders: [
                {
                  name: 2000,
                  folders: [
                    { name: "Gladiator.mp4" },
                    { name: "Gladiator2.mp4" },
                  ],
                },
                { name: 2010, folders: [] },
              ],
            },
          ],
        },
        { name: "Music", folders: [] },
        {
          name: "Pictures",
          folders: [],
        },
        {
          name: "Documents",
          folders: [],
        },
        {
          name: "password.txt",
        },
      ],
    },
  ];

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
        Itemized Bill of Material
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
        {/* <select
          className={styles.form_select}
          value={filter}
          onChange={onFilterHandler}
        >
          <option key={"no_flter"} value={"all"} style={{ opacity: "0.6" }}>
            Show All
          </option>
          {cats.sort().map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select> */}

        {/* <div>
          <span className={styles.input_text}>
            <input
              type="text"
              placeholder="Search bill of material..."
              className="search"
              onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            />
          </span>
        </div> */}
      </div>

      {/* -----------table------------- */}
      <div className={styles.bom_table_wrapper} style={{}}>
        <ul style={{ padding: "0 0 0 0rem" }}>
          {folders.map((folder) => (
            <Folder folder={folder} key={folder.name} />
          ))}
        </ul>

        {/* <table
          className={styles.content_table}
          style={{
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "7rem" }}>Part ID</th>
            </tr>
          </thead>
          <tbody>
            {folders.map((folder) => (
              <tr key={folder.name} style={{}}>
                <td style={{ display: "flex", alignItems: "center" }}>
                  <FolderIcon style={{ margin: "0 5px 0 0" }} />
                  {folder.name}
                </td>
                <td>
                  <table>
                    <tbody>
                      {folder.folders?.map((folder) => (
                        <tr key={folder.name}>
                          <td>{folder.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

function Folder({ folder }) {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <li>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "0 0 3px 0",
        }}
      >
        {folder.folders && folder.folders.length > 0 ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: "none", border: "none" }}
          >
            {isOpen ? <ChevronRightIcon /> : <ChevronDownIcon />}
          </button>
        ) : (
          <span style={{ margin: "0 0 0 12px" }}></span>
        )}

        {folder.folders ? (
          <FolderIcon />
        ) : (
          <BomIcon style={{ margin: "0 0 0 0rem" }} />
        )}
        {folder.name}
      </span>
      {isOpen && (
        <ul style={{ padding: "0 0 0 1rem" }}>
          {folder.folders?.map((folder) => (
            <Folder folder={folder} key={folder.name} />
          ))}
        </ul>
      )}
    </li>
  );
}
