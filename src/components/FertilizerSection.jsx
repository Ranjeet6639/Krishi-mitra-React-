import React, { useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import jsPDF from "jspdf";

function FertilizerSection() {
  const [output, setOutput] = useState("");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const recommendations = {
    wheat: { npk: "120:60:40", schedule: "Split Nitrogen application" },
    rice: { npk: "100:50:50", schedule: "Topdress at panicle stage" },
    maize: { npk: "150:75:40", schedule: "Apply at knee-high stage" }
  };

  const handleRecommendation = () => {
    const crop = document.getElementById("crop").value;
    const ph = parseFloat(document.getElementById("ph").value);

    if (!crop || isNaN(ph)) {
      setOutput("⚠️ Please fill all details.");
      return;
    }

    const rec = recommendations[crop];
    setOutput(`Recommended NPK: ${rec.npk} | ${rec.schedule}`);

    const npkValues = rec.npk.split(":").map(Number);

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Nitrogen", "Phosphorus", "Potassium"],
        datasets: [{
          label: "NPK",
          data: npkValues
        }]
      }
    });
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Fertilizer Recommendation", 20, 20);
    pdf.text(output, 20, 30);
    pdf.save("fertilizer-report.pdf");
  };

  return (
    <section className="fertilizer-section">
      <h3>🌿 Fertilizer Recommendation System</h3>

      <select id="crop">
        <option value="">Select Crop</option>
        <option value="wheat">Wheat</option>
        <option value="rice">Rice</option>
        <option value="maize">Maize</option>
      </select>

      <input id="ph" type="number" placeholder="Soil pH" />

      <button onClick={handleRecommendation}>
        🌾 Get Recommendation
      </button>

      <div>{output}</div>

      <canvas ref={chartRef}></canvas>

      <button onClick={downloadPDF}>📄 Download PDF</button>
    </section>
  );
}

export default FertilizerSection;
