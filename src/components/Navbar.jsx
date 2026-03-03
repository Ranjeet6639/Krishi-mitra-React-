import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar animate">
      <h1 className="logo animate">Krishi Mitra</h1>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div className={`nav-links animate ${menuOpen ? "show" : ""}`}>
      <Link to="/">Home</Link>
      <Link to="/farmer-register">Farmer Register</Link>
      <Link to="/trader-register">Trader Register</Link>
      <Link to="/farmer-login">Farmer Login</Link>
      <Link to="/trader-login">Trader Login</Link>
      <Link to="/contact">Contact Us</Link>
      
     </div>
    </div>
  );
}


export default Navbar;
