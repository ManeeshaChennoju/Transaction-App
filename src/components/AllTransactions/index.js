import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAuth } from "../../AuthContext";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./index.css";

const users = [
  {
    email: "jane.doe@gmail.com",
    password: "janedoe@123",
    username: "Jane Doe",
    userId: 1,
    profileImg:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "samsmith@gmail.com",
    password: "samsmith@123",
    username: "Samsmith",
    userId: 2,
    profileImg:
      "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "rahul@gmail.com",
    password: "rahul@123",
    username: "Rahul",
    userId: 4,
    profileImg:
      "https://images.pexels.com/photos/4342400/pexels-photo-4342400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "teja@gmail.com",
    password: "teja@123",
    username: "Teja ",
    userId: 5,
    profileImg:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "loki@gmail.com",
    password: "loki@123",
    username: "Loki",
    userId: 6,
    profileImg:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "ramesh@gmail.com",
    password: "ramesh@123",
    username: "Ramesh",
    userId: 7,
    profileImg:
      "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "suresh@gmail.com",
    password: "suresh@123",
    username: "Suresh",
    userId: 8,
    profileImg:
      "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "prem@gmail.com",
    password: "prem@123",
    username: "Prem",
    userId: 9,
    profileImg:
      "https://images.pexels.com/photos/3754208/pexels-photo-3754208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "piyush@gmail.com",
    password: "piyush@123",
    username: "Piyush",
    userId: 10,
    profileImg:
      "https://images.pexels.com/photos/2340978/pexels-photo-2340978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "isha@gmail.com",
    password: "isha@123",
    username: "Isha",
    userId: 12,
    profileImg:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "seema@gmail.com",
    password: "seema@123",
    username: "Seema",
    userId: 14,
    profileImg:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "seema@123",
    password: "arjun@123",
    username: "Arjun",
    userId: 15,
    profileImg:
      "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "radha@gmail.com",
    password: "radha@123",
    username: "Radha",
    userId: 16,
    profileImg:
      "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    email: "phani@gmail.com",
    password: "phani@123",
    username: "Phani",
    userId: 17,
    profileImg:
      "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const AllTransactions = () => {
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
      const limit = 50;
      const offset = 0;
      const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`;
      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "admin",
        "x-hasura-user-id": currentUser,
      };
      const response = await fetch(apiUrl, { headers });
      const data = await response.json();
      console.log("All admin Transactions Data------", data);
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const defaultProfileImgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcU50X1UOeDaphmUyD6T8ROKs-HjeirpOoapiWbC9cLAqewFy1gthrgUTB9E7nKjRwOVk&usqp=CAU";

  return (
    <div className="main-container">
      <div className="container">
        <h2>Transactions</h2>
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
      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Transaction Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => {
              const user = users.find(
                (user) => user.userId === transaction.user_id
              );
              const profileImgUrl = user?.profileImg || defaultProfileImgUrl;
              const userName = user?.username || "User";
              return (
                <tr key={transaction.id}>
                  <td className="arrow-icon">
                    {transaction.type === "credit" ? (
                      <BiUpArrowCircle color="red" size={27} />
                    ) : (
                      <BiDownArrowCircle color="green" size={27} />
                    )}
                    <img
                      src={profileImgUrl}
                      alt="Profile"
                      className="profile-image"
                    />
                    <span className="user-name">
                      {capitalizeFirstLetter(userName)}
                    </span>
                  </td>
                  {/* <td className="user-info">
                    <img
                      src={user?.profileImg}
                      alt="Profile"
                      className="profile-image"
                    />
                    <span className="user-name">{user?.email}</span>
                  </td> */}
                  <td>{capitalizeFirstLetter(transaction.transaction_name)}</td>
                  <td>{capitalizeFirstLetter(transaction.category)}</td>
                  <td style={{ color: getAmountColor(transaction.type) }}>
                    {transaction.type === "debit" ? "-" : ""}
                    {transaction.amount}
                  </td>
                  <td>{formatDate(transaction.date)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTransactions;
