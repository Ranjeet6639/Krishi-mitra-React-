import React, { useState } from "react";
import "../styles/Contact.css";
import Navbar from "./Navbar";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Later connect to backend
    alert("Message Sent Successfully!");
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <>
      <Navbar />

      <section className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            We’d love to hear from you! Whether you have a question
            about our services, feedback, or partnership ideas —
            reach out to us.
          </p>

          <div className="info-box">
            <p>
              <strong>✉️ Email:</strong> krishimitra.contact@gmail.com
            </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send us a Message</h3>

          <div className="input-box">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Your Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer>
        <p>© 2025 Krishi Mitra | All Rights Reserved</p>
      </footer>
    </>
  );
}

export default Contact;
