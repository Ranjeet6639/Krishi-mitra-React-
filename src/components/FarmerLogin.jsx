import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/FarmerLogin.css";

import google from "../assets/google.png";
import microsoft from "../assets/microsoft.png";
import apple from "../assets/apple.png";
import phone from "../assets/phone.png";

function FarmerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later replace with backend authentication
    if (email && password) {
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/farmer-dashboard");
      }, 2000);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Log in or Sign up</h2>

        <div className="social-btn">
          <img src={google} alt="" /> Continue with Google
        </div>
        <div className="social-btn">
          <img src={microsoft} alt="" /> Continue with Microsoft
        </div>
        <div className="social-btn">
          <img src={apple} alt="" /> Continue with Apple
        </div>
        <div className="social-btn">
          <img src={phone} alt="" /> Continue with Phone
        </div>

        <div className="divider">OR</div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Continue</button>
        </form>

        <div className="extra-links">
          <p>
            Don't have an account?{" "}
            <Link to="/farmer-register">Register here</Link>
          </p>
          <p>
            Trader Account?{" "}
            <Link to="/trader-login">Login Here</Link>
          </p>
          <p>
            <a href="#">Forgot password?</a>
          </p>
        </div>
      </div>

      {/* Popup */}
      <div className={`popup ${showPopup ? "show" : ""}`}>
        Login successful! Redirecting to your dashboard...
      </div>
    </>
  );
}

export default FarmerLogin;
