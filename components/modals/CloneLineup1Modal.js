import React, { useCallback, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "./ActionLineup1Modal.module.css";
import Button from "../ui/buttons/Button";
import ButtonDelete from "../ui/buttons/ButtonDelete";
import ButtonCancel from "../ui/buttons/ButtonCancel";
import axios from "axios";
import { useRouter } from "next/router";

const CloneLineup1Modal = ({
  onClose,
  children,
  name,
  title,
  user_id,
  oldLineup1,
  accessToken,
  new_lineup1_api,
  unit1_per_lineup1_api,
  unit1_multi_new_api,
}) => {
  const [lineup1Name, setLineup1Name] = useState(
    oldLineup1.lineup1_name + " (Copy)"
  ); // set default value
  const [lineup1BO, setLineup1BO] = useState(oldLineup1.lineup1_bo); // set default value
  const old_lineup1_id = oldLineup1.lineup1_id;

  const router = useRouter();

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

  // CREATE, create new unit1
  const newLineup1 = async (reqBody) => {
    const url = new_lineup1_api;
    const data = reqBody;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(url, data, config);
      return res.data; // async/await made in a separate function
    } catch (error) {
      console.log(error);
    }
  };

  const getUnit1PerLineup1 = async (lineup1_id) => {
    const url = unit1_per_lineup1_api + lineup1_id;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.get(url, config);
      return res.data;
      // .then(() => toLineup1IdPage(lineup1)); // go to the lineup1_id page
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE Multi Unit1, create new unit1
  const newMultiUnit1 = async (reqBody) => {
    const url = unit1_multi_new_api;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(url, reqBody, config);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // on Clone Button
  const onClone = async (e) => {
    e.preventDefault();
    const reqBody = {
      lineup1_name: lineup1Name != null ? lineup1Name : null,
      lineup1_bo: lineup1BO != null ? lineup1BO : null,
      lineup1_current: oldLineup1.lineup1_current,
      lineup1_kiac: oldLineup1.lineup1_kiac,
      lineup1_voltage: oldLineup1.lineup1_voltage,
      lineup1_enclosure: oldLineup1.lineup1_enclosure,
      lineup1_note: oldLineup1.lineup1_note,
      lineup1_amount: oldLineup1.lineup1_amount,
      user_id: user_id,
    };

    // create new lineup1
    const new_lineup1 = await newLineup1(reqBody);

    // get all the units that will be copied
    const unit1s = await getUnit1PerLineup1(old_lineup1_id);

    // replace the old lineup1_id with the new ID
    unit1s.forEach((unit1) => {
      unit1.lineup1_id = Number(new_lineup1.lineup1_id); // insert new ID
      delete unit1.unit1_id; //drop unit1_id, we'll get the new ones
    });

    // post new units
    await newMultiUnit1(unit1s);

    // push to the unit1 page
    router.push({
      pathname: "/product/bg15/lineups/" + new_lineup1.lineup1_id,
    });

    onClose();
  };


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
        {/* ---------TITLE--------- */}
        <div>
          {/* <h1>Edit</h1> */}
          {/* {lineup1_name ? lineup1_name : "nothing"} */}
        </div>
        {/* <h3>Edit: {lineup1_name}</h3> */}
        <h1>Copy the Lineup</h1>
        <div style={{ opacity: 0.9, fontSize: "0.9rem" }}>
          Enter the new Lineup name and the Business Opportuinty (BO) number.
        </div>
        {/* ---------CONTENT---------
        <div className={styles.content}>{children}</div>
        {/* <br /> */}
        <div className={styles.input_text}>
          <div>
            <div style={{ margin: "1rem 0 0 0", fontSize: "0.9rem" }}>
              New Lineup Name:
            </div>
            <input
              id="lineup1_name"
              type="text"
              value={lineup1Name}
              onChange={(e) => setLineup1Name(e.target.value)}
              required
              autoFocus
            ></input>
            <br />
            <div style={{ margin: "1rem 0 0 0", fontSize: "0.9rem" }}>
              New BO:
            </div>
            <input
              id="lineup1_bo"
              type="text"
              value={lineup1BO}
              onChange={(e) => setLineup1BO(e.target.value)}

              // required
              // autoFocus
            ></input>
          </div>
        </div>
        <div style={{ margin: "1rem 0 2rem 0 " }}>
          <span style={{ margin: "0 1rem  0 0 " }}>
            <Button type="submit" onClick={onClone}>
              Copy Lineup
            </Button>
          </span>
          <ButtonCancel type="submit" onClick={onCancel}>
            Cancel
          </ButtonCancel>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CloneLineup1Modal;
