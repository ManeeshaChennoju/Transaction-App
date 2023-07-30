import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchData = async () => {
    try {
      // Fetch user's profile data
      const response = await fetch(
        "https://bursting-gelding-24.hasura.app/api/rest/profile"
      );
      const data = await response.json();

      // Sample data for testing
      setProfileData({
        profileIcon: "profile.jpg",
        name: "John Doe",
        username: "johndoe",
        email: "john.doe@example.com",
        dateOfBirth: "1990-01-01",
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {profileData && (
        <div>
          <img src={profileData.profileIcon} alt="Profile Icon" />
          <p>Name: {profileData.name}</p>
          <p>Username: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
          <p>Date of Birth: {profileData.dateOfBirth}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
