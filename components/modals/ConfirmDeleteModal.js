import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "./ConfirmDeleteModal.module.css";
import Button from "../ui/buttons/Button";
import ButtonDelete from "../ui/buttons/ButtonDelete";
import ButtonCancel from "../ui/buttons/ButtonCancel";

const ConfirmDeleteModal = ({
  onClose,
  children,
  name,
  title,
  setDeleteModalState,
}) => {
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

  // on Delete Button
  const onDelete = (e) => {
    e.preventDefault();
    setDeleteModalState(true); // send to parent
    onClose();
  };

  // setDeleteModalState
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
          <h1>Delete {title}</h1>
        </div>
        Are you sure you want to delete the {title.toLowerCase()}: <b>{name}</b>
        ?{/* ---------CONTENT--------- */}
        <div className={styles.content}>{children}</div>
        <br />
        <span style={{ margin: "0 1rem  0 0 " }}>
          <ButtonDelete type="button" onClick={onDelete}>
            Delete
          </ButtonDelete>
        </span>
        <ButtonCancel type="button" onClick={onCancel}>
          Cancel
        </ButtonCancel>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ConfirmDeleteModal;
