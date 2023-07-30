import React, { useState, useEffect } from "react";

const YourTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch user's transactions
      const response = await fetch(
        "https://bursting-gelding-24.hasura.app/api/rest/all-transactions"
      );
      const data = await response.json();

      // Sample data for testing
      setTransactions(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (transactionId) => {
    try {
      // Make API call to delete transaction by ID
      await fetch(
        `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction/${transactionId}`,
        {
          method: "DELETE",
        }
      );

      // Show toast message on successful deletion
      // Fetch updated transactions after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <h2>Your Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <span>{transaction.transactionName}</span>
            <span>{transaction.category}</span>
            <span>{transaction.amount}</span>
            <span>{transaction.date}</span>
            <button>Edit</button>
            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
            {/* Implement confirmation popup */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourTransactions;
