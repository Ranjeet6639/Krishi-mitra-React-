import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScrollSection from "./components/ScrollSection";
import Footer from "./components/Footer";
import FarmerRegister from "./components/FarmerRegister";
import FarmerDashboard from "./components/FarmerDashboard";
import Contact from "./components/Contact";
import FarmerLogin from "./components/FarmerLogin";
import FarmerSellBuy from "./components/FarmerSellBuy";
import Logout from "./components/Logout";
import MyAccount from "./components/MyAccount";
import Schemes from "./components/Schemes";
import FarmerTraderPortal from "./components/FarmerTraderPortal";
import WeatherSuggestion from "./components/WeatherSuggestion";

import image1 from "./assets/image 1.jpg";
import image4 from "./assets/image 4.webp";
import image5 from "./assets/image 5.jpg";


function Home() {
  return (
    <div className="home-page">
      <ScrollSection
        title="Empowering Farmers"
        image={image1}
        text="Krishi Mitra helps farmers adopt modern techniques and bridges the gap between technology and agriculture."
      />

      <ScrollSection
        title="AI in Agriculture"
        image={image4}
        text="AI enables crop monitoring, predictive analysis, and smart irrigation systems."
      />

      <ScrollSection
        title="Smart Farming"
        image={image5}
        text="IoT sensors provide insights into soil health and crop productivity."
      />

      <Footer />
    </div>
  );
}

function App() {
  const location = useLocation();

  // Routes where we DON'T want public navbar
  const hideNavbarRoutes = [
    "/farmer-dashboard",
    "/my-account",
    "/schemes",
    "/weather",
    "/farmer-sell-buy"
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div id="body" className="app-wrapper">
      
      {!shouldHideNavbar && <Navbar />}

      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farmer-register" element={<FarmerRegister />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/farmer-login" element={<FarmerLogin />} />
          <Route path="/farmer-sell-buy" element={<FarmerSellBuy />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/farmer-portal" element={<FarmerTraderPortal />} />
          <Route path="/weather" element={<WeatherSuggestion />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;