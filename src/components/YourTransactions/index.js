// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { useAuth } from "../../AuthContext";
// import { GrEdit } from "react-icons/gr";
// import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
// import { RiDeleteBinLine } from "react-icons/ri";

// // For Non - Admin Users only

// const YourTransactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const { currentUser } = useAuth();

//   // Function to format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return format(date, "dd MMM, hh:mm a");
//   };

//   const getAmountColor = (type) => {
//     return type === "credit" ? "red" : "green";
//   };

//   const getIconColor = (type) => {
//     return type === "credit" ? "red" : "green";
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const limit = 10;
//       const offset = 0;
//       const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`;
//       const headers = {
//         "Content-Type": "application/json",
//         "x-hasura-admin-secret":
//           "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
//         "x-hasura-role": "user",
//         "x-hasura-user-id": currentUser,
//       };
//       const response = await fetch(apiUrl, { headers });
//       const data = await response.json();
//       console.log("Your Transactions Data------", data);
//       setTransactions(data.transactions);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleDelete = async (transactionId) => {
//     try {
//       // Make API call to delete transaction by ID
//       await fetch(
//         `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction/${transactionId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       // Show toast message on successful deletion
//       // Fetch updated transactions after deletion
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting transaction:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="top_container">
//         <h2>Transactions</h2>
//         <button type="button" className="add_transaction_button">
//           + Add Transaction
//         </button>
//       </div>
//       <div>
//         <p>------------Tabs------------------</p>
//       </div>
//       <ul>
//         {transactions &&
//           transactions.map((transaction) => (
//             <React.Fragment key={transaction.id}>
//               <li key={transaction.id}>
//                 <p>
//                   {transaction.type === "credit" ? (
//                     <BiUpArrowCircle
//                       size={28}
//                       style={{ color: getIconColor(transaction.type) }}
//                     />
//                   ) : (
//                     <BiDownArrowCircle
//                       size={28}
//                       style={{ color: getIconColor(transaction.type) }}
//                     />
//                   )}
//                 </p>
//                 <p className="items">{transaction.transaction_name}</p>
//                 <p className="items">{transaction.category}</p>
//                 <p className="items">{formatDate(transaction.date)}</p>
//                 <p
//                   className="items"
//                   style={{ color: getAmountColor(transaction.type) }}
//                 >
//                   -${transaction.amount}
//                 </p>
//                 <button type="button" className="edit_button">
//                   <GrEdit size={18} />
//                 </button>
//                 <button type="button" className="edit_button">
//                   <RiDeleteBinLine size={19} style={{ color: "red" }} />
//                 </button>
//               </li>
//               <hr />
//             </React.Fragment>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default YourTransactions;

// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { useAuth } from "../../AuthContext";
// import { GrEdit } from "react-icons/gr";
// import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
// import { RiDeleteBinLine } from "react-icons/ri";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import "./index.css";

// const YourTransactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const { currentUser } = useAuth();
//   const [tabValue, setTabValue] = useState(0);

//   // Function to format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return format(date, "dd MMM, hh:mm a");
//   };

//   const getAmountColor = (type) => {
//     return type === "credit" ? "red" : "green";
//   };

//   const getIconColor = (type) => {
//     return type === "credit" ? "red" : "green";
//   };

//   const handleChangeTab = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const limit = 20;
//       const offset = 0;
//       const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`;
//       const headers = {
//         "Content-Type": "application/json",
//         "x-hasura-admin-secret":
//           "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
//         "x-hasura-role": "user",
//         "x-hasura-user-id": currentUser,
//       };
//       const response = await fetch(apiUrl, { headers });
//       const data = await response.json();
//       console.log("Your Transactions Data------", data);
//       setTransactions(data.transactions);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleDelete = async (transactionId) => {
//     try {
//       // Make API call to delete transaction by ID
//       await fetch(
//         `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction/${transactionId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       // Show toast message on successful deletion
//       // Fetch updated transactions after deletion
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting transaction:", error);
//     }
//   };

