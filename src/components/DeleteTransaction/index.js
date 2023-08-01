import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="popup-body">
              <h2>Are you sure you want to delete this transaction?</h2>
              <p>
                This Transaction will be deleted immediately. You can't Undo
                this Action
              </p>
              <div className="popup-actions">
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
                <button type="button" className="popup-cancel" onClick={close}>
                  No,Leave it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default DeleteTransaction;
