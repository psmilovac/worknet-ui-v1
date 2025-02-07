import ReactDOM from "react-dom";
import styles from "./ModalTemplate.module.css"


const ModalTemplate = ({ onClose, children, title }) => {
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

   
    return ReactDOM.createPortal(
        <div className={styles.modal_overlay}>
            <div className={styles.modal_wrapper}>
                <div className={styles.modal}>
                    <div className={styles.modal_header}>
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <h1>{title}</h1>}
                    <div className={styles.modal_body}>{children}</div>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default ModalTemplate