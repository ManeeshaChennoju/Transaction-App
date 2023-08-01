// import React from "react";
// import { useAuth } from "../../AuthContext";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
// import { FiLogOut } from "react-icons/fi";
// import "./index.css";

// const Logout = () => {
//   const { logout } = useAuth();

//   const handleLogout = async () => {
//     await logout();
//   };

//   return (
//     <Popup
//       trigger={
//         <button className="sidebar-item">
//           <FiLogOut className="sidebar-icon" size={20} />
//         </button>
//       }
//       modal
//       nested
//       closeOnDocumentClick={false}
//     >
//       {(close) => (
//         <div className="logout-popup-overlay">
//           <div className="logout-popup-content">
//             <button className="close" onClick={close}>
//               &times;
//             </button>
//             <div className="popup-body">
//               <div className="round1">
//                 <div className="round2">
//                   <FiLogOut size={30} color="#D97706" />
//                 </div>
//               </div>
//               <div className="logout_content">
//                 <h2 className="logout_h2">Are you sure you want to Delete?</h2>
//                 <p>
//                   This Transaction will be deleted immediately. You can't Undo
//                   this Action
//                 </p>

//                 <div className="logout-popup-actions">
//                   <button
//                     type="button"
//                     className="popup-confirm"
//                     onClick={() => {
//                       handleLogout();
//                       close();
//                     }}
//                   >
//                     Yes,Delete
//                   </button>
//                   <button
//                     type="button"
//                     className="popup-cancel"
//                     onClick={close}
//                   >
//                     No,Leave it
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Popup>
//   );
// };

// export default Logout;

import React, { useState, useHistory } from "react";
import { useAuth } from "../../AuthContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FiLogOut } from "react-icons/fi";
import "./index.css";

const Logout = () => {
  const { logout } = useAuth();
  const history = useHistory();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <>
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
                        handleLogout(); // Call the handleLogout function to perform the logout
                        close();
                      }}
                    >
                      Yes, Logout
                    </button>
                    <button
                      type="button"
                      className="popup-cancel"
                      onClick={() => {
                        setShowPopup(false); // Close the popup without logging out
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
    </>
  );
};

export default Logout;
