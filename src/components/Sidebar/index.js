import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";
import { AiOutlineTransaction } from "react-icons/ai";
import { useAuth } from "../../AuthContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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

const Sidebar = () => {
  const {
    isAdmin,
    currentUser,
    logout,
    email,
    setEmail,
    password,
    setPassword,
  } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = "https://bursting-gelding-24.hasura.app/api/rest/profile";
      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": isAdmin ? "admin" : "user",
        "x-hasura-user-id": currentUser,
      };
      const response = await fetch(apiUrl, { headers });
      const data = await response.json();
      console.log("profile-----", data);

      setProfileData(data.users[0]);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const getProfileImgUrl = (userId) => {
    const userProfile = users.find((user) => user.userId === userId);
    return userProfile
      ? userProfile.profileImg
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqchnDJ6zreYOFN7Sag4iGQPEhjseY59SfQ-mf9bN2GpE8fcPXGGO3QC0YLVId0xw2zFU&usqp=CAU"; // Return empty string if not found
  };

  const getUsername = (userId) => {
    const userProfile = users.find((user) => user.userId === userId);
    return userProfile ? userProfile.username : "User";
  };

  const getEmail = (userId) => {
    const userProfile = users.find((user) => user.userId === userId);
    return userProfile ? userProfile.email : "user123@gmail.com";
  };

  const userName = getUsername(currentUser);
  const userEmail = getEmail(currentUser);
  const profileImage = getProfileImgUrl(currentUser);

  return (
    <div className="sidebar">
      <div className="sidebar_logo_container">
        <img
          src="https://res.cloudinary.com/dtnhhgwlo/image/upload/v1690920125/Group_2_si9bjy.png"
          alt="Logo"
          className="sidebar-logo"
        />
        <h1 className="Money">Money </h1>
        <h1 className="Matters">Matters</h1>
      </div>

      <div className="sidebar-menu">
        <Link to="/dashboard" className="sidebar-item">
          <FiHome className="sidebar-icon" />
          <span className="sidebar-text">Dashboard</span>
        </Link>

        <Link
          to={isAdmin ? "/all-transactions" : "/transactions"}
          className="sidebar-item"
        >
          <AiOutlineTransaction className="sidebar-icon" />
          <span className="sidebar-text">
            {isAdmin ? "All Transactions" : "Transactions"}
          </span>
        </Link>

        <Link to="/profile" className="sidebar-item">
          <FiUser className="sidebar-icon" />
          <span className="sidebar-text">Profile</span>
        </Link>
      </div>

      <div className="logout">
        <img src={profileImage} alt="Profile" className="sidebar_profile" />
        <div>
          <h1>User</h1>
          <p>{userEmail}</p>
        </div>
        <Popup
          trigger={
            <button className="sidebar-item" onClick={() => setShowPopup(true)}>
              <FiLogOut className="sidebar-icon" size={20} />
            </button>
          }
          open={showPopup}
          modal
          closeOnDocumentClick={false}
          onClose={() => setShowPopup(false)}
        >
          {(close) => (
            <div className="logout-popup-overlay">
              <div className="logout-popup-content">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="popup-body">
                  <div className="round1">
                    <div className="round2">
                      <FiLogOut size={30} color="#D97706" />
                    </div>
                  </div>
                  <div className="logout_content">
                    <h2 className="logout_h2">
                      Are you sure you want to Logout?
                    </h2>
                    <p>
                      You will be logged out of the application. Do you want to
                      continue?
                    </p>

                    <div className="logout-popup-actions">
                      <button
                        type="button"
                        className="popup-confirm"
                        onClick={() => {
                          handleLogout();
                          close();
                        }}
                      >
                        Yes, Logout
                      </button>
                      <button
                        type="button"
                        className="popup-cancel"
                        onClick={() => {
                          setShowPopup(false);
                          close();
                        }}
                      >
                        No, Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default Sidebar;
