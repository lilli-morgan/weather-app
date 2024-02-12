import React, { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  // two state variables - query = stores user's search query & weather = stores weather data from API
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "4df4b82b5d4ff0d82caae1a4891f9ce1";

  const fetchWeatherData = async (e) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      // Change the state (sets weather as returned data)
      setWeather(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };
  return (
    <div className="App">
      <div>
      <form onSubmit={handleSubmit} className="input">
        <input
          className="search-bar"
          type="text"
          placeholder="Enter a location"
          onChange={(event) => setLocation(event.target.value)}
        ></input>
        </form>
      </div>
      <div>
        <button type="submit" onClick={fetchWeatherData}>
          Get Weather
        </button>
      </div>

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}</p>
        </div>
      )}
    </div>
  );
}

export default App;
