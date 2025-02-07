import React from "react";
import Link from "next/link";
import styles from "@/styles/styles.module.css";

export default function LineupTable(props) {
  const data = props.lineup1;

  return (
    <div>
      <table style={{width: "50rem"}} className={styles.content_table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>NEMA</th>
            <th>Current A</th>
            <th>Voltage kV</th>
            <th>kAIC</th>
          </tr>
        </thead>
        <tbody>
          {/* // "data &&" for empty data do not continue forward */}

          {data &&
            data.map((row) => (
              <tr key={row.lineup1_id}>
                <td>
                  <Link href="#">{row.lineup1_id}</Link>
                </td>
                <td>
                  <Link href="#">{row.lineup1_name}</Link>
                </td>
                <td>{row.lineup1_enclosure}</td>
                <td>
                  {row.lineup1_current && row.lineup1_current.toLocaleString()}
                </td>
                <td>{row.lineup1_voltage / 1000}</td>
                <td>{row.lineup1_kaic}</td>
    
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
