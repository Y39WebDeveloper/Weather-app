import { createContext, useEffect, useState } from "react";

import IconDrizzle from "/assets/images/icon-drizzle.webp";
import IconRain from "/assets/images/icon-rain.webp";
import IconSnow from "/assets/images/icon-snow.webp";
import IconFog from "/assets/images/icon-fog.webp";
import IconOvercast from "/assets/images/icon-overcast.webp";
import IconPartlyCloudy from "/assets/images/icon-partly-cloudy.webp";
import IconStorm from "/assets/images/icon-storm.webp";
import IconSunny from "/assets/images/icon-sunny.webp";


const MeteoContext = createContext({});

const MeteoProvider = ({ children }) => {
  let storedCity;
  if(localStorage.getItem("city")){
    storedCity = JSON.parse(localStorage.getItem("city"));
  }else{
    localStorage.setItem("city", JSON.stringify({city: "Algiers", country: "Algeria", lat: 36.752887, lon: 3.042048}));
    storedCity = JSON.parse(localStorage.getItem("city"));
  }
  const [city, setCity] = useState(storedCity);
  const [meteoData, setMeteoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const icons = [IconDrizzle, IconRain, IconSnow, IconFog, IconOvercast, IconPartlyCloudy, IconStorm, IconSunny];
  const [activeDay, setActiveDay] = useState(
    new Date().toLocaleDateString("en-US", { weekday: "long" })
  );

  function getIcon(weather_code) {
    // Mapping of weather codes to icon indices
    const weatherCodeToIconIndex = {
      0: 7, // Clear sky -> IconSunny
      1: 5, // Mainly clear -> IconPartlyCloudy
      2: 5, // Partly cloudy -> IconPartlyCloudy
      3: 4, // Overcast -> IconOvercast
      45: 3, // Fog -> IconFog
      48: 3, // Depositing rime fog -> IconFog
      51: 0, // Drizzle: Light -> IconDrizzle
      53: 0, // Drizzle: Moderate -> IconDrizzle
      55: 0, // Drizzle: Dense intensity -> IconDrizzle
      56: 0, // Freezing Drizzle: Light -> IconDrizzle
      57: 0, // Freezing Drizzle: Dense intensity -> IconDrizzle
      61: 1, // Rain: Slight -> IconRain
      63: 1, // Rain: Moderate -> IconRain
      65: 1, // Rain: Heavy intensity -> IconRain
      66: 1, // Freezing Rain: Light -> IconRain
      67: 1, // Freezing Rain: Heavy intensity -> IconRain
      71: 2, // Snow fall: Slight -> IconSnow
      73: 2, // Snow fall: Moderate -> IconSnow
      75: 2, // Snow fall: Heavy intensity -> IconSnow
      77: 2, // Snow grains -> IconSnow
      80: 1, // Rain showers: Slight -> IconRain
      81: 1, // Rain showers: Moderate -> IconRain
      82: 1, // Rain showers: Violent -> IconRain
      85: 2, // Snow showers slight -> IconSnow
      86: 2, // Snow showers heavy -> IconSnow
      95: 6, // Thunderstorm: Slight or moderate -> IconStorm
      96: 6, // Thunderstorm with slight hail -> IconStorm
      99: 6, // Thunderstorm with heavy hail -> IconStorm
    };

    return icons[weatherCodeToIconIndex[weather_code] || 7]; // Default to IconSunny if code not found
  }

  useEffect(() => {
    const fetchMeteoData = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${
          city.lat
        }&longitude=${
          city.lon
        }&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m${
          isMetric
            ? ""
            : "&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch"
        }`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Http error! status: ${response.status}`);
        }
        const data = await response.json();
        setMeteoData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeteoData();
  }, [city.lat, city.lon, isMetric]);

  return (
    <MeteoContext.Provider
      value={{
        isLoading,
        setIsLoading,
        meteoData,
        setMeteoData,
        city,
        setCity,
        activeDay,
        setActiveDay,
        notFound,
        setNotFound,
        isMetric,
        setIsMetric,
        error,
        icons,
        getIcon
      }}
    >
      {children}
    </MeteoContext.Provider>
  );
};

export { MeteoContext, MeteoProvider };
