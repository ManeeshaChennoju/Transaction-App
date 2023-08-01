import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CgDanger } from "react-icons/cg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

const DeleteTransaction = ({ transaction, onDeleteTransaction }) => {
  const handleDeleteTransaction = () => {
    onDeleteTransaction(transaction.id);
  };

  return (
    <Popup
      trigger={
        <button type="button" className="delete_button">
          <RiDeleteBinLine size={19} style={{ color: "red" }} />
        </button>
      }
      modal
      nested
      closeOnDocumentClick={false}
    >
      {(close) => (
        <div className="delete-popup-overlay">
          <div className="delete-popup-content">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="popup-body">
              <div className="round1">
                <div className="round2">
                  <CgDanger size={30} color="#D97706" />
                </div>
              </div>
              <div className="delete_content">
                <h2 className="delete_h2">Are you sure you want to Delete?</h2>
                <p>
                  This Transaction will be deleted immediately. You can't Undo
                  this Action
                </p>

                <div className="delete-popup-actions">
                  <button
                    type="button"
                    className="popup-confirm"
                    onClick={() => {
                      handleDeleteTransaction();
                      close();
                    }}
                  >
                    Yes,Delete
                  </button>
                  <button
                    type="button"
                    className="popup-cancel"
                    onClick={close}
                  >
                    No,Leave it
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default DeleteTransaction;