//   const filteredTransactions =
//     tabValue === 0
//       ? transactions // Display all transactions for tabValue 0 (All Transactions)
//       : transactions.filter((transaction) =>
//           tabValue === 1
//             ? transaction.type === "credit"
//             : transaction.type === "debit"
//         );

//   return (
//     <div>
//       <div className="top_container">
//         <h2>Transactions</h2>
//         <button type="button" className="add_transaction_button">
//           + Add Transaction
//         </button>
//       </div>
//       <Tabs
//         value={tabValue}
//         onChange={handleChangeTab}
//         textColor="primary"
//         className="tabs_container"
//       >
//         <Tab label="All Transactions" />
//         <Tab label="Credit" />
//         <Tab label="Debit" />
//       </Tabs>
//       <ul className="all_transactions_container">
//         <li className="headings_container">
//           <p>Transaction Name</p>
//           <p>Category</p>
//           <p>Date</p>
//           <p>Amount</p>
//         </li>
//         {filteredTransactions &&
//           filteredTransactions.map((transaction) => (
//             <React.Fragment key={transaction.id}>
//               <li key={transaction.id} className="li_container">
//                 <p>
//                   {transaction.type === "credit" ? (
//                     <BiUpArrowCircle
//                       size={28}
//                       style={{ color: getIconColor(transaction.type) }}
//                     />
//                   ) : (
//                     <BiDownArrowCircle
//                       size={28}
//                       style={{ color: getIconColor(transaction.type) }}
//                     />
//                   )}
//                 </p>
//                 <p className="items">{transaction.transaction_name}</p>
//                 <p className="items">{transaction.category}</p>
//                 <p className="items">{formatDate(transaction.date)}</p>
//                 <p
//                   className="items"
//                   style={{ color: getAmountColor(transaction.type) }}
//                 >
//                   -${transaction.amount}
//                 </p>
//                 <button type="button" className="edit_button">
//                   <GrEdit size={18} />
//                 </button>
//                 <button type="button" className="edit_button">
//                   <RiDeleteBinLine size={19} style={{ color: "red" }} />
//                 </button>
//               </li>
//               <hr />
//             </React.Fragment>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default YourTransactions;

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAuth } from "../../AuthContext";
import { GrEdit } from "react-icons/gr";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./index.css";

const YourTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);

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
      setTransactions(data.transactions);
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

  return (
    <div className="main-container">
      <div className="container">
        <div className="top_container">
          <h2>Transactions</h2>
          <button type="button" className="add_transaction_button">
            + Add Transaction
          </button>
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
      {/* <ul className="all_transactions_container">
        <li className="headings_container">
          <p className="name">Transaction Name</p>
          <p className="category">Category</p>
          <p className="date">Date</p>
          <p className="amount">Amount</p>
        </li>
        {filteredTransactions &&
          filteredTransactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <li key={transaction.id} className="li_container">
                <p>
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
                </p>
                <p className="li_name">
                  {capitalizeFirstLetter(transaction.transaction_name)}
                </p>
                <p className="li_category">
                  {capitalizeFirstLetter(transaction.category)}
                </p>
                <p className="li_date">{formatDate(transaction.date)}</p>
                <p
                  className="li_amount"
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
              <hr style={{ borderColor: "white", borderWidth: "0px" }} />
            </React.Fragment>
          ))}
      </ul> */}
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
                        {capitalizeFirstLetter(transaction.transaction_name)}
                      </span>
                    </td>
                    <td>{capitalizeFirstLetter(transaction.category)}</td>
                    <td>{formatDate(transaction.date)}</td>
                    <td style={{ color: getAmountColor(transaction.type) }}>
                      -${transaction.amount}
                    </td>
                    <td>
                      <button type="button" className="edit_button">
                        <GrEdit size={18} />
                      </button>
                      <button type="button" className="edit_button">
                        <RiDeleteBinLine size={19} style={{ color: "red" }} />
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YourTransactions;
