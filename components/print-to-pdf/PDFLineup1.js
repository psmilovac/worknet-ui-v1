// react-to-print
import React from "react";
import Image from "next/image";
import styles from "@/styles/styles.module.css";
import { api_root } from "@/global/global_vars";
// unit1_column
// Using a class component, everything works without issue
export class PDFLineup1 extends React.PureComponent {
  render() {
    const { lineup1 } = this.props;
    let { showBus } = this.props;
    let { showComps } = this.props;
    const fontSizeTransformersRatio = "0.49rem";
    const lastUnit = Object.keys(lineup1.unit1).length;
    console.log("lastUnit", lastUnit);

    // Default base topview is set for NEMA1 enclosure type
    let base_topview = "/bg1_base_nema1_topview.svg";
    let base_topview_dimension = "/bg1_base_nema1_topview_dim.svg";
    let base_topview_height = 315; // ratio is 1.808 using svg box height
    let bg1_base_main_cables = "/bg1_base_nema1_main_cables.svg";
    let bg1_base_side_cables = "/bg1_base_nema1_side_cables.svg";

    if (lineup1.lineup1_enclosure === "NEMA3R") {
      // console.log(lineup1);
      base_topview = "/bg1_base_nema3r_topview.svg";
      base_topview_dimension = "/bg1_base_nema3r_topview_dim.svg";
      base_topview_height = 357;
      bg1_base_main_cables = "/bg1_base_nema3r_main_cables.svg";
      bg1_base_side_cables = "/bg1_base_nema3r_side_cables.svg";
    }

    showBus = false;
    showComps = true;

    let unit1_number = 0;
    if (lineup1.unit1) {
      unit1_number = lineup1.unit1.length;
    }

    const date = new Date().toDateString().substring(4);

    // console.log(lineup1);

    return (
      <div
        id="main_container"
        style={{
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        <Image
          src={"/ledger_titleblock_indoor.svg"}
          alt="Ledge Paper"
          width={1632}
          height={1056}
          priority
          style={{ position: "fixed", top: "0px", left: "0px" }}
        />

        {/* Table Block */}
        <div
          id="table_block_info"
          style={{
            fontSize: "0.45rem",
            position: "fixed",
            // top: "0px",
            left: "1241px",
            top: "993px",
          }}
        >
          <ul>
            <li style={{ fontSize: "0.55rem" }}>{lineup1.lineup1_name}</li>
            <li>LINEUP ID: {lineup1.lineup1_id}</li>
            <li>DATE: {date}</li>
            <li>DRAWN BY: WORKNET</li>
          </ul>
        </div>

        {/* Title and Information */}
        <div
          id="info"
          style={{
            position: "relative",
            left: "300px",
            top: "250px",
            // color: "green",
            fontSize: "0.8rem",
          }}
        >
          <Image src="/powersecure_color.svg" alt="PowerSecure Logo" width={245} height={70} />
          <table>
            {/* <thead style={{ textAlign: "left" }}>
              <th>Lineup:</th>
              <th>{lineup1.lineup1_name}</th>
            </thead> */}
            <tbody>
              <tr>
                <td
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  QUOTE DRAWING
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Lineup: </td>
                <td>{lineup1.lineup1_name}</td>
              </tr>
              <tr>
                <td>Date: </td>
                <td>{date}</td>
              </tr>
              <tr>
                <td>Quote Number: </td>
                <td>{lineup1.quote_id}</td>
              </tr>
              <tr>
                <td>Lineup ID: </td>
                <td>{lineup1.lineup1_id}</td>
              </tr>
              <tr>
                <td style={{ height: "10px" }}> </td>
                <td> </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  EQUIPMENT
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Equipment Type: </td>
                <td>MEDIUM VOLTAGE METAL CLAD SWITCHGER</td>
              </tr>
              <tr>
                <td>Enclosure Type: </td>
                <td>
                  {lineup1.lineup1_enclosure == "INDOOR"}
                  {lineup1.lineup1_enclosure == "NEMA1" && "INDOOR"}
                  {lineup1.lineup1_enclosure == "NEMA3R" && "OUTDOOR, NON-WALK-IN"}
                  {lineup1.lineup1_enclosure == "NEMA3RW" && "OUTDOOR, WALK-IN"}
                </td>
              </tr>
              <tr>
                <td>Designation:</td>
                <td>NEXGEAR MC15</td>
              </tr>
              <tr>
                <td>Voltage Class: </td>
                <td>15 kV</td>
              </tr>
              <tr>
                <td>Rated Current: </td>
                <td>1200 A</td>
              </tr>
              <tr>
                <td>BIL Rating: </td>
                <td>95 kV</td>
              </tr>
              <tr>
                <td>Interrupting Current Rating: </td>
                <td>50 kA (2 seconds)</td>
              </tr>
              <tr>
                <td>Interrupting Current Peak: </td>
                <td>140 kA</td>
              </tr>
              <tr>
                <td>Number of Phases: </td>
                <td>3</td>
              </tr>
              <tr>
                <td>Number of Sections: </td>
                <td>{unit1_number}</td>
              </tr>
              <tr>
                <td>Lineup Lenght: </td>
                <td>{unit1_number * 3} ft</td>
              </tr>
              <tr>
                <td>UL Listed: </td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>ANSI Standard: </td>
                <td>C37.20.2-2022</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="page-break" />

        {/* Front Elevation */}
        <div
          id="elevation"
          style={{
            position: "relative",
            left: "100px",
            top: "180px",
            height: "600px",
          }}
        >
          {(showBus = false)}
          {(showComps = true)}

          {/* Page Number and Title */}
          <section>
            <div
              style={{
                fontSize: "0.8rem",
                position: "relative",
              }}
            >
              Page: 2
            </div>

            <div
              style={{
                fontSize: "1rem",
                position: "relative",
              }}
            >
              FRONT ELEVATION
            </div>
            <br />
            <br />
          </section>

          {/* lineup1 map */}
          <section>
            {lineup1.unit1 && (
              <div className={styles.lineup1_print}>
                <div>
                  <Image
                    src={"/bg1_dimension_v_95_600x60.svg"}
                    alt="Dimension Section"
                    width={33}
                    height={330}
                    priority
                    className={styles.unit1_row}
                    style={{
                      position: "relative",
                      // right: "0",
                      top: "38px",
                      opacity: "0.7",
                    }}
                  />

                  <Image
                    // src={"/bg1_dimension_v_4_26x60.svg"}
                    src={"/bg1_dimension_v_4_60x48.svg"}
                    alt="Dimension Section"
                    width={33}
                    height={26}
                    priority
                    className={styles.unit1_row}
                    style={{
                      position: "relative",
                      // right: "0",
                      top: "38px",
                      opacity: "0.7",
                    }}
                  />
                </div>
                {lineup1.unit1
                  .sort((a, b) => (a.unit1_position > b.unit1_position ? 1 : -1))
                  .map((unit1, index) => (
                    <div
                      className={styles.unit1_column_no_dash}
                      key={unit1.unit1_id}
                      style={{
                        width: "125px",
                        // height: "330px",
                        height: "380px",
                        position: "relative",

                        // border: "1px solid black",
                      }}
                    >
                      <div
                        className={styles.unit1_row}
                        title={"Section ID: " + unit1.unit1_id}
                        style={{
                          fontSize: "0.8rem",
                          opacity: 0.7,
                          padding: "0rem 0 1rem 0 ",
                        }}
                      >
                        Section {index + 1}
                      </div>
                      <div>
                        {unit1.comps && showComps && (
                          <Image
                            src={unit1.comps.pack_image_url}
                            alt="Compartments"
                            width={125}
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}

                        {unit1.ctrl1 && showComps && (
                          <Image
                            src={"/bg1_ctrl_instrument_" + unit1.ctrl1?.pack_name + "_1.svg"}
                            alt="Controls Instuments Bottom Breaker"
                            width={125}
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.ctrl2 && showComps && (
                          <Image
                            src={"/bg1_ctrl_instrument_" + unit1.ctrl2?.pack_name + "_2.svg"}
                            alt="Controls Instuments Upper Breaker"
                            width={125}
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                      </div>
                      {/* show the double base only for odd positions */}
                      {unit1.comps && showComps && unit1.unit1_position % 2 !== 0 && unit1.unit1_position < lastUnit && (
                        <Image
                          src={"/bg1_base_72x4.svg"}
                          alt="Dimension Section"
                          width={250}
                          height={25}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            left: "0px",
                            top: "363px",
                            zIndex: "1",
                          }}
                        />
                      )}

                      {/* the last base if the lineup1 has odd number of sections */}
                      {unit1.comps && showComps && unit1.unit1_position % 2 !== 0 && unit1.unit1_position === lastUnit && (
                        <Image
                          src={"/base36x4.svg"}
                          alt="Dimension Section"
                          width={125}
                          height={25}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            left: "0px",
                            top: "363px",
                            zIndex: "1",
                          }}
                        />
                      )}

                      {unit1.comps && showComps && unit1.unit1_position % 2 !== 0 && unit1.unit1_position < lastUnit && (
                        <Image
                          src={"/bg1_dimension_72in.svg"}
                          alt="Dimension Section"
                          width={250}
                          height={50}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            left: "0px",
                            top: "393px",
                            zIndex: "1",
                            opacity: "0.9",
                          }}
                        />
                      )}
                      {unit1.comps && showComps && (
                        <Image
                          src={"/bg1_dimension_36_226x48.svg"}
                          alt="Dimension Section"
                          width={125}
                          height={50}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            left: "0px",
                            top: "372px",
                            opacity: "0.9",
                          }}
                        />
                      )}

                      {/* the last dimension if the lineup1 has odd number of sections */}
                      {unit1.comps &&
                        showComps &&
                        unit1.comps &&
                        showComps &&
                        unit1.unit1_position % 2 !== 0 &&
                        unit1.unit1_position === lastUnit && (
                          <Image
                            src={"/bg1_dimension_36_226x48.svg"}
                            alt="Dimension Section"
                            width={125}
                            height={50}
                            priority
                            className={styles.unit1_row}
                            style={{
                              position: "absolute",
                              left: "0px",
                              top: "391px",
                              opacity: "0.9",
                            }}
                          />
                        )}

                      {/* Shipping split arrows */}
                      {/* show the double shipping split for odd positions only */}
                      {/* {unit1.comps &&
                        showComps &&
                        unit1.unit1_position % 2 !== 0 &&
                        unit1.unit1_position < lastUnit && (
                          <Image
                            src={"/bg1_shipping_split_72in.svg"}
                            alt="Dimension Section"
                            width={250}
                            height={50}
                            priority
                            className={styles.unit1_row}
                            style={{
                              position: "absolute",
                              left: "0px",
                              top: "413px",
                              zIndex: "1",
                              opacity: "0.9",
                            }}
                          />
                        )} */}
                      {/* the last shipping split if the lineup1 has odd number of sections */}
                      {/* {unit1.comps &&
                        showComps &&
                        unit1.comps &&
                        showComps &&
                        unit1.unit1_position % 2 !== 0 &&
                        unit1.unit1_position === lastUnit && (
                          <Image
                            src={"/bg1_shipping_split_36.svg"}
                            alt="Dimension Section"
                            width={125}
                            height={50}
                            priority
                            className={styles.unit1_row}
                            style={{
                              position: "absolute",
                              left: "0px",
                              top: "411px",
                              opacity: "0.9",
                            }}
                          />
                        )} */}
                      {/* Shipping split text */}
                      {/* show the double shipping split text for odd positions only */}
                      {unit1.comps && showComps && unit1.unit1_position % 2 !== 0 && unit1.unit1_position < lastUnit && (
                        <div
                          style={{
                            position: "absolute",
                            left: "85px",
                            top: "433px",
                            fontSize: "0.58rem",
                            opacity: "0.9",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Shipping split {unit1?.unit1_position > 2 ? Math.ceil(unit1?.unit1_position / 2) : "1"}
                        </div>
                      )}

                      {/* the last shipping split text if the lineup1 has odd number of sections */}
                      {unit1.comps &&
                        showComps &&
                        unit1.comps &&
                        showComps &&
                        unit1.unit1_position % 2 !== 0 &&
                        unit1.unit1_position === lastUnit && (
                          <div
                            style={{
                              position: "absolute",
                              left: "30px",
                              top: "433px",
                              fontSize: "0.58rem",
                              opacity: "0.9",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Shipping split {unit1?.unit1_position > 2 ? Math.ceil(unit1?.unit1_position / 2) : "1"}
                          </div>
                        )}
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>

        <div className="page-break" />

        {/* Bottom Elevation */}
        <div
          id="elevation"
          style={{
            position: "relative",
            left: "100px",
            top: "180px",
            height: "600px",
          }}
        >
          {(showBus = false)}
          {(showComps = true)}

          {/* Page Number and Title */}
          <section>
            <div
              style={{
                fontSize: "0.8rem",
                position: "relative",
              }}
            >
              Page: 3
            </div>

            <div
              style={{
                fontSize: "1rem",
                position: "relative",
              }}
            >
              BOTTOM ELEVATION
            </div>
            <br />
            <br />
          </section>

          <section>
            {lineup1.unit1 && (
              <div className={styles.lineup1_print}>
                <div>
                  <Image
                    src={base_topview_dimension}
                    alt="Base Topview Dimension"
                    width={33}
                    height={base_topview_height}
                    priority
                    className={styles.unit1_row}
                    style={{
                      position: "relative",
                      // right: "0",
                      top: "38px",
                      opacity: "0.7",
                    }}
                  />
                </div>
                {lineup1.unit1
                  .sort((a, b) => (a.unit1_position > b.unit1_position ? 1 : -1))
                  .map((unit1, index) => (
                    <div
                      className={styles.unit1_column_no_dash}
                      key={unit1.unit1_id}
                      style={{
                        width: "125px",
                        height: "380px",
                        position: "relative",
                      }}
                    >
                      <div
                        className={styles.unit1_row}
                        title={"Section ID: " + unit1.unit1_id}
                        style={{
                          fontSize: "0.8rem",
                          opacity: 0.7,
                          padding: "0rem 0 1rem 0 ",
                        }}
                      >
                        Section {index + 1}
                      </div>
                      <div>
                        {unit1.comps && showComps && (
                          <Image
                            src={base_topview}
                            alt="Base Topview"
                            width={125}
                            height={base_topview_height}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {/* bottom entry for the bottom breaker is cable 1 */}
                        {unit1.bus?.pack_is_cable1 && unit1.comps && showComps && (
                          <Image
                            src={bg1_base_main_cables}
                            alt="Base Topview Main Cables"
                            width={125}
                            height={base_topview_height}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {/* bottom entry for the top breaker (side cable) is cable 3 */}
                        {unit1.bus?.pack_is_cable3 && unit1.comps && showComps && (
                          <Image
                            src={bg1_base_side_cables}
                            alt="Base Topview Side Cables"
                            width={125}
                            height={base_topview_height}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>

        <div className="page-break" />

        {/* Single Line Diagram */}
        <div
          id="diagram"
          style={{
            position: "relative",
            left: "100px",
            top: "180px",
            height: "800px",
          }}
        >
          {(showBus = true)}
          {(showComps = false)}

          {/* Page Number and Title */}
          <section>
            <div
              style={{
                fontSize: "0.8rem",
                position: "relative",
              }}
            >
              Page: 3
            </div>

            <div
              style={{
                fontSize: "1rem",
                position: "relative",
              }}
            >
              SINGLE-LINE DIAGRAM
            </div>
            <br />
            <br />
          </section>

          {/* lineup1 map */}
          <section>
            {lineup1.unit1 && (
              <div className={styles.lineup1_print}>
                {lineup1.unit1
                  .sort((a, b) => (a.unit1_position > b.unit1_position ? 1 : -1))
                  .map((unit1, index) => (
                    <div
                      className={styles.unit1_column}
                      key={unit1.unit1_id}
                      style={{
                        width: "125px",
                        // height: "330px",
                        height: "380px",
                        position: "relative",

                        // border: "1px solid black",
                      }}
                    >
                      <div
                        className={styles.unit1_row}
                        title={"Section ID: " + unit1.unit1_id}
                        style={{
                          fontSize: "0.8rem",
                          opacity: 0.7,
                          padding: "0rem 0 1rem 0 ",
                        }}
                      >
                        Section {index + 1}
                      </div>
                      <div>
                        {unit1.bus && showBus && (
                          <Image
                            src={unit1.bus.pack_image_url}
                            alt="Bus Bars"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.ct1 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct1.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "309px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct1?.pack_ratio}
                            </div>
                          </>
                        )}

                        {unit1.ct2 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct2.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "298px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct2?.pack_ratio}
                            </div>
                          </>
                        )}

                        {unit1.ct3 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct3.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "298px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct3?.pack_ratio}
                            </div>
                          </>
                        )}
                        {unit1.ct4 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct4.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "243px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct4?.pack_ratio}
                            </div>
                          </>
                        )}
                        {unit1.ct5 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct5.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "243px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct5?.pack_ratio}
                            </div>
                          </>
                        )}
                        {unit1.ct6 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct6.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "233px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct6?.pack_ratio}
                            </div>
                          </>
                        )}
                        {unit1.ct7 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct7.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "156px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct7?.pack_ratio}
                            </div>
                          </>
                        )}
                        {unit1.ct8 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct8.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "146px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct8?.pack_ratio}
                            </div>
                          </>
                        )}
                        {unit1.ct9 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct9.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "146px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct9?.pack_ratio}
                            </div>
                          </>
                        )}
                        {unit1.ct10 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct10.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "87px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct10?.pack_ratio}
                            </div>
                          </>
                        )}
                        {unit1.ct11 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct11.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "87px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct11?.pack_ratio}
                            </div>
                          </>
                        )}
                        {unit1.ct12 && showBus && (
                          <>
                            <Image
                              src={api_root + "/images/onelines/bg15/ct12.svg"}
                              alt="Current Transformer"
                              width={125}
                              height={330}
                              priority
                              className={styles.unit1_row}
                              style={{ position: "absolute", right: "0" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: "75px",
                                top: "76px",
                                fontSize: fontSizeTransformersRatio,
                              }}
                            >
                              {unit1?.ct12?.pack_ratio}
                            </div>
                          </>
                        )}

                        {unit1.ptfuse1 && showBus && (
                          <Image
                            src={"/bg1_vt1_fuse.svg"}
                            alt="Voltage Transformer"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.ptfuse2 && showBus && (
                          <Image
                            src={"/bg1_vt2_fuse.svg"}
                            alt="Voltage Transformer"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.ptfuse3 && showBus && (
                          <Image
                            src={"/bg1_vt3_fuse.svg"}
                            alt="Voltage Transformer"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.ptfuse4 && showBus && (
                          <Image
                            src={"/bg1_vt4_fuse.svg"}
                            alt="Voltage Transformer"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}

                        {unit1.brk1 && showBus && (
                          <Image
                            src={"/bg1_cb1.svg"}
                            alt="Circuit Breaker"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.brk2 && showBus && (
                          <Image
                            src={"/bg1_cb2.svg"}
                            alt="Circuit Breaker"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.brk1_designation && showBus && (
                          <Image
                            src={"/bg1_" + unit1.brk1_designation + "_1.svg"}
                            alt="Circuit Breaker"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.brk2_designation && showBus && (
                          <Image
                            src={"/bg1_" + unit1.brk2_designation + "_2.svg"}
                            alt="Circuit Breaker"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.ctrl1 && showBus && (
                          <Image
                            src={"/bg1_ctrl_" + unit1.ctrl1?.pack_name + "_1.svg"}
                            alt="Controls Lower Breaker"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.ctrl2 && showBus && (
                          <Image
                            src={"/bg1_ctrl_" + unit1.ctrl2?.pack_name + "_2.svg"}
                            alt="Controls Upper Breaker"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}

                        {unit1.gct1 && showBus && (
                          <div
                            style={{
                              position: "absolute",
                              left: "70px",
                              top: "357px",
                              fontSize: fontSizeTransformersRatio,
                            }}
                          >
                            {unit1?.gct1?.pack_ratio}
                          </div>
                        )}

                        {unit1.gct1 && showBus && (
                          <Image
                            src={"/bg1_gct1.svg"}
                            alt="Ground Current Transformer"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}

                        {unit1.gct2 && showBus && (
                          <div
                            style={{
                              position: "absolute",
                              left: "68px",
                              top: "48px",
                              fontSize: fontSizeTransformersRatio,
                            }}
                          >
                            {unit1?.gct2?.pack_ratio}
                          </div>
                        )}

                        {unit1.gct2 && showBus && (
                          <Image
                            src={"/bg1_gct2.svg"}
                            alt="Ground Current Transformer"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.sa1 && showBus && (
                          <Image
                            src={"/bg1_sa1.svg"}
                            alt="Surge Arrester Upper Location"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                        {unit1.sa2 && showBus && (
                          <Image
                            src={"/bg1_sa2.svg"}
                            alt="Surge Arreser Bottom Location"
                            width={125} // this should match with column width
                            height={330}
                            priority
                            className={styles.unit1_row}
                            style={{ position: "absolute", right: "0" }}
                          />
                        )}
                      </div>
                      {unit1.comps && showComps && (
                        <Image
                          src={"/dimension_1_section.svg"}
                          alt="Dimension Section"
                          width={125}
                          height={50}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "relative",
                            right: "0",
                            top: "330px",
                            opacity: "0.7",
                          }}
                        />
                      )}

                      {unit1.cpt1 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "65px",
                            top: "304px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.cpt1?.pack_ratio}
                        </div>
                      )}

                      {unit1.cpt1 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "65px",
                            top: "314px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.cpt1?.pack_kva ? unit1?.cpt1?.pack_kva + "kVA" : ""}
                        </div>
                      )}

                      {unit1.cpt1 && unit1.cpt1_connection !== 4 && unit1.cpt1_connection !== 5 && showBus && (
                        <Image
                          src={"/bg1_cpt1" + unit1.cpt1_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={125} // this should match with column width
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.cpt1 && unit1.cpt1_connection === 4 && showBus && (
                        <Image
                          src={"/bg1_cpt1" + unit1.cpt1_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={254} // this should match with column width
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-64px",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.cpt1 && unit1.cpt1_connection === 5 && showBus && (
                        <Image
                          src={"/bg1_cpt1" + unit1.cpt1_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={254}
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-65px",
                            zIndex: "1000",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.cptfuse1 && (
                        <Image
                          src={"/bg1_cpt1_fuse.svg"}
                          alt="Current Power Transformer"
                          width={254}
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-65px",
                            zIndex: "1000",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.cpt2 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "65px",
                            top: "101px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.cpt2?.pack_ratio}
                        </div>
                      )}

                      {unit1.cpt2 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "65px",
                            top: "111px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.cpt2?.pack_kva ? unit1.cpt2.pack_kva + "kVA" : ""}
                        </div>
                      )}

                      {unit1.cpt2 && unit1.cpt2_connection !== 4 && unit1.cpt2_connection !== 5 && showBus && (
                        <Image
                          src={"/bg1_cpt2" + unit1.cpt2_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={125} // this should match with column width
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.cpt2 && unit1.cpt2_connection === 4 && showBus && (
                        <Image
                          src={"/bg1_cpt2" + unit1.cpt2_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={254} // this should match with column width
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-64px",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.cpt2 && unit1.cpt2_connection === 5 && showBus && (
                        <Image
                          src={"/bg1_cpt2" + unit1.cpt2_connection + ".svg"}
                          alt="Current Power Transformer"
                          width={254} // this should match with column width
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-65px",
                            zIndex: "1000",
                            top: "38px",
                          }}
                        />
                      )}
                      {unit1.cptfuse2 && (
                        <Image
                          src={"/bg1_cpt2_fuse.svg"}
                          alt="Current Power Transformer"
                          width={254}
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-65px",
                            zIndex: "1000",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.cpt3 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "70px",
                            top: "303px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.cpt3?.pack_ratio}
                        </div>
                      )}

                      {unit1.cpt3 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "70px",
                            top: "313px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.cpt3?.pack_kva ? unit1?.cpt3?.pack_kva + "kVA" : ""}
                        </div>
                      )}

                      {unit1.cpt3 && showBus && (
                        <Image
                          src={"/bg1_cpt31.svg"}
                          alt="Current Power Transformer"
                          width={125} // this should match with column width
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.cptfuse3 && (
                        <Image
                          src={"/bg1_cpt3_fuse.svg"}
                          alt="Current Power Transformer"
                          width={254}
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-65px",
                            zIndex: "1000",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.pt1 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "66px",
                            top: "331px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.pt1?.pack_ratio}
                        </div>
                      )}

                      {unit1.pt1 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "66px",
                            top: "341px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1.pt1.pack_secondary_voltage ? unit1.pt1.pack_secondary_voltage + "VAC" : ""}
                        </div>
                      )}

                      {unit1.pt1 && unit1.pt1_con !== 4 && unit1.pt1_con !== 5 && showBus && (
                        <Image
                          src={"/bg1_pt1" + unit1.pt1_con + ".svg"}
                          alt="Voltage Transformer1"
                          width={125}
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "38px",
                          }}
                        />
                      )}
                      {unit1.pt1 && unit1.pt1_con === 4 && showBus && (
                        <Image
                          src={"/bg1_pt14.svg"}
                          alt="Voltage Transformer2"
                          width={254} // double witdth awith offest
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-65px",
                            top: "38px",
                          }}
                        />
                      )}
                      {unit1.pt1 && unit1.pt1_con === 5 && showBus && (
                        <Image
                          src={"/bg1_pt15.svg"}
                          alt="Voltage Transformer3"
                          width={254} // double witdth awith offest
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-65px",
                            zIndex: "1000",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.pt2 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "66px",
                            top: "274px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.pt2?.pack_ratio}
                        </div>
                      )}

                      {unit1.pt2 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "66px",
                            top: "284px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1.pt2.pack_secondary_voltage ? unit1.pt2.pack_secondary_voltage + "VAC" : ""}
                        </div>
                      )}

                      {unit1.pt2 && unit1.pt2_con && showBus && (
                        <Image
                          src={"/bg1_pt2" + unit1.pt2_con + ".svg"}
                          alt="Voltage Transformer"
                          width={125}
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.pt3 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "66px",
                            top: "138px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.pt3?.pack_ratio}
                        </div>
                      )}
                      {unit1.pt3 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "66px",
                            top: "148px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1.pt3.pack_secondary_voltage ? unit1.pt3.pack_secondary_voltage + "VAC" : ""}
                        </div>
                      )}

                      {unit1.pt3 && unit1.pt3_con && showBus && (
                        <Image
                          src={"/bg1_pt3" + unit1.pt3_con + ".svg"}
                          alt="Voltage Transformer"
                          width={125}
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "38px",
                          }}
                        />
                      )}

                      {unit1.pt4 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "66px",
                            top: "87px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1?.pt4?.pack_ratio}
                        </div>
                      )}
                      {unit1.pt4 && (
                        <div
                          style={{
                            position: "absolute",
                            left: "66px",
                            top: "97px",
                            fontSize: fontSizeTransformersRatio,
                          }}
                        >
                          {unit1.pt4.pack_secondary_voltage ? unit1.pt4.pack_secondary_voltage + "VAC" : ""}
                        </div>
                      )}

                      {unit1.pt4 && unit1.pt4_con !== 4 && unit1.pt4_con !== 5 && showBus && (
                        <Image
                          src={"/bg1_pt4" + unit1.pt4_con + ".svg"}
                          alt="Voltage Transformer"
                          width={125}
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "38px",
                          }}
                        />
                      )}
                      {unit1.pt4 && unit1.pt4_con === 4 && showBus && (
                        <Image
                          src={"/bg1_pt44.svg"}
                          alt="Voltage Transformer"
                          width={254} // double witdth awith offest
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-65px",
                            top: "38px",
                          }}
                        />
                      )}
                      {unit1.pt4 && unit1.pt4_con === 5 && showBus && (
                        <Image
                          src={"/bg1_pt45.svg"}
                          alt="Voltage Transformer"
                          width={254} // double witdth awith offest
                          height={330}
                          priority
                          className={styles.unit1_row}
                          style={{
                            position: "absolute",
                            right: "-65px",
                            zIndex: "1000",
                            top: "38px",
                          }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }
}
