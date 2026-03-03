import React, { useEffect, useRef } from "react";

function ScrollSection({ title, image, text }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollPercent = 1 - rect.top / window.innerHeight;

      const img = section.querySelector(".scroll-image");
      const paragraph = section.querySelector("p");

      if (img) {
        img.style.transform = `translateY(${scrollPercent * -30}px) scale(1.05)`;
      }

      if (paragraph) {
        paragraph.style.transform = `translateY(${scrollPercent * 20}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="scroll-section" ref={sectionRef}>
      <div className="scroll-left">
        <h2>{title}</h2>
      </div>

      <div className="scroll-right">
        <img src={image} alt={title} className="scroll-image" />
        <p>{text}</p>
      </div>
    </section>
  );
}

export default ScrollSection;
