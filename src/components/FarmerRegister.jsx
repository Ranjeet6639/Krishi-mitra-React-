import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FarmerRegistration.css";

function FarmerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    category: "",
    handicap: "",
    qualification: "",
    dob: "",
    rationCategory: "",
    rationNumber: "",
    state: "",
    district: "",
    taluka: "",
    village: "",
    pincode: "",
    address: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // ✅ Added

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setIsSuccess(false);
      setMessage("Passwords do not match!");
      return;
    }

    console.log("Form Data:", formData);

    setIsSuccess(true);
    setMessage("");
    setShowPopup(true); // ✅ Show popup

    // ✅ Redirect after 2 seconds
    setTimeout(() => {
      navigate("/farmer-login");
    }, 2000);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        
        <fieldset>
          <legend>Personal Information</legend>

          <input
            type="text"
            id="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
          />

          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            id="rationNumber"
            placeholder="Ration Card Number"
            value={formData.rationNumber}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            id="profilePhoto"
            onChange={handleChange}
            accept="image/*"
          />
        </fieldset>

        <fieldset>
          <legend>Farm Location</legend>

          <select
            id="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            <option>Maharashtra</option>
            <option>Gujarat</option>
            <option>Madhya Pradesh</option>
          </select>

          <input
            type="text"
            id="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
          />
                    <input
            type="text"
            id="taluka"
            placeholder="Taluka"
            value={formData.taluka}
            onChange={handleChange}
          />

          <input
            type="text"
            id="village"
            placeholder="Village"
            value={formData.village}
            onChange={handleChange}
          />

          <input
            type="text"
            id="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
          />

          <textarea
            id="address"
            placeholder="Farmer Address"
            value={formData.address}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <legend>Contact & Security</legend>

          <input
            type="text"
            id="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </fieldset>

        <button type="submit">Submit</button>

        {message && (
          <p className={isSuccess ? "success" : "error"}>
            {message}
          </p>
        )}
      </form>

       {showPopup && (
       <div className="popup-overlay">
       <div className="popup">
          <h2 style={{color: "green"}}>Registration Successful! Redirecting to login page...</h2>
        </div>
        </div>
)}
    </div>
  );
}

export default FarmerRegister;