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
import AddTransaction from "../AddTransaction";
import UpdateTransaction from "../UpdateTransaction";
import DeleteTransaction from "../DeleteTransaction";

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

  const non_admin_tcd_url =
    "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";

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

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //   handling Add transaction

  const handleAddTransaction = async (newTransaction) => {
    try {
      const apiUrl =
        "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";
      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": currentUser,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      } else {
        alert("Transaction added successfully!");
      }

      //   fetchData();
      getRecentTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  //   Handling Update transaction

  const handleUpdateTransaction = async (updatedTransaction) => {
    try {
      const apiUrl =
        "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";
      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": currentUser,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(updatedTransaction),
      });

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      } else {
        alert("Transaction updated successfully!");
      }

      getRecentTransactions();
      fetchChartData();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  //   Handle Delete transaction

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(
        `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": currentUser,
          },
          body: JSON.stringify({
            id: transactionId,
          }),
        }
      );

      if (response.ok) {
        alert("Transaction deleted successfully!");

        setRecentTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction.id !== transactionId
          )
        );
      } else {
        alert("Failed to  deleted Transaction!");
      }
    } catch (error) {
      console.log("An error occurred while deleting the transaction");
    }
  };

  return (
    <div className="dashboard_container">
      <div className="dashboard_top_container">
        <h2>Accounts</h2>
        {!isAdmin && <AddTransaction onAddTransaction={handleAddTransaction} />}
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
        <h2>Last Transaction </h2>
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
                  <p className="items">
                    {capitalizeFirstLetter(transaction.transaction_name)}
                  </p>
                  <p className="items">
                    {capitalizeFirstLetter(transaction.category)}
                  </p>
                  <p className="items">{formatDate(transaction.date)}</p>
                  <p
                    className="items"
                    style={{ color: getAmountColor(transaction.type) }}
                  >
                    -${transaction.amount}
                  </p>

                  {isAdmin ? (
                    <button type="button" className="edit_button">
                      <GrEdit size={18} />
                    </button>
                  ) : (
                    <UpdateTransaction
                      transaction={transaction}
                      onUpdateTransaction={handleUpdateTransaction}
                    />
                  )}

                  {isAdmin ? (
                    <button type="button" className="delete_button">
                      <RiDeleteBinLine size={19} style={{ color: "red" }} />
                    </button>
                  ) : (
                    <DeleteTransaction
                      transaction={transaction}
                      onDeleteTransaction={handleDeleteTransaction}
                    />
                  )}
                </li>
                <hr />
              </React.Fragment>
            ))}
        </ul>
      </div>
      <h2 className="db_overview_h2">Debit & Credit Overview</h2>
      <div className="barchart_container">
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
