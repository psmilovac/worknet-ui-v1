"use client";

import { useEffect } from "react";

const LvSectionModal = ({ isOpen, onClose, children, lvline, setSharedLvSectionState }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
console.log("lvline from modal", lvline)
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop
      >
        <button className="modal-close" onClick={onClose}>
          {/* <button onClick={onClose}>Close</button> */}
          &times;
        </button>
        <div className="modal-header">Select the section</div>
        {children}
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: flex-end;
          align-items: center;
          z-index: 1;
        }
        .modal-content {
          margin: 0rem 0 0 0;
          width: 43rem;
          height: 100%;
          overflow-y: auto;
          background: white;
          padding: 15px;
          border-left: 0.5px solid gray;
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 2.5rem;
          cursor: pointer;
        }
        .modal-header {
          position: absolute;
          display: block;
          justify-content: "end";
          font-size: 25px;
          margin-top: 1rem;
        }
        .modal-content {
          padding: 0.5rem;
        }

        .modal-card {
          background-color: #fff;
          border: 1px solid rgb(202, 202, 202);
        }

        .modal-card:hover,
        .modal-card:active {
          border: 1px solid var(--select);
          box-shadow: 0 3px 6px -2px rgba(50, 50, 93, 0.25), 0 3px 7px -3px rgba(0, 0, 0, 0.3);
        }

        .modal-form-select {
          border-color: var(--focus);
          display: flex;
          flex-direction: row;
          justify-content: left;
          align-items: center;
          gap: 10px;
          margin: 0px;
          padding: 0.5rem 0 0.5rem 0;
          border: 0;
          border: 1px solid var(--gray);
          border-radius: 0.2rem;
          margin: auto 0;
          height: 2.2rem;
          padding: 0 3rem 0 0.7rem;
          width: 18rem;
        }

        .modal-form-select:focus {
          outline: none;
          box-shadow: 0px 0px 1px 1px var(--focus) inset;
        }
      `}</style>
    </div>
  );
};

export default LvSectionModal;
