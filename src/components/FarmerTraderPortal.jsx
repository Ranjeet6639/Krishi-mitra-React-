import React, { useState, useEffect } from "react";
import "../styles/FarmerTraderPortal.css";

function FarmerTraderPortal() {
  const [farmerListings, setFarmerListings] = useState([]);
  const [traderRequirements, setTraderRequirements] = useState([]);

  const [farmerForm, setFarmerForm] = useState({
    name: "",
    quantity: "",
    price: "",
    location: ""
  });

  const [traderForm, setTraderForm] = useState({
    name: "",
    quantity: "",
    budget: "",
    location: ""
  });

  // Load data
  useEffect(() => {
    const savedListings =
      JSON.parse(localStorage.getItem("farmerListings")) || [];
    const savedRequirements =
      JSON.parse(localStorage.getItem("traderRequirements")) || [];

    setFarmerListings(savedListings);
    setTraderRequirements(savedRequirements);
  }, []);

  // Sync storage
  useEffect(() => {
    localStorage.setItem("farmerListings", JSON.stringify(farmerListings));
  }, [farmerListings]);

  useEffect(() => {
    localStorage.setItem(
      "traderRequirements",
      JSON.stringify(traderRequirements)
    );
  }, [traderRequirements]);

  // === FARMER SUBMIT ===
  const handleFarmerSubmit = (e) => {
    e.preventDefault();

    const newVeg = {
      id: Date.now(),
      ...farmerForm,
      status: "Available"
    };

    setFarmerListings([...farmerListings, newVeg]);
    setFarmerForm({ name: "", quantity: "", price: "", location: "" });
    alert("✅ Listing added successfully!");
  };

  // === TRADER SUBMIT ===
  const handleTraderSubmit = (e) => {
    e.preventDefault();

    const newReq = {
      id: Date.now(),
      ...traderForm
    };

    setTraderRequirements([...traderRequirements, newReq]);
    setTraderForm({ name: "", quantity: "", budget: "", location: "" });
    alert("✅ Requirement added successfully!");
  };

  // === SEND REQUEST ===
  const sendRequest = (id) => {
    const updated = farmerListings.map((veg) =>
      veg.id === id && veg.status === "Available"
        ? { ...veg, status: "Requested" }
        : veg
    );
    setFarmerListings(updated);
    alert("📨 Request sent to farmer!");
  };

  // === CONFIRM ORDER ===
  const confirmOrder = (id) => {
    const updated = farmerListings.map((veg) =>
      veg.id === id && veg.status === "Requested"
        ? { ...veg, status: "Sold" }
        : veg
    );

    setFarmerListings(updated);

    const farmerDetails = {
      farmerName: "Suresh Patel",
      farmerMobile: "9998877766"
    };

    localStorage.setItem(
      "approvedRequest",
      JSON.stringify(farmerDetails)
    );

    alert(
      `✅ Order confirmed!\nTrader Ravi Kumar will contact you soon at 9876543210.`
    );
  };

  // === RESET DATA ===
  const resetData = () => {
    if (window.confirm("⚠️ Clear all demo data?")) {
      localStorage.removeItem("farmerListings");
      localStorage.removeItem("traderRequirements");
      setFarmerListings([]);
      setTraderRequirements([]);
      alert("🗑️ Demo data cleared!");
    }
  };

  return (
    <div>
      <button
        onClick={resetData}
        style={{ position: "fixed", top: 10, right: 10 }}
      >
        🗑️ Reset Data
      </button>

      <header>
        <h1>👨‍🌾 Farmer & Trader Portal</h1>
      </header>

      {/* FARMER FORM */}
      <section className="form-card">
        <h2>Add Vegetables (Farmer)</h2>
        <form onSubmit={handleFarmerSubmit}>
          <input
            placeholder="Vegetable Name"
            value={farmerForm.name}
            onChange={(e) =>
              setFarmerForm({ ...farmerForm, name: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={farmerForm.quantity}
            onChange={(e) =>
              setFarmerForm({ ...farmerForm, quantity: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={farmerForm.price}
            onChange={(e) =>
              setFarmerForm({ ...farmerForm, price: e.target.value })
            }
            required
          />
          <input
            placeholder="Location"
            value={farmerForm.location}
            onChange={(e) =>
              setFarmerForm({ ...farmerForm, location: e.target.value })
            }
            required
          />
          <button className="btn">Add Listing</button>
        </form>
      </section>

      {/* TRADER FORM */}
      <section className="form-card">
        <h2>Add Requirement (Trader)</h2>
        <form onSubmit={handleTraderSubmit}>
          <input
            placeholder="Vegetable Name"
            value={traderForm.name}
            onChange={(e) =>
              setTraderForm({ ...traderForm, name: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={traderForm.quantity}
            onChange={(e) =>
              setTraderForm({ ...traderForm, quantity: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Budget"
            value={traderForm.budget}
            onChange={(e) =>
              setTraderForm({ ...traderForm, budget: e.target.value })
            }
            required
          />
          <input
            placeholder="Location"
            value={traderForm.location}
            onChange={(e) =>
              setTraderForm({ ...traderForm, location: e.target.value })
            }
            required
          />
          <button className="btn">Add Requirement</button>
        </form>
      </section>

      {/* DISPLAY LISTINGS */}
      <section className="form-card">
        <h2>Available Listings</h2>

        {farmerListings.length === 0 && <p>No vegetables available.</p>}

        {farmerListings.map((veg) => (
          <div key={veg.id} className={`item ${veg.status.toLowerCase()}`}>
            <h3>{veg.name}</h3>
            <p>Quantity: {veg.quantity} kg</p>
            <p>Price: ₹{veg.price}/kg</p>
            <p>Location: {veg.location}</p>
            <p>Status: {veg.status}</p>

            {veg.status === "Available" && (
              <button
                className="btn"
                onClick={() => sendRequest(veg.id)}
              >
                📩 Send Request
              </button>
            )}

            {veg.status === "Requested" && (
              <button
                className="btn"
                onClick={() => confirmOrder(veg.id)}
              >
                ✅ Confirm Order
              </button>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default FarmerTraderPortal;
