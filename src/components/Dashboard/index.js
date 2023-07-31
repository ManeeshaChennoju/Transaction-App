import { format, parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../AuthContext";
import { GrEdit } from "react-icons/gr";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

import "./index.css";
const Dashboard = () => {
  const { isAdmin, currentUser } = useAuth();
  console.log("dashboard-----is admin-----", isAdmin);
  console.log("dashboard------", currentUser);

  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [totalCreditBarchart, setTotalCreditBarchart] = useState(0);
  const [totalDebitBarchart, setTotalDebitBarchart] = useState(0);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMM, hh:mm a");
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    } else {
      fetchNonAdminData();
    }
    getRecentTransactions();
    fetchChartData();
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
      if (!currentUser) {
        console.error("Invalid currentUser data:", currentUser);
        return;
      }
      const userId = currentUser;
      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": userId,
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
    const limit = 3;
    const offset = 0;
    const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`;
    const headers = {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": isAdmin ? "admin" : "user",
      "x-hasura-user-id": currentUser,
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
    return type === "credit" ? "red" : "green";
  };

  const getIconColor = (type) => {
    return type === "credit" ? "red" : "green";
  };

  const fetchChartData = async () => {
    try {
      const apiUrl = isAdmin
        ? "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin"
        : "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";

      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": isAdmin ? "admin" : "user",
        "x-hasura-user-id": currentUser,
      };

      const response = await fetch(apiUrl, { headers });
      const data = await response.json();
      console.log("Bar Chart Data:", data);

      // Process the data and update chartData state accordingly
      const processedData = isAdmin
        ? data.last_7_days_transactions_totals_admin.map((item) => ({
            date: formatDate(parseISO(item.date), "eee"),
            [item.type]: item.sum, // Dynamically set the credit/debit based on the type
          }))
        : data.last_7_days_transactions_credit_debit_totals.map((item) => ({
            date: formatDate(parseISO(item.date), "eee"),
            [item.type]: item.sum, // Dynamically set the credit/debit based on the type
          }));

      // Calculate the total credit and total debit sums separately
      let totalCreditSum = 0;
      let totalDebitSum = 0;

      processedData.forEach((item) => {
        if (item.credit) {
          totalCreditSum += item.credit;
        }
        if (item.debit) {
          totalDebitSum += item.debit;
        }
      });

      setTotalCreditBarchart(totalCreditSum);
      setTotalDebitBarchart(totalDebitSum);

      setChartData(processedData);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <div>
      <div className="top_container">
        <h2>Accounts</h2>
        <button type="button" className="add_transaction_button">
          + Add Transaction
        </button>
      </div>

      <div className="total_credits_debits_container">
        <div className="credits">
          <div>
            <h1>${totalCredit}</h1>
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
            <h1>${totalDebit}</h1>
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
        <ul>
          {recentTransactions &&
            recentTransactions.map((transaction) => (
              <React.Fragment key={transaction.id}>
                <li key={transaction.id}>
                  <p>
                    {transaction.type === "credit" ? (
                      <BiUpArrowCircle
                        size={28}
                        style={{ color: getIconColor(transaction.type) }}
                      />
                    ) : (
                      <BiDownArrowCircle
                        size={28}
                        style={{ color: getIconColor(transaction.type) }}
                      />
                    )}
                  </p>
                  <p className="items">{transaction.transaction_name}</p>
                  <p className="items">{transaction.category}</p>
                  <p className="items">{formatDate(transaction.date)}</p>
                  <p
                    className="items"
                    style={{ color: getAmountColor(transaction.type) }}
                  >
                    -${transaction.amount}
                  </p>
                  <button type="button" className="edit_button">
                    <GrEdit size={18} />
                  </button>
                  <button type="button" className="edit_button">
                    <RiDeleteBinLine size={19} style={{ color: "red" }} />
                  </button>
                </li>
                <hr />
              </React.Fragment>
            ))}
        </ul>
      </div>

      <div className="barchart_container">
        <h1>Debit & Credit Overview</h1>
        <h4 style={{ marginBottom: "10px" }}>
          {`$${totalDebitBarchart} Debited & $${totalCreditBarchart} Credited in this Week`}
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={500} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => value.toUpperCase()}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="credit" stackId="a" fill="#FCAA0B" />
            <Bar dataKey="debit" stackId="a" fill="#4D78FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

// -------------------------------------------------------------
// -------------------------------------------------------------
