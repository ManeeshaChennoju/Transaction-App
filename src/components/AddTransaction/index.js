import React, { useState } from "react";

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    transactionName: "",
    transactionType: "",
    transactionCategory: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform validations on formData here

      // Make API call to add transaction with formData
      await fetch(
        "https://bursting-gelding-24.hasura.app/api/rest/add-transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Show toast message on successful addition
      // Fetch updated transactions after addition
      // Update transaction list and total amounts in Dashboard
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Transaction Name:
          <input
            type="text"
            name="transactionName"
            value={formData.transactionName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Transaction Type:
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </label>
        <label>
          Transaction Category:
          <select
            name="transactionCategory"
            value={formData.transactionCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {/* Add options for categories */}
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
