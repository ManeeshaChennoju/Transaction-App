import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAuth } from "../../AuthContext";
import { GrEdit } from "react-icons/gr";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

import "./index.css";
const Dashboard = () => {
  const { isAdmin, currentUser } = useAuth();

  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMM, hh:mm a");
  };

  //   code successed
  //   useEffect(() => {
  //     fetchAdminData();
  //   }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    } else {
      fetchNonAdminData();
    }
    getRecentTransactions();
  }, [isAdmin, currentUser]);

  const admin_tcd_url =
    "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin";

  const fetchAdminData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "admin",
      };

      const response = await fetch(admin_tcd_url, { headers });
      const data = await response.json();
      console.log("Admin Data:", data);
      setTotalCredit(calculateTotalCredit(data.transaction_totals_admin));
      setTotalDebit(calculateTotalDebit(data.transaction_totals_admin));

      // Rest of the code to handle the data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, show error message to the user, etc.
    }
  };

  const non_admin_tcd_url =
    "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
  const fetchNonAdminData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": currentUser?.id || "",
      };

      const response = await fetch(non_admin_tcd_url, { headers });
      const data = await response.json();
      console.log("Non-Admin Data:", data);
      setTotalCredit(
        calculateTotalCredit(data.totals_credit_debit_transactions)
      );
      setTotalDebit(calculateTotalDebit(data.totals_credit_debit_transactions));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getRecentTransactions = async () => {
    const limit = 3; // Get the latest 3 transactions
    const offset = 0; // Start from the first transaction
    const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`;
    // const apiUrl =
    //   "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
    const headers = {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": isAdmin ? "admin" : "user",
      "x-hasura-user-id": currentUser?.id || "",
    };

    try {
      const response = await fetch(apiUrl, { headers });
      const data = await response.json();
      console.log("transactions:", data);
      const transactions = data.transactions;
      setRecentTransactions(transactions);
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
    }
  };

  //   const calculateTotalCredit = (data) => {
  //     return data
  //       .filter((item) => item.type === "credit")
  //       .reduce((sum, item) => sum + item.sum, 0);
  //   };

  //   const calculateTotalDebit = (data) => {
  //     return data
  //       .filter((item) => item.type === "debit")
  //       .reduce((sum, item) => sum + item.sum, 0);
  //   };

  const calculateTotalCredit = (data) => {
    let totalCredit = 0;
    if (data && Array.isArray(data)) {
      for (const item of data) {
        if (
          item.type === "credit" &&
          typeof item.sum === "number" &&
          !isNaN(item.sum)
        ) {
          totalCredit += item.sum;
        }
      }
    }
    return totalCredit;
  };

  const calculateTotalDebit = (data) => {
    let totalDebit = 0;
    if (data && Array.isArray(data)) {
      for (const item of data) {
        if (
          item.type === "debit" &&
          typeof item.sum === "number" &&
          !isNaN(item.sum)
        ) {
          totalDebit += item.sum;
        }
      }
    }
    return totalDebit;
  };

  const getAmountColor = (type) => {
    return type === "credit" ? "green" : "red";
  };

  const getIconColor = (type) => {
    return type === "credit" ? "blue" : "red";
  };

  //   code okay---------
  return (
    <div>
      <div className="top_container">
        <h3>Accounts</h3>
        <button className="add_transaction_button">+ Add Transaction</button>
      </div>

      <div className="total_credits_debits_container">
        <div className="credits">
          <div>
            <h1>{totalCredit}</h1>
            <p>Credit</p>
          </div>
          <img
            src="https://res.cloudinary.com/dtnhhgwlo/image/upload/v1690717500/Group_ro2iwa.svg"
            alt="credits image"
            className="tcb_img"
          />
        </div>
        <div className="debits">
          <div>
            <h1>{totalDebit}</h1>
            <p>Debit</p>
          </div>
          <img
            src="https://res.cloudinary.com/dtnhhgwlo/image/upload/v1690717586/Group_1_agcapl.png"
            alt="debits image"
            className="tcb_img"
          />
        </div>
      </div>

      <div className="last_transactions_container">
        <h1>Last Transaction </h1>

        <p> display the api transaction data here</p>
        <ul>
          {recentTransactions.map((transaction) => (
            <li key={transaction.id}>
              <p>{transaction.transaction_name}</p>
              <p>{transaction.category}</p>
              <p>{formatDate(transaction.date)}</p>
              <p style={{ color: getAmountColor(transaction.type) }}>
                {transaction.type === "credit" ? (
                  <FiArrowUp
                    style={{ color: getIconColor(transaction.type) }}
                  />
                ) : (
                  <FiArrowDown
                    style={{ color: getIconColor(transaction.type) }}
                  />
                )}
                {transaction.amount}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="barchart_container"></div>
    </div>
  );
};

export default Dashboard;
