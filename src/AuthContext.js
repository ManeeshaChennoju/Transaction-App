import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    try {
      // Your login API call logic here
      // For demonstration purposes, we are assuming successful login for admin user
      if (email === "admin@gmail.com" && password === "Admin@123") {
        setIsLoggedIn(true);
        setIsAdmin(true);
        setError("");
        return;
      }

      const apiUrl =
        "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      };
      const body = JSON.stringify({ email, password });

      const response = await fetch(apiUrl, { method: "POST", headers, body });
      //   const response = await fetch(apiUrl, { method: "GET", headers });
      const data = await response.json();

      if (data.get_user_id && data.get_user_id.length > 0) {
        const userId = data.get_user_id[0].id;

        // Check if the user is an admin
        setIsAdmin(false);

        // Fetch user details for non-admin users
        const user = await getUserDetails(userId);
        setCurrentUser(user);

        setIsLoggedIn(true);
      } else {
        // Invalid credentials
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      setError("Error fetching user ID. Please try again.");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentUser(null);
  };

  const getUserDetails = async (userId) => {
    const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/profile?user_id=${userId}`;
    const headers = {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "user",
      "x-hasura-user-id": userId,
    };

    try {
      const response = await fetch(apiUrl, { method: "GET", headers });
      const data = await response.json();
      return data.users[0];
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAdmin, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
