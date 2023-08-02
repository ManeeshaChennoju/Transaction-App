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
  const {
    isAdmin,
    isLoggedIn,
    login,
    logout,
    currentUser,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
  } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please Enter Both Email and Password.");
      return;
    }
    await login(email, password);
  };

  const handleLogout = () => {
    logout();
    setEmail("");
    setPassword("");
  };

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && <Sidebar isAdmin={isAdmin} onLogout={handleLogout} />}
        <div className="content-container">
          {isLoggedIn ? (
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard"/>} />
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
            </Routes>
          ) : (
            <div className="login-container">
              <img
                src="https://res.cloudinary.com/dtnhhgwlo/image/upload/v1690686983/Frame_507_gguzr3.png"
                alt="Login"
                className="login-image"
              />
              <div className="login-form">
                <div className="login-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="login-form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <div className="error">*{error}</div>}
                <button onClick={handleLogin} className="login_button">
                  Login
                </button>
              </div>
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
