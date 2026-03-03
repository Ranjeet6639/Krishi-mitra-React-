import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Logout.css";

function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const confirmLogout = () => {
    setIsLoggingOut(true);

    // Clear storage
    localStorage.clear();
    sessionStorage.clear();

    setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 2500);
  };

  const cancelLogout = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
          alt="Logout Icon"
          className="logout-icon"
        />

        <h2>Logout Confirmation</h2>

        <p>
          Are you sure you want to log out of <strong>Krishi Mitra</strong>?
        </p>

        {!isLoggingOut && (
          <div className="btn-group">
            <button className="btn cancel" onClick={cancelLogout}>
              Cancel
            </button>

            <button className="btn confirm" onClick={confirmLogout}>
              Logout
            </button>
          </div>
        )}

        {isLoggingOut && (
          <>
            <div className="loader"></div>
            <p>Logging out...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Logout;
