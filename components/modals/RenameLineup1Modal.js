import React, { useCallback, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "./ActionLineup1Modal.module.css";
import Button from "../ui/buttons/Button";
import ButtonDelete from "../ui/buttons/ButtonDelete";
import ButtonCancel from "../ui/buttons/ButtonCancel";

const RenameLineup1Modal = ({
  onClose,
  children,
  name,
  title,
  lineup1_name,
  lineup1_id,
  lineup1_bo,
  setRenameLineup1ModalState,
}) => {
  const [lineup1Name, setLineup1Name] = useState(lineup1_name); // set default value
  const [lineup1BO, setLineup1BO] = useState(lineup1_bo); // set default value

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
    setRenameLineup1ModalState(null);
    onClose();
  };

  // on Rename Button
  const onRename = (e) => {
    e.preventDefault();
    setRenameLineup1ModalState({
      lineup1_id: lineup1_id > 0 ? lineup1_id : null,
      lineup1_name: lineup1Name != null ? lineup1Name : null,
      lineup1_bo: lineup1BO != null ? lineup1BO : null,
    });
    onClose();
  };

  // setRenameLineup1ModalState
  //~~~~~~~~~~~~~~~~~~~ MODAL END ~~~~~~~~~~~~~~~~~~~~~~~~~~

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
        <h1>Edit Lineup</h1>
        <div style={{ opacity: 1, fontSize: "0.9rem", margin: "0.2rem 0 0 0" }}>
          Rename the lineup and Business Opportuinty (BO) number.
        </div>
        <div style={{ opacity: 0.7, fontSize: "0.8rem", margin: "0.2rem 0 0 0" }}>
        {lineup1_name}, Lineup ID: {lineup1_id}
        </div>
        {/* ---------CONTENT---------
        <div className={styles.content}>{children}</div>
        {/* <br /> */}
        <div className={styles.input_text}>
          <div>
            <div style={{ margin: "1rem 0 0 0", fontSize: "0.9rem"  }}>New Name:</div>
            <input
              id="lineup1_name"
              type="text"
              value={lineup1Name}
              onChange={(e) => setLineup1Name(e.target.value)}
              required
              // autoFocus
            ></input>
            <br />
            <div style={{ margin: "1rem 0 0 0", fontSize: "0.9rem" }}>New BO:</div>
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
            <Button type="submit" onClick={onRename}>
              Save
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

export default RenameLineup1Modal;
