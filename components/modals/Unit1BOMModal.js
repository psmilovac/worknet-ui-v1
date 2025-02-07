import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "./Unit1BOMModal.module.css";
import Image from "next/image";
import Button from "../ui/buttons/Button";
import ButtonCancel from "../ui/buttons/ButtonCancel";
import Link from "next/link";
import { api_root, unit1_optional_features } from "@/global/global_vars";
import { unit1_optional_features_obj } from "@/global/global_vars";
import { unit1_features_essential } from "@/global/global_vars";

const Unit1BOM = ({
  onClose,
  children,
  unit1,
  lineup1,
  flatBom,
  pack_table,
}) => {
  const title = "Unit1 BOM";
  const width_frontview = 117;
  const height_frontview = 309.375;
  const width_sideview = 300;
  const height_sideview = height_frontview;
  const api_image_root_folder =
    api_root + "/images/onelines/bg15/";

  console.log("unit1", unit1);
  // const flatBomUnit1 = flatBom.filter(
  //   (b) => b.unit1_position == unit1.unit1_position
  // );
  // console.log("flatBomUnit1", flatBomUnit1);
  // console.log("pack_table", pack_table);
  // console.log("unit1_optional_features", unit1_optional_features);
  // console.log("unit1_features_essential", unit1_features_essential);

  let keys = [];
  for (let key in unit1) {
    let value = unit1[key];
    if (value) {
      for (let item of unit1_optional_features) {
        if (item === key) {
          keys.push(key);
        }
      }
    }
  }

  // console.log("keys", keys);
  // console.log("unit1.bus", unit1.bus);

  //~~~~~~~~~~~~~~~~~~~ MODAL ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // create ref for the styled container component
  const modalContainerRef = React.useRef();

  // check if the user has clicked inside or outside the modal
  // useCallback is used to store the function reference, so that on modal closure, the correct callback can be cleaned in window.removeEventListener
  const backdropHandler = useCallback((e) => {
    if (!modalContainerRef?.current?.contains(e.target)) {
      onClose();
    }
  }, []);

  useEffect(() => {
    // We wrap it inside setTimeout in order to prevent the eventListener to be attached before the modal is open.
    setTimeout(() => {
      window.addEventListener("click", backdropHandler);
    });
  }, []);

  useEffect(() => {
    // remove the event listener when the modal is closed
    return () => window.removeEventListener("click", backdropHandler);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  // on Cancel Button
  const onCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  //~~~~~~~~~~~~~~~~~~~ MODAL END ~~~~~~~~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~ DROPDOWN MENU - CLEAR HANDLER   ~~~~~~~~~~~~~~~~~~~~~~~~~~

  return ReactDOM.createPortal(
    <div className={styles.backdrop}>
      <div className={styles.container} ref={modalContainerRef}>
        {/* ---------HEADER--------- */}
        <div
          href="#"
          onClick={handleCloseClick}
          style={{ fontSize: "1.5rem", textAlign: "right", cursor: "pointer" }}
        >
          x
        </div>
        <div style={{ fontSize: "0.85rem", opacity: "0.8" }}>
          {lineup1.lineup1_name}
        </div>
        {/* ---------TITLE--------- */}
        {
          <h2>
            Section {unit1.unit1_position} -{" "}
            {unit1.bus?.pack_name +
              unit1.comps?.pack_name +
              unit1.metal1?.pack_name}
          </h2>
        }
        {/* <h3>{unit1.bus.pack_name + unit1.comps.pack_name}</h3> */}
        <br />
        <div style={{ display: "flex", gap: "2rem" }}>
          <div
            style={{
              // backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              border: "none",
              width: String(width_frontview) + "px",
              height: "auto",
            }}
          >
            {/* Front view */}
            <div
              style={{
                width: String(width_frontview) + "px",
                height: String(height_frontview) + "px",
                position: "relative",
              }}
            >
              <Image
                alt="Front Busbar Image"
                src={
                  unit1.bus?.pack_image_url
                    ? unit1.bus.pack_image_url
                    : api_image_root_folder + "bg1_xxxx_sideview.svg"
                }
                width={width_frontview}
                height={height_frontview}
                style={{ position: "absolute", left: "0" }}
              />
              <Image
                alt="Front Compartment Image"
                src={
                  unit1.comps?.pack_image_url
                    ? unit1.comps.pack_image_url
                    : api_image_root_folder + "bg1_xxxx_sideview.svg"
                }
                width={width_frontview}
                height={height_frontview}
                style={{ position: "absolute", left: "0" }}
              />
            </div>
          </div>

          {/* Side View */}
          <div
            style={{
              // backgroundColor: "pink",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              border: "none",
            }}
          >
            <div
              // className={styles.unit_row}
              style={{
                width: String(width_sideview) + "px",
                height: String(height_sideview) + "px",
                position: "relative",
              }}
            >
              <Image
                alt="Sideview Busbar Image"
                src={
                  unit1.bus?.pack_image2_url
                    ? unit1.bus.pack_image2_url
                    : api_image_root_folder + "bg1_xxxx_sideview.svg"
                }
                width={width_sideview}
                height={height_sideview}
                style={{
                  position: "absolute",
                  left: "0",
                }}
              />
              <Image
                alt="Sideview Compartment Image"
                src={
                  unit1.comps?.pack_image2_url
                    ? unit1.comps.pack_image2_url
                    : api_image_root_folder + "bg1_xxxx_sideview.svg"
                }
                width={width_sideview}
                height={height_sideview}
                style={{ position: "absolute", left: "0" }}
              />
              <Image
                alt="Sideview Compartment Image"
                src={
                  unit1.metal1?.pack_image_url
                    ? unit1.metal1.pack_image_url
                    : api_image_root_folder + "bg1_metal_k_sideview.svg"
                }
                width={width_sideview}
                height={height_sideview}
                style={{ position: "absolute", left: "0" }}
              />
              {unit1?.brk1 && (
                <Image
                  alt="Sideview Bottom Breaker Image"
                  src={
                    unit1.brk1?.pack_image2_url
                      ? unit1.brk1.pack_image2_url
                      : api_image_root_folder + "bg1_brk1_sideview.svg"
                  }
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}
              {unit1?.brk2 && (
                <Image
                  alt="Sideview Upper Breaker Image"
                  src={
                    unit1.brk2?.pack_image2_url
                      ? unit1.brk2.pack_image2_url
                      : api_image_root_folder + "bg1_brk2_sideview.svg"
                  }
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}
              {unit1.cpt1 && (
                <Image
                  alt="CPT bottom side view"
                  src={"/bg1_cpt1_side.svg"}
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}
              {unit1.cpt2 && (
                <Image
                  alt="CPT top side view"
                  src={"/bg1_cpt2_side.svg"}
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}

              {/* edge case for the Tie section */}
              {unit1.cpt1_connection === 3 &&
                unit1.bus.pack_is_cable3 == null && // cables are not top feed
                unit1.bus.pack_is_cable4 == null && (
                  <Image
                    alt="CPT top cable connection side view"
                    src={"/bg1_cpt1_side_connection_3_tiebus.svg"}
                    width={width_sideview}
                    height={height_sideview}
                    style={{ position: "absolute", left: "0" }}
                  />
                )}
              
              {/* edge case for the extended cable connection */}
              {/* {unit1.cpt1_connection === 3 && unit1.bus.pack_is_cable3 > 0 && (
                // top cable bottom feed
                <Image
                  alt="CPT top cable connection side view"
                  // src={"/bg1_cpt1_side_connection_3_extended.svg"}
                  src={"/bg1_cpt1_side_connection_8.svg"}
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )} */}

              {/* concatinate the name for the cpt connection */}
              {/* {unit1.cpt1_connection === 3 && unit1.bus.pack_is_cable4 > 0 && (
                // top cable top feed
                <Image
                  alt="CPT top cable connection side view"
                  src={
                    "/bg1_cpt1_side_connection_" +
                    unit1.cpt1_connection +
                    ".svg"
                  }
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )} */}

              {/* {unit1.cpt1_connection != 3 && unit1.cpt1_connection > 0 && (
                // all other connections
                <Image
                  alt="CPT top cable connection side view"
                  src={
                    "/bg1_cpt1_side_connection_" +
                    unit1.cpt1_connection +
                    ".svg"
                  }
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )} */}

              {/* {unit1.cpt1_connection === 7 && (
                // all other connections
                <Image
                  alt="CPT top cable connection side view"
                  src={
                    "/bg1_cpt1_side_connection_" +
                    unit1.cpt1_connection +
                    ".svg"
                  }
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}
               */}
              {unit1.cpt1_connection && (
                // all other connections
                <Image
                  alt="CPT top cable connection side view"
                  src={
                    "/bg1_cpt1_side_connection_" +
                    unit1.cpt1_connection +
                    ".svg"
                  }
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}


              {/* edge case for the Tie section */}

              {/* This needs work on. Create side_connection_9 and add it. */}
              {/* {unit1.cpt2_connection === 3 &&
                unit1.bus.pack_is_cable2 == null &&
                unit1.bus.pack_is_cable1 == null && (
                  <Image
                    alt="CPT top cable connection side view"
                    src={"/bg1_cpt2_side_connection_3_tiebus.svg"}
                    width={width_sideview}
                    height={height_sideview}
                    style={{ position: "absolute", left: "0" }}
                  />
                )} */}

              {/* edge case for the extended cable connection */}
              {/* Okay to remove */}
              {/* {unit1.cpt2_connection === 3 && unit1.bus.pack_is_cable2 > 0 && (
                <Image
                  alt="CPT top cable connection side view"
                  src={"/bg1_cpt2_side_connection_3_extended.svg"}
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )} */}

              {/* Okay to remove */}
              {/* {unit1.cpt2_connection === 3 && unit1.bus.pack_is_cable1 > 0 && (
                <Image
                  alt="CPT top cable connection side view"
                  src={
                    "/bg1_cpt2_side_connection_" +
                    unit1.cpt2_connection +
                    ".svg"
                  }
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )} */}
              {/* OK to remove */}
              {/* {unit1.cpt2_connection === 3 && (
                <Image
                  alt="CPT top cable connection side view"
                  src={
                    "/bg1_cpt2_side_connection_" +
                    unit1.cpt2_connection +
                    ".svg"
                  }
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}
              {unit1.cpt2_connection != 3 && unit1.cpt2_connection > 0 && (
                <Image
                  alt="CPT top cable connection side view"
                  src={
                    "/bg1_cpt2_side_connection_" +
                    unit1.cpt2_connection +
                    ".svg"
                  }
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )} */}

              {unit1.cpt2_connection && (
                <Image
                  alt="CPT connection side view"
                  src={
                    "/bg1_cpt2_side_connection_" +
                    unit1.cpt2_connection +
                    ".svg"
                  }
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}

              {unit1.pt1 && (
                <Image
                  alt="CPT top side view"
                  src={"/bg1_pt1_sideview.svg"}
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}
              {unit1.pt2 && (
                <Image
                  alt="CPT top side view"
                  src={"/bg1_pt2_sideview.svg"}
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}
              {unit1.pt3 && (
                <Image
                  alt="CPT top side view"
                  src={"/bg1_pt3_sideview.svg"}
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}
              {unit1.pt4 && (
                <Image
                  alt="CPT top side view"
                  src={"/bg1_pt4_sideview.svg"}
                  width={width_sideview}
                  height={height_sideview}
                  style={{ position: "absolute", left: "0" }}
                />
              )}
            </div>
          </div>
        </div>

        {/* ---------CONTENT--------- */}
        <div className={styles.content} style={{ fontSize: "0.8rem" }}>
          <h3
            style={{
              borderBottom: "1px solid",
              paddingBottom: "0.5rem",
              margin: "1rem auto",
            }}
          >
            Bus Bar Kit - {unit1.bus?.pack_name}
          </h3>
          {unit1.bus && (
            <ul>
              <li>ID: {unit1.bus.pack_id} </li>
              <li>Part Number: 200V-12345</li>
              <li>Name: {unit1.bus.pack_name}</li>
              <li>Description: {unit1.bus.pack_description}</li>
            </ul>
          )}
          {unit1.bus && <br />}

          {unit1.bus && (
            <table>
              <thead>
                <tr>
                  <th style={{ width: "7rem", textAlign: "left" }}>Item #</th>
                  <th style={{ width: "21rem", textAlign: "left" }}>
                    Description
                  </th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {unit1.bus.item_pack.map((item_pack) => (
                  <tr key={item_pack.item_id}>
                    <td>{item_pack.item_id}</td>
                    <td>{item_pack.item.item_description}</td>
                    <td>{item_pack.item_pack_quantity}</td>
                  </tr>
                ))}
              </tbody>
              <br />
            </table>
          )}
          <h3
            style={{
              borderBottom: "1px solid",
              paddingBottom: "0.5rem",
              margin: "1rem auto",
            }}
          >
            Front Compartment Kit - {unit1.comps?.pack_name}
          </h3>
          {unit1.comps && (
            <ul>
              <li>ID: {unit1.comps.pack_id} </li>
              <li>Part Number: 200V-12345</li>
              <li>Name: {unit1.comps.pack_name}</li>
              <li>Description: {unit1.comps.pack_description}</li>
            </ul>
          )}
          {unit1.comps && <br />}
          {unit1.comps && (
            <table>
              <thead>
                <tr style={{ textAlign: "left", verticalAlign: "top" }}>
                  <th style={{ width: "7rem" }}>Item #</th>
                  <th style={{ width: "21rem" }}>Description</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {unit1.comps.item_pack.map((item_pack) => (
                  <tr
                    key={item_pack.item_id}
                    style={{ textAlign: "left", verticalAlign: "top" }}
                  >
                    <td>{item_pack.item_id}</td>
                    <td>{item_pack.item.item_description}</td>
                    <td>{item_pack.item_pack_quantity}</td>
                  </tr>
                ))}
              </tbody>
              <br />
            </table>
          )}
          <h3
            style={{
              borderBottom: "1px solid",
              paddingBottom: "0.5rem",
              margin: "1rem auto",
            }}
          >
            Rear Compartment Kit - {unit1.metal1?.pack_name}
          </h3>
          {unit1.metal1 && (
            <ul>
              <li>ID: {unit1.metal1.pack_id} </li>
              <li>Part Number: 200V-12345</li>
              <li>Name: {unit1.metal1.pack_name}</li>
              <li>Description: {unit1.metal1.pack_description}</li>
            </ul>
          )}
          {unit1.metal1 && <br />}
          {unit1.metal1 && (
            <table>
              <thead>
                <tr style={{ textAlign: "left", verticalAlign: "top" }}>
                  <th style={{ width: "7rem" }}>Item #</th>
                  <th style={{ width: "21rem" }}>Description</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {unit1.metal1.item_pack.map((item_pack) => (
                  <tr
                    key={item_pack.item_id}
                    style={{ textAlign: "left", verticalAlign: "top" }}
                  >
                    <td>{item_pack.item_id}</td>
                    <td>{item_pack.item.item_description}</td>
                    <td>{item_pack.item_pack_quantity}</td>
                  </tr>
                ))}
              </tbody>
              <br />
            </table>
          )}

          {unit1.ctrl2 && (
            <h3
              style={{
                borderBottom: "1px solid",
                paddingBottom: "0.5rem",
                margin: "1rem auto",
              }}
            >
              Control Package for Upper Breaker - {unit1.ctrl2?.pack_name}
            </h3>
          )}
          {unit1.ctrl2 && (
            <ul>
              <li>ID: {unit1.ctrl2.pack_id} </li>
              <li>Part Number: 200V-12345</li>
              <li>Name: {unit1.ctrl2.pack_name}</li>
              <li>Description: {unit1.ctrl2.pack_description}</li>
            </ul>
          )}
          {unit1.ctrl2 && <br />}
          {unit1.ctrl2 && (
            <table>
              <thead>
                <tr style={{ textAlign: "left", verticalAlign: "top" }}>
                  <th style={{ width: "7rem" }}>Item #</th>
                  <th style={{ width: "21rem" }}>Description</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {unit1.ctrl2.item_pack.map((item_pack) => (
                  <tr
                    key={item_pack.item_id}
                    style={{ textAlign: "left", verticalAlign: "top" }}
                  >
                    <td>{item_pack.item_id}</td>
                    <td>{item_pack.item.item_description}</td>
                    <td>{item_pack.item_pack_quantity}</td>
                  </tr>
                ))}
              </tbody>
              <br />
            </table>
          )}

          {unit1.ctrl1 && (
            <h3
              style={{
                borderBottom: "1px solid",
                paddingBottom: "0.5rem",
                margin: "1rem auto",
              }}
            >
              Control Package for Lower Breaker - {unit1.ctrl1?.pack_name}
            </h3>
          )}
          {unit1.ctrl1 && (
            <ul>
              <li>ID: {unit1.ctrl1?.pack_id} </li>
              <li>Part Number: 200V-12345</li>
              <li>Name: {unit1.ctrl1?.pack_name}</li>
              <li>Description: {unit1.ctrl1?.pack_description}</li>
            </ul>
          )}
          {unit1.ctrl1 && <br />}
          {unit1.ctrl1 && (
            <table>
              <thead>
                <tr style={{ textAlign: "left", verticalAlign: "top" }}>
                  <th style={{ width: "7rem" }}>Item #</th>
                  <th style={{ width: "21rem" }}>Description</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {unit1.ctrl1.item_pack.map((item_pack) => (
                  <tr
                    key={item_pack.item_id}
                    style={{ textAlign: "left", verticalAlign: "top" }}
                  >
                    <td>{item_pack.item_id}</td>
                    <td>{item_pack.item.item_description}</td>
                    <td>{item_pack.item_pack_quantity}</td>
                  </tr>
                ))}
              </tbody>
              <br />
            </table>
          )}
          {keys && <br />}
          {keys && (
            <h3
              style={{
                borderBottom: "1px solid",
                paddingBottom: "0.5rem",
                margin: "1rem auto",
              }}
            >
              Components
            </h3>
          )}

          {keys?.map((k) => (
            <ul key={k}>
              <li>
                <h4>{unit1_optional_features_obj[k]}</h4>
                <ul>
                  <li>ID: {unit1[k].pack_id}</li>
                  <li>Description: {unit1[k].pack_name}</li>
                </ul>
                <table>
                  <thead>
                    <tr style={{ textAlign: "left", verticalAlign: "top" }}>
                      <th style={{ width: "7rem" }}>Item #</th>
                      <th style={{ width: "21rem" }}>Description</th>
                      <th>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unit1[k].item_pack?.map((x) => (
                      <tr
                        key={x}
                        style={{ textAlign: "left", verticalAlign: "top" }}
                      >
                        <td>{x.item_id}</td>
                        <td>{x.item.item_description}</td>
                        <td>{x.item_pack_quantity}</td>
                        {/* <td>{key.item.item_description}</td>
                    <td>{key.item_pack_quantity}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <br />
                <br />
              </li>
            </ul>
          ))}

          <br />
          <br />
          <br />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Unit1BOM;
