import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    try {
      const apiUrl =
        "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
      const headers = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      };

      const formData = {
        email: email,
        password: password,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("logged user:", data);

      if (data.get_user_id && data.get_user_id.length > 0) {
        const userId = data.get_user_id[0].id;
        console.log(typeof userId);
        // const userId = data.get_user_id[0].id;
        setIsAdmin(userId === 3);
        setCurrentUser(userId);
        setIsLoggedIn(true);
        setError("");
      } else {
        // Invalid credentials
        setError("Invalid credentials. Please try again.");
        setIsLoggedIn(false); // Set isLoggedIn to false
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      setError("Error fetching user ID. Please try again.");
      setIsLoggedIn(false); // Set isLoggedIn to false
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAdmin, isLoggedIn, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
