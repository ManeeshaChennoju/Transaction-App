import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import "./index.css";

const Profile = () => {
  const { isAdmin, currentUser } = useAuth();
  const [profileData, setProfileData] = useState(null);

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

  return (
    <div className="main-container">
      <div className="container">
        <h2>Profile</h2>
        {!isAdmin && (
          <button type="button" className="add_transaction_button">
            + Add Transaction
          </button>
        )}
      </div>

      {profileData && (
        <form>
          <img
            width={50}
            src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
            alt="Profile Icon"
          />
          <div>
            <label>Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) =>
                setProfileData({ ...profileData, username: e.target.value })
              }
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={profileData.password}
              onChange={(e) =>
                setProfileData({ ...profileData, password: e.target.value })
              }
            />
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              value={profileData.date_of_birth}
              onChange={(e) =>
                setProfileData({ ...profileData, dateOfBirth: e.target.value })
              }
            />
          </div>
          <div>
            <label>Present Address</label>
            <input
              type="text"
              value={profileData.present_address}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  presentAddress: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Permanent Address</label>
            <input
              type="text"
              value={profileData.permanent_address}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  permanentAddress: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              value={profileData.city}
              onChange={(e) =>
                setProfileData({ ...profileData, city: e.target.value })
              }
            />
          </div>
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              value={profileData.postal_code}
              onChange={(e) =>
                setProfileData({ ...profileData, postalCode: e.target.value })
              }
            />
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              value={profileData.country}
              onChange={(e) =>
                setProfileData({ ...profileData, country: e.target.value })
              }
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
