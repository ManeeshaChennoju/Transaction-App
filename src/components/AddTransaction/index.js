import React, { useState } from "react";
import { format } from "date-fns";
import { useAuth } from "../../AuthContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

const AddTransactionForm = ({ onClose, onAddTransaction }) => {
  const { currentUser } = useAuth();
  const [transactionName, setTransactionName] = useState("");
  const [transactionType, setTransactionType] = useState("Credit");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const maxTransactionNameLength = 30;

  const handleAddTransaction = (e) => {
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

    const newTransaction = {
      name: transactionName,
      type: transactionType.toLowerCase(),
      category: transactionCategory,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      user_id: currentUser,
    };

    onAddTransaction(newTransaction);
    onClose();
  };

  return (
    <div className="add_transaction_form">
      <form onSubmit={handleAddTransaction}>
        <h2>Add Transaction</h2>
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
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
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
            <option value="Entertainment">Entertainment</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            {/* Add other options here */}
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
          <button type="submit" className="form_add_button">
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

const AddTransaction = ({ onAddTransaction }) => {
  return (
    <Popup
      trigger={
        <button className="add_transaction_button">+ Add Transaction</button>
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
            <AddTransactionForm
              onClose={close}
              onAddTransaction={onAddTransaction}
            />
          </div>
        </div>
      )}
    </Popup>
  );
};

export default AddTransaction;
