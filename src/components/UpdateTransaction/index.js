import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

const UpdateTransactionForm = ({
  transaction,
  onClose,
  onUpdateTransaction,
}) => {
  const [transactionName, setTransactionName] = useState(transaction.name);
  const [transactionType, setTransactionType] = useState(transaction.type);
  const [transactionCategory, setTransactionCategory] = useState(
    transaction.category
  );
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [date, setDate] = useState(transaction.date.slice(0, 10));
  const [error, setError] = useState("");
  const maxTransactionNameLength = 30;

  const handleUpdateTransaction = (e) => {
    e.preventDefault();

    if (!transactionName || !transactionCategory || !amount || !date) {
      setError("All fields are required");
      return;
    }

    if (transactionName.length > maxTransactionNameLength) {
      setError(
        `Transaction Name should be max ${maxTransactionNameLength} characters`
      );
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Amount should be a numeric value greater than zero");
      return;
    }

    setError("");

    const updatedTransaction = {
      id: transaction.id,
      name: transactionName,
      type: transactionType.toLowerCase(),
      category: transactionCategory,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
    };

    onUpdateTransaction(updatedTransaction);
    onClose();
  };

  return (
    <div className="update_transaction_form">
      <form onSubmit={handleUpdateTransaction}>
        <h2 className="update_h2">Update Transaction</h2>
        <p>You can update your transaction here</p>
        {error && <p className="error">{error}</p>}
        <div className="form_group">
          <label htmlFor="name">Transaction Name</label>
          <br />
          <input
            type="text"
            id="name"
            value={transactionName}
            placeholder="Enter Name"
            onChange={(e) => setTransactionName(e.target.value)}
          />
        </div>
        <div className="form_group">
          <label>Transaction Type</label>
          <br />
          <select
            value={transactionType}
            placeholder="Select Transaction Type"
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        <div className="form_group">
          <label>Category</label>
          <br />
          <select
            value={transactionCategory}
            onChange={(e) => setTransactionCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="entertainment">Entertainment</option>
            <option value="food">Food</option>
            <option value="shopping">Shopping</option>
          </select>
        </div>
        <div className="form_group">
          <label>Amount</label>
          <br />
          <input
            type="number"
            value={amount}
            placeholder="Enter Your Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form_group">
          <label>Date</label>
          <br />
          <input
            type="date"
            value={date}
            placeholder="Select Date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form_group">
          <button type="submit" className="form_update_button">
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

const UpdateTransaction = ({ transaction, onUpdateTransaction }) => {
  return (
    <Popup
      trigger={
        <button type="button" className="edit_button">
          <GrEdit size={18} />
        </button>
      }
      modal
      nested
      closeOnDocumentClick={false}
    >
      {(close) => (
        <div className="popup-overlay">
          <div className="update-popup-content">
            <button className="close" onClick={close}>
              &times;
            </button>
            <UpdateTransactionForm
              transaction={transaction}
              onClose={close}
              onUpdateTransaction={onUpdateTransaction}
            />
          </div>
        </div>
      )}
    </Popup>
  );
};

export default UpdateTransaction;
