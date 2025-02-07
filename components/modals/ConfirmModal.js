import React from "react";
import styles from "./ConfirmModal.module.css";
import Card from "../ui/Card";
import Button from "../ui/buttons/Button";

export default function ConfirmModal(props) {
  console.log(props.showConfirmModal)
  const cancelHandler = () =>{
    // console.log("cancelHandler")
    // showConfirmModal 
  }

  return (
    <div className={styles.backdrop}>
      {/* <Card className={styles.container}/> */}
      <div className={styles.container}>
        <header className={styles.header}>
          <h3>props.title</h3>
        </header>
        <div className={styles.content}>
          <p>props.message</p>
          {/* <input
            id="editsectionname"
            type="text"
            value={newSectionnName}
            onChange={(e) => setNewSectionName(e.target.value)}
            required
            placeholder={props.sectionName}
            autoFocus
          ></input> */}
        </div>
        <footer className={styles.actions}>
          <Button type="submit" onClick={"editSectionHandlerModal"}>
            Save
          </Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </footer>
      </div>
    </div>
  );
}
