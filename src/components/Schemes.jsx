import React, { useState, useMemo } from "react";
import "../styles/Schemes.css";
import Navbar from "./Navbar";

function Schemes() {
  const schemes = [
    {
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      category: "insurance",
      desc: "Crop insurance scheme to support farmers facing crop loss due to natural calamities, pests, or diseases.",
      department: "Ministry of Agriculture",
      link: "https://pmfby.gov.in/"
    },
    {
      title: "Kisan Credit Card (KCC)",
      category: "loan",
      desc: "Provides short-term credit support to farmers for cultivation and other agricultural needs.",
      department: "NABARD / Banks",
      link: "https://pmmodiyojana.in/kisan-credit-card/"
    },
    {
      title: "PM-KISAN Samman Nidhi",
      category: "subsidy",
      desc: "Provides ₹6,000 per year in three equal installments to all farmer families having cultivable land.",
      department: "Department of Agriculture & Farmers Welfare",
      link: "https://pmkisan.gov.in/"
    },
    {
      title: "Per Drop More Crop (Micro Irrigation Fund)",
      category: "irrigation",
      desc: "Promotes efficient water usage by providing subsidy for drip and sprinkler irrigation systems.",
      department: "NABARD / Ministry of Agriculture",
      link: "https://pmksy.gov.in/"
    },
    {
      title: "National Horticulture Mission (NHM)",
      category: "crop",
      desc: "Supports production and post-harvest management of horticultural crops through subsidies and training.",
      department: "Ministry of Agriculture",
      link: "https://nhb.gov.in/"
    }
  ];

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredSchemes = useMemo(() => {
    return schemes.filter((s) =>
      (category === "all" || s.category === category) &&
      s.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [category, search]);

  return (
    <>
      <Navbar />

      <h2 className="page-title">
        Available Government Schemes for Farmers
      </h2>

      <div className="filter-bar">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="crop">Crop Support</option>
          <option value="irrigation">Irrigation</option>
          <option value="insurance">Insurance</option>
          <option value="subsidy">Subsidy</option>
          <option value="loan">Loan & Credit</option>
        </select>

        <input
          type="text"
          placeholder="Search by scheme name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="scheme-grid">
        {filteredSchemes.length === 0 ? (
          <p>No schemes found.</p>
        ) : (
          filteredSchemes.map((s, index) => (
            <div key={index} className="scheme-card">
              <div className="scheme-title">{s.title}</div>
              <div className="scheme-meta">{s.department}</div>
              <div className="scheme-desc">{s.desc}</div>

              <button
                className="scheme-btn"
                onClick={() => window.open(s.link, "_blank")}
              >
                Apply / Learn More
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Schemes;
