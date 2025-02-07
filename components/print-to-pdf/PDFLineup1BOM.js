// react-to-print
import React from "react";
import Bg1BOM from "../product/bg15/Bg1BOM";
import Image from "next/image";
import styles from "./PDFLineup1BOM.module.css";

// Using a class component, everything works without issue
export class PDFLineup1BOM extends React.PureComponent {
  render() {
    const { lineup1Nested } = this.props;
    const logo = "/bg1_cpt_location2.svg";
    const date = new Date().toDateString().substring(4);

    return (
      <div>
        <span className={styles.watermark}>
          <Image alt={""} src={logo} width={500} height={700} />
        </span>
        <table className={styles.report_container}>
          <thead className={styles.report_header}>
            <tr>
              <th className={styles.report_header_cell}>
                <div className={styles.header_info}>
                  <Image
                    src="/powersecure_color.svg"
                    alt="PowerSecure Logo"
                    width={175}
                    height={50}
                  />
                  <div>
                    PowerSecure - {lineup1Nested.lineup1_name} <br />
                    Quote ID: {lineup1Nested.quote_id} <br />
                    Lineup ID : {lineup1Nested.lineup1_id} <br />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tfoot className={styles.report_footer}>
            <tr>
              <td className={styles.report_footer_cell}>
                <div className={styles.footer_info}>
                  <div className={styles.page_footer}> </div>
                </div>
              </td>
            </tr>
          </tfoot>
          <tbody className={styles.report_content}>
            <tr>
              <td className={styles.report_content_cell}>
                <div className={styles.main}>
                  <h2>Bill of Material</h2>
                  <Bg1BOM lineup1Nested={lineup1Nested} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
