import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { format } from "date-fns";
import { useAuth } from "../../AuthContext";
import { GrEdit } from "react-icons/gr";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddTransaction from "../AddTransaction";
import UpdateTransaction from "../UpdateTransaction";
import DeleteTransaction from "../DeleteTransaction";

import "./index.css";

const YourTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { isAdmin, currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  //  API status views
  const apiStatusViews = {
    success: "SUCCESS",
    loading: "LOADING",
    failure: "FAILURE",
  };

  // State to manage API status
  const [transactionApiStatus, setTransactionApiStatus] = useState(
    apiStatusViews.loading
  );

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMM, hh:mm a");
  };

  const getAmountColor = (type) => {
    return type === "credit" ? "red" : "green";
  };

  const getIconColor = (type) => {
    return type === "credit" ? "red" : "green";
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const limit = 20;
      const offset = 0;
      const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`;
      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": currentUser,
      };
      const response = await fetch(apiUrl, { headers });
      const data = await response.json();
      console.log("Your Transactions Data------", data);
      setTransactionApiStatus(apiStatusViews.success);
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTransactionApiStatus(apiStatusViews.failure);
    }
  };

  const failureUrl =
    "https://img.freepik.com/premium-vector/payment-error-info-message-isometric-concept-customer-cross-marks-failure_106788-2319.jpg?w=1060";

  const renderTransactionApiViews = () => {
    switch (transactionApiStatus) {
      case apiStatusViews.loading:
        return (
          <div data-testid="loader" className="loader_container">
            <ReactLoading type="spin" color="blue" height={40} width={40} />
          </div>
        );
      case apiStatusViews.failure:
        return (
          <div>
            <img src={failureUrl} alt="Failure" width={50} />
            <p>Failed to load data. Please try again later.</p>
          </div>
        );
      case apiStatusViews.success:
        return (
          <div className="table_container">
            <table>
              <thead>
                <tr>
                  <th>Transaction Name</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th colSpan="2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions &&
                  filteredTransactions.map((transaction) => (
                    <React.Fragment key={transaction.id}>
                      <tr>
                        <td>
                          {transaction.type === "credit" ? (
                            <BiUpArrowCircle
                              className="arrows"
                              style={{ color: getIconColor(transaction.type) }}
                            />
                          ) : (
                            <BiDownArrowCircle
                              className="arrows"
                              style={{ color: getIconColor(transaction.type) }}
                            />
                          )}
                          <span className="transaction_name">
                            {capitalizeFirstLetter(
                              transaction.transaction_name
                            )}
                          </span>
                        </td>
                        <td>{capitalizeFirstLetter(transaction.category)}</td>
                        <td>{formatDate(transaction.date)}</td>
                        <td style={{ color: getAmountColor(transaction.type) }}>
                          -${transaction.amount}
                        </td>
                        <td>
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
                              <RiDeleteBinLine
                                size={19}
                                style={{ color: "red" }}
                              />
                            </button>
                          ) : (
                            <DeleteTransaction
                              transaction={transaction}
                              onDeleteTransaction={handleDeleteTransaction}
                            />
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

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

      fetchData();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const filteredTransactions =
    tabValue === 0
      ? transactions // Display all transactions for tabValue 0 (All Transactions)
      : transactions.filter((transaction) =>
          tabValue === 1
            ? transaction.type === "credit"
            : transaction.type === "debit"
        );

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
        alert("Transaction Updated Successfully!");
      }

      fetchData();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  //   Handling Delete transaction
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
        alert("Transaction Deleted Successfully!");

        setTransactions((prevTransactions) =>
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
    <div className="main-container">
      <div className="container">
        <div className="top_container">
          <h2>Transactions</h2>
          <AddTransaction onAddTransaction={handleAddTransaction} />
        </div>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          textColor="primary"
          className="tabs_container"
        >
          <Tab label="All Transactions" />
          <Tab label="Credit" />
          <Tab label="Debit" />
        </Tabs>
      </div>
      {renderTransactionApiViews()}
    </div>
  );
};

export default YourTransactions;
