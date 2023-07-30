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

// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./components/Dashboard";
// import YourTransactions from "./components/YourTransactions";
// import AllTransactions from "./components/AllTransactions";
// import Profile from "./components/Profile";
// import "./App.css";

// const App = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   // Function to handle login
//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       return;
//     }

//     // Your login API call logic here
//     // For demonstration purposes, we are assuming successful login for admin user
//     if (email === "admin@gmail.com" && password === "Admin@123") {
//       setIsLoggedIn(true);
//       setIsAdmin(true);
//       setError("");
//       return;
//     }

//     const apiUrl =
//       "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
//     const headers = {
//       "Content-Type": "application/json",
//       "x-hasura-admin-secret":
//         "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
//     };
//     const body = JSON.stringify({ email, password });

//     try {
//       const response = await fetch(apiUrl, { method: "POST", headers, body });
//       const data = await response.json();

//       if (data.get_user_id && data.get_user_id.length > 0) {
//         const userId = data.get_user_id[0].id;

//         // Check if the user is an admin
//         setIsAdmin(false);

//         // Fetch user details for non-admin users
//         const user = await getUserDetails(userId);
//         setCurrentUser(user);

//         setIsLoggedIn(true);
//         setError("");
//       } else {
//         // Invalid credentials
//         setError("Invalid credentials. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error fetching user ID:", error);
//       setError("Error fetching user ID. Please try again.");
//     }
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setIsAdmin(false);
//     setCurrentUser(null);
//   };

//   // Function to get user details for non-admin users
//   const getUserDetails = async (userId) => {
//     const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/profile?user_id=${userId}`;
//     const headers = {
//       "Content-Type": "application/json",
//       "x-hasura-admin-secret":
//         "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
//       "x-hasura-role": "user",
//       "x-hasura-user-id": userId,
//     };

//     try {
//       const response = await fetch(apiUrl, { headers });
//       const data = await response.json();
//       return data.users[0];
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       return null;
//     }
//   };

//   return (
//     <Router>
//       <div className="app-container">
//         {/* If the user is logged in, render the Sidebar component */}
//         {isLoggedIn && <Sidebar isAdmin={isAdmin} onLogout={handleLogout} />}

//         <div className="content-container">
//           {isLoggedIn ? (
//             <Routes>
//               <Route path="/" element={<Navigate to="/dashboard" />} />
//               <Route
//                 path="/dashboard"
//                 element={<Dashboard currentUser={currentUser} />}
//               />
//               <Route path="/transactions" element={<YourTransactions />} />
//               {isAdmin && (
//                 <Route path="/all-transactions" element={<AllTransactions />} />
//               )}
//               <Route
//                 path="/profile"
//                 element={<Profile currentUser={currentUser} />}
//               />
//               {/* We can add more routes here if needed */}
//             </Routes>
//           ) : (
//             <div className="login-container">
//               <img
//                 src="https://res.cloudinary.com/dtnhhgwlo/image/upload/v1690686983/Frame_507_gguzr3.png"
//                 alt="Login"
//                 className="login-image"
//               />
//               <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {error && <div className="error">{error}</div>}
//               <button onClick={handleLogin}>Login</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
