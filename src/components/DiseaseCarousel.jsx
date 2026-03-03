import React, { useEffect, useState } from "react";

import wheat from "../assets/wheat rust.jpeg";
import rice from "../assets/Rice blast.jpg";
import maize from "../assets/Maze Downy Mildew.jpg";
import cotton from "../assets/Cotton Alternaria Leaf Spot.webp";
import potato from "../assets/Potato Late Blight.jpeg";

function DiseaseCarousel() {
  const slides = [
    {
      img: wheat,
      title: "Wheat — Rust Disease",
      text: "Caused by fungi Puccinia. Prevention: Use resistant varieties & proper irrigation."
    },
    {
      img: rice,
      title: "Rice — Blast Disease",
      text: "Caused by Magnaporthe oryzae. Prevention: Clean seeds & fungicide spray."
    },
    {
      img: maize,
      title: "Maize — Leaf Blight",
      text: "Brown lesions on leaves. Prevention: Crop rotation & Mancozeb spray."
    },
    {
      img: cotton,
      title: "Cotton — Alternaria Leaf Spot",
      text: "Fungal infection. Prevention: Field hygiene & carbendazim."
    },
    {
      img: potato,
      title: "Potato — Late Blight",
      text: "Caused by Phytophthora infestans. Prevention: Copper fungicides."
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="disease-carousel">
      <h3>🧫 Crop Disease Detection & Awareness</h3>

      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="disease-slide">
              <img src={slide.img} alt={slide.title} />
              <h4>{slide.title}</h4>
              <p>{slide.text}</p>
            </div>
          ))}
        </div>

        <button className="carousel-btn prev" onClick={() =>
          setIndex((index - 1 + slides.length) % slides.length)
        }>❮</button>

        <button className="carousel-btn next" onClick={() =>
          setIndex((index + 1) % slides.length)
        }>❯</button>
      </div>
    </section>
  );
}

export default DiseaseCarousel;
