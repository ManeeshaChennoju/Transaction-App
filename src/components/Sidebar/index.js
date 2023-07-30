// import React from "react";
// import { Link } from "react-router-dom";
// import { FiHome, FiList, FiUser, FiLogOut } from "react-icons/fi";
// import "./index.css";

// const Sidebar = ({ isAdmin, onLogout }) => {
//   return (
//     <div className="sidebar">
//       <img
//         src="https://res.cloudinary.com/dtnhhgwlo/image/upload/v1690686983/Frame_507_gguzr3.png"
//         alt="Logo"
//         className="sidebar-logo"
//       />
//       <div className="sidebar-menu">
//         <Link to="/dashboard" className="sidebar-item">
//           <FiHome className="sidebar-icon" />
//           <span className="sidebar-text">Dashboard</span>
//         </Link>
//         <Link to="/transactions" className="sidebar-item">
//           <FiList className="sidebar-icon" />
//           <span className="sidebar-text">Transactions</span>
//         </Link>
//         <Link to="/profile" className="sidebar-item">
//           <FiUser className="sidebar-icon" />
//           <span className="sidebar-text">Profile</span>
//         </Link>
//       </div>
//       <div className="logout">
//         <button onClick={onLogout} className="sidebar-item">
//           <FiLogOut className="sidebar-icon" />
//           <span className="sidebar-text">Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiList, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../AuthContext"; // Import the AuthContext

import "./index.css";

const Sidebar = ({ onLogout }) => {
  const { isAdmin } = useAuth(); // Get the isAdmin value from the AuthContext

  return (
    <div className="sidebar">
      <img
        src="https://res.cloudinary.com/dtnhhgwlo/image/upload/v1690686983/Frame_507_gguzr3.png"
        alt="Logo"
        className="sidebar-logo"
      />
      <div className="sidebar-menu">
        <Link to="/dashboard" className="sidebar-item">
          <FiHome className="sidebar-icon" />
          <span className="sidebar-text">Dashboard</span>
        </Link>
        <Link to="/transactions" className="sidebar-item">
          <FiList className="sidebar-icon" />
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
        <button onClick={onLogout} className="sidebar-item">
          <FiLogOut className="sidebar-icon" />
          <span className="sidebar-text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
