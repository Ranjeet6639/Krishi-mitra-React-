import React, { useEffect, useState } from "react";
import DiseaseCarousel from "./DiseaseCarousel";
import FarmerNavbar from "./FarmerNavbar";
import FertilizerSection from "./FertilizerSection";
import NearbyServicesMap from "./NearbyServicesMap";
import Chatbot from "./Chatbot";
import "../styles/FarmerDashboard.css";


function FarmerDashboard() {
  const [prices, setPrices] = useState([]);
  const [location, setLocation] = useState("Maharashtra");


  const fetchSeedPrices = async () => {
    setPrices([]);

    const mockData = [
      { crop: "Wheat", price: "₹2,150 / quintal" },
      { crop: "Rice", price: "₹2,800 / quintal" },
      { crop: "Maize", price: "₹1,950 / quintal" },
      { crop: "Pulses", price: "₹5,000 / quintal" },
      { crop: "Groundnut", price: "₹6,200 / quintal" },
      { crop: "Soybean", price: "₹4,850 / quintal" }
    ];

    setTimeout(() => {
      setPrices(mockData);
    }, 1000);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const data = await res.json();
            setLocation(
              `📍 Location: ${data.city || data.locality || "Your Area"}, ${data.principalSubdivision}`
            );
          } catch {
            setLocation("📍 Location detected, but name not found.");
          }

          fetchSeedPrices();
        },
        () => {
          setLocation("📍 Unable to access location.");
          fetchSeedPrices();
        }
      );
    } else {
      setLocation("📍 Geolocation not supported.");
      fetchSeedPrices();
    }
  };
  useEffect(() => {
  document.body.className = "dashboardbody";
  getUserLocation();

  return () => {
    document.body.className = "";
  };
}, []);

  return (
    <>
      <FarmerNavbar />
      <div className="dashboard-container">
        <h2>🌾 Welcome to Your Dashboard</h2>
        <div>{location}</div>

        <button className="refresh-btn" onClick={fetchSeedPrices}>
          🔄 Refresh Prices
        </button>

        <div className="price-grid">
          {prices.length === 0 ? (
            <p>Loading latest prices...</p>
          ) : (
            prices.map((item, index) => (
              <div key={index} className="price-card">
                <div className="crop-name">{item.crop}</div>
                <div className="crop-price">
                  Current Price: {item.price}
                </div>
              </div>
            ))
          )}
        </div>

        <DiseaseCarousel />
        <FertilizerSection />
        {/* <NearbyServicesMap /> */}
        <Chatbot />
      </div>
    </>
  );
}

export default FarmerDashboard;
