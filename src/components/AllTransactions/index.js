import React, { useState, useEffect } from "react";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all transactions (admin only)
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

  return (
    <div>
      <h2>All Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <span>{transaction.userName}</span>
            <span>{transaction.transactionName}</span>
            <span>{transaction.category}</span>
            <span>{transaction.amount}</span>
            <span>{transaction.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTransactions;
