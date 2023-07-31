import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import YourTransactions from "./components/YourTransactions";
import AllTransactions from "./components/AllTransactions";
import Profile from "./components/Profile";
import "./App.css";
import { AuthProvider, useAuth } from "./AuthContext";

const App = () => {
  const { isAdmin, isLoggedIn, login, logout, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Call the login method from the AuthContext
    await login(email, password);
  };

  const handleLogout = () => {
    // Call the logout method from the AuthContext
    logout();
  };

  return (
    <Router>
      <div className="app-container">
        {/* If the user is logged in, render the Sidebar component */}
        {isLoggedIn && <Sidebar isAdmin={isAdmin} onLogout={handleLogout} />}

        <div className="content-container">
          {isLoggedIn ? (
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route
                path="/dashboard"
                element={<Dashboard currentUser={currentUser} />}
              />
              <Route path="/transactions" element={<YourTransactions />} />
              {isAdmin && (
                <Route path="/all-transactions" element={<AllTransactions />} />
              )}
              <Route
                path="/profile"
                element={<Profile currentUser={currentUser} />}
              />
              {/* We can add more routes here if needed */}
            </Routes>
          ) : (
            <div className="login-container">
              <img
                src="https://res.cloudinary.com/dtnhhgwlo/image/upload/v1690686983/Frame_507_gguzr3.png"
                alt="Login"
                className="login-image"
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div className="error">{error}</div>}
              <button onClick={handleLogin}>Login</button>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

const AppWithContext = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWithContext;
