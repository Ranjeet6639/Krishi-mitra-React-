import React, { useState } from "react";
import "../styles/WeatherDetails.css";
import Navbar from "./FarmerNavbar";

function WeatherSuggestion() {
  const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // 🔴 Move to .env in production

  const [locationInput, setLocationInput] = useState("");
  const [soilType, setSoilType] = useState("Loamy");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🌱 Crop Database
  const cropDB = [
    { name: "Rice", soil: ["Clay", "Loamy"], temp: [20, 35], rainfall: "High", season: [4,5,6,7,8] },
    { name: "Wheat", soil: ["Loamy", "Sandy"], temp: [10, 25], rainfall: "Low", season: [10,11,0,1] },
    { name: "Maize", soil: ["Sandy", "Loamy"], temp: [18, 30], rainfall: "Medium", season: [5,6,7,8,9] },
    { name: "Sugarcane", soil: ["Clay", "Loamy"], temp: [20, 38], rainfall: "High", season: [3,4,5,6,7,8] },
    { name: "Pulses", soil: ["Sandy", "Loamy"], temp: [18, 30], rainfall: "Low", season: [6,7,8,9] }
  ];

  const getRainfallCategory = (humidity, rain) => {
    if (rain > 50 || humidity > 80) return "High";
    if (rain > 10 || humidity > 60) return "Medium";
    return "Low";
  };

  const suggestCrops = (temp, humidity, rain) => {
    const month = new Date().getMonth();
    const rainfall = getRainfallCategory(humidity, rain);

    return cropDB
      .filter(
        (crop) =>
          crop.soil.includes(soilType) &&
          temp >= crop.temp[0] &&
          temp <= crop.temp[1] &&
          crop.rainfall === rainfall &&
          crop.season.includes(month)
      )
      .map((c) => c.name);
  };

  const fetchWeatherByCity = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return await res.json();
  };

  const handleWeatherSearch = async () => {
    if (!locationInput.trim()) return alert("Enter a location");

    setLoading(true);
    const cities = locationInput.split(",").map((c) => c.trim());
    let tempResults = [];

    for (let city of cities) {
      try {
        const data = await fetchWeatherByCity(city);

        if (data.cod !== 200) {
          tempResults.push({ error: `${city} not found` });
          continue;
        }

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const rain = data.rain ? data.rain["1h"] || 0 : 0;
        const crops = suggestCrops(temp, humidity, rain);

        tempResults.push({
          city: data.name,
          temp,
          humidity,
          rain,
          condition: data.weather[0].main,
          crops
        });
      } catch {
        tempResults.push({ error: `Error fetching ${city}` });
      }
    }

    setResults(tempResults);
    setLoading(false);
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const rain = data.rain ? data.rain["1h"] || 0 : 0;
        const crops = suggestCrops(temp, humidity, rain);

        setResults([
          {
            city: data.name + " (Your Location)",
            temp,
            humidity,
            rain,
            condition: data.weather[0].main,
            crops
          }
        ]);
      } catch {
        alert("Error fetching weather");
      }

      setLoading(false);
    });
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>🌤 Weather & Crop Suggestion</h2>
          <p>
            Enter your location or use GPS to get crop recommendations.
          </p>

          <input
            type="text"
            placeholder="Enter city (e.g., Pune)"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />

          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          >
            <option value="Loamy">Loamy</option>
            <option value="Clay">Clay</option>
            <option value="Sandy">Sandy</option>
          </select>

          <div className="btn-group">
            <button onClick={handleWeatherSearch}>
              Get Suggestions
            </button>
            <button onClick={useMyLocation}>
              📍 Use My Location
            </button>
          </div>

          {loading && <div className="result">⏳ Fetching...</div>}

          {results.map((res, index) => (
            <div key={index} className="result">
              {res.error ? (
                <p>{res.error}</p>
              ) : (
                <>
                  📍 <b>{res.city}</b><br />
                  🌡 Temp: {res.temp}°C<br />
                  ⛅ Weather: {res.condition}<br />
                  💧 Humidity: {res.humidity}%<br />
                  🌧 Rain: {res.rain} mm<br />
                  🌱 Crops:{" "}
                  <b>
                    {res.crops.length
                      ? res.crops.join(", ")
                      : "No perfect match"}
                  </b>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer>
        © 2025 Krishi Mitra | Empowering Farmers 🌱
      </footer>
    </>
  );
}

export default WeatherSuggestion;
