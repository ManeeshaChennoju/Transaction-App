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
      console.log("All Transactions data------", data);
      // Sample data for testing
      setTransactions(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1 className="tabs_container">All transactions</h1>
    </div>
  );
};

export default AllTransactions;
