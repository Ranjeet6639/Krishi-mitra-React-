import React, { useState, useEffect } from "react";
import "../styles/SellBuy.css";
import Navbar from "./FarmerNavbar";

function FarmerSellBuy() {
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    vegName: "",
    quantity: "",
    price: "",
    location: ""
  });

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem("farmerListings");
    if (savedData) {
      setListings(JSON.parse(savedData));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("farmerListings", JSON.stringify(listings));
  }, [listings]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setListings([...listings, formData]);

    setFormData({
      vegName: "",
      quantity: "",
      price: "",
      location: ""
    });
  };

  const resetData = () => {
    localStorage.removeItem("farmerListings");
    setListings([]);
  };

  return (
    <>
      <Navbar />

      <header>
        <h1>👨‍🌾 Krishi Mitra - Farmer Portal</h1>
      </header>

      <main>
        <section className="form-card">
          <h2>Add Your Vegetables for Sale</h2>

          <form onSubmit={handleSubmit}>
            <select
              id="vegName"
              value={formData.vegName}
              onChange={handleChange}
              required
            >
              <option value="">Select Vegetable</option>
              <option>Tomato</option>
              <option>Potato</option>
              <option>Onion</option>
              <option>Carrot</option>
              <option>Cabbage</option>
              <option>Chili</option>
            </select>

            <input
              type="number"
              id="quantity"
              placeholder="Quantity (kg)"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              id="price"
              placeholder="Price per kg (₹)"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              id="location"
              placeholder="Your Location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn">
              Add Listing
            </button>
          </form>
        </section>

        <section className="form-card">
          <h2>Trader Requirements & Your Listings</h2>

          {listings.length === 0 ? (
            <p>No listings added yet.</p>
          ) : (
            listings.map((item, index) => (
              <div key={index} className="listing-card">
                <p><strong>Vegetable:</strong> {item.vegName}</p>
                <p><strong>Quantity:</strong> {item.quantity} kg</p>
                <p><strong>Price:</strong> ₹{item.price}/kg</p>
                <p><strong>Location:</strong> {item.location}</p>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  );
}

export default FarmerSellBuy;
