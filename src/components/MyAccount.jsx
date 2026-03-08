import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyAccount.css";
import Navbar from "./FarmerNavbar";

function MyAccount() {
  const navigate = useNavigate();
  const storageKey = "krishi_profile_v2";

  const defaults = {
    fullName: "Ravi Kumar",
    role: "Vegetable Farmer",
    email: "ravi.kumar@example.com",
    phone: "+91 9876543210",
    address: "Lucknow, Uttar Pradesh",
    pincode: "226001"
  };

  const [profile, setProfile] = useState(defaults);
  const [savedProfile, setSavedProfile] = useState(defaults);
  const [editMode, setEditMode] = useState(false);

  // Load profile
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfile(parsed);
      setSavedProfile(parsed);
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const verifyField = async (fieldName) => {
    const otp = generateOTP();
    alert(`(Simulated) OTP sent: ${otp}`);
    const entered = prompt(`Enter OTP for ${fieldName}`);
    return entered === otp;
  };

  const handleSave = async () => {
    if (!profile.email.includes("@")) {
      alert("Enter valid email");
      return;
    }

    if (profile.phone !== savedProfile.phone) {
      const ok = await verifyField("phone");
      if (!ok) return alert("Phone verification failed");
    }

    if (profile.email !== savedProfile.email) {
      const ok = await verifyField("email");
      if (!ok) return alert("Email verification failed");
    }

    localStorage.setItem(storageKey, JSON.stringify(profile));
    setSavedProfile(profile);
    setEditMode(false);
    alert("Changes saved successfully!");
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setEditMode(false);
  };

  return (
    <>
      <Navbar />

      <div className="wrap">
        {/* LEFT PROFILE CARD */}
        <section className="profile-card">
          <div style={{ height: "52px" }}></div>

          <div className="avatar-wrap">
            <img
              src="https://via.placeholder.com/120x120.png?text=Farmer"
              alt="Farmer avatar"
            />
          </div>

          <h2>{profile.fullName}</h2>
          <div className="profile-role">{profile.role}</div>

          <div className="profile-info">
            <div>
              <div className="label">Email</div>
              <div className="value">{profile.email}</div>
            </div>
            <div>
              <div className="label">Phone</div>
              <div className="value">{profile.phone}</div>
            </div>
            <div>
              <div className="label">Location</div>
              <div className="value">{profile.address}</div>
            </div>
          </div>

          <div className="left-actions">
            <button
              className="btn"
              onClick={() => navigate("/farmer-dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </section>

        {/* RIGHT EDIT FORM */}
        <section className="details-card">
          <div className="details-header">
            <h3>My Account</h3>
            <div className="controls">
              {!editMode && (
                <button
                  className="edit-btn"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              )}

              {editMode && (
                <>
                  <button className="save-btn" onClick={handleSave}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="form-grid">
            <div className="form-row">
              <label>Full name</label>
              <input
                name="fullName"
                value={profile.fullName}
                disabled
              />
            </div>

            <div className="form-row">
              <label>Role</label>
              <input
                name="role"
                value={profile.role}
                disabled
              />
            </div>

            <div className="form-row">
              <label>Email</label>
              <input
                name="email"
                value={profile.email}
                disabled={!editMode}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label>Phone</label>
              <input
                name="phone"
                value={profile.phone}
                disabled={!editMode}
                onChange={handleChange}
              />
            </div>

            <div className="form-row" style={{ gridColumn: "1 / -1" }}>
              <label>Address</label>
              <textarea
                name="address"
                value={profile.address}
                disabled={!editMode}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label>Pincode</label>
              <input
                name="pincode"
                value={profile.pincode}
                disabled={!editMode}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MyAccount;
