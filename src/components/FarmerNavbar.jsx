import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="navbar">
      <h1 className="logo">Krishi Mitra</h1>
      <button className="menu-toggle" onClick={() => setShow(!show)}>☰</button>

      <div className={`nav-links ${show ? "show" : ""}`}>
        <Link to="/my-account">My Account</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/farmer-sell-buy">Seller Page</Link>
        <Link to="/schemes">Schemes</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default Navbar;