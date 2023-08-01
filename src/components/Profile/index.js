import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
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

  //   To get profile image of current user through id
  const getProfileImgUrl = (userId) => {
    const userProfile = users.find((user) => user.userId === userId);
    return userProfile
      ? userProfile.profileImg
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqchnDJ6zreYOFN7Sag4iGQPEhjseY59SfQ-mf9bN2GpE8fcPXGGO3QC0YLVId0xw2zFU&usqp=CAU"; // Return empty string if not found
  };

  return (
    <div className="profile_container">
      <div className="profile_top_container">
        <h2>Profile</h2>
        {!isAdmin && (
          <button type="button" className="add_transaction_button">
            + Add Transaction
          </button>
        )}
      </div>

      {profileData && (
        <form className="profile_form_container">
          <div className="profile_img_container">
            <img
              className="profile_img"
              src={getProfileImgUrl(profileData.id)}
              //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqchnDJ6zreYOFN7Sag4iGQPEhjseY59SfQ-mf9bN2GpE8fcPXGGO3QC0YLVId0xw2zFU&usqp=CAU"
              alt="Profile Icon"
            />
          </div>
          <div className="profile_first_container">
            <label className="profile_label">Your Name</label>
            <input
              type="text"
              className="profile_inputs"
              value={profileData.name}
              placeholder="name"
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
            />
            <br />
            <label className="profile_label">Your Email</label>
            <input
              type="email"
              value={profileData.email}
              placeholder="Email"
              className="profile_inputs"
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
            <br />
            <label className="profile_label">Date of Birth</label>
            <input
              type="date"
              value={profileData.date_of_birth}
              placeholder="Date of birth"
              className="profile_inputs"
              onChange={(e) =>
                setProfileData({ ...profileData, dateOfBirth: e.target.value })
              }
            />
            <br />
            <label className="profile_label">Permanent Address</label>
            <input
              type="text"
              value={profileData.permanent_address}
              placeholder="Permanent Address"
              className="profile_inputs"
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  permanentAddress: e.target.value,
                })
              }
            />
            <br />
            <label className="profile_label">Postal Code</label>
            <input
              type="text"
              placeholder="Pin Code"
              value={profileData.postal_code}
              className="profile_inputs"
              onChange={(e) =>
                setProfileData({ ...profileData, postalCode: e.target.value })
              }
            />
          </div>

          <div className="profile_second_container">
            <label className="profile_label">Username</label>
            <input
              type="text"
              value={profileData.username}
              placeholder="User name"
              className="profile_inputs"
              onChange={(e) =>
                setProfileData({ ...profileData, username: e.target.value })
              }
            />
            <br />
            <label className="profile_label">Password</label>
            <input
              type="password"
              value={profileData.password}
              placeholder="Password"
              className="profile_inputs"
              onChange={(e) =>
                setProfileData({ ...profileData, password: e.target.value })
              }
            />
            <br />
            <label className="profile_label">Present Address</label>
            <input
              type="text"
              value={profileData.present_address}
              placeholder="Present Address"
              className="profile_inputs"
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  presentAddress: e.target.value,
                })
              }
            />
            <br />
            <label className="profile_label">City</label>
            <input
              type="text"
              value={profileData.city}
              placeholder="City"
              className="profile_inputs"
              onChange={(e) =>
                setProfileData({ ...profileData, city: e.target.value })
              }
            />
            <br />
            <label className="profile_label">Country</label>
            <input
              type="text"
              value={profileData.country}
              placeholder="Country"
              className="profile_inputs"
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
