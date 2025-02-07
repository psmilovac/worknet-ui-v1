import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";

const ExpandableTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => !!row.original.subRows, // Enable expansion only if subRows exist
  });
console.log("table", table)

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#f4f4f4",
                }}
              >
                asdf
                    {/* {header.isPlaceholder ? null : header.render("Header")} */}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <tr>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {cell.column.id === "expander" ? (
                    <button onClick={row.getToggleExpandedHandler()}>
                      {row.getIsExpanded() ? "▼" : "▶"}
                    </button>
                  ) : (
                    "asd"
                  )}
                </td>
              ))}
            </tr>
            {row.getIsExpanded() && row.original.subRows && (
              <tr>
                <td colSpan={columns.length} style={{ paddingLeft: "20px" }}>
                  <ExpandableTable
                    data={row.original.subRows}
                    columns={columns.filter((col) => col.id !== "expander")}
                  />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ExpandableTable;
