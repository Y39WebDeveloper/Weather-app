import HeroBgSm from "/assets/images/bg-today-small.svg";
import HeroBgLg from "/assets/images/bg-today-large.svg";
import { useContext, useEffect, useState } from "react";
import { MeteoContext } from "../Contexts/MeteoContext";
import "./loader2.css";

function Hero() {
  const [bgSize, setBgSize] = useState(
    window.innerWidth < 768 ? HeroBgSm : HeroBgLg
  );
  useEffect(() => {
    const handleBgSize = () => {
      if (window.innerWidth < 768) {
        setBgSize(HeroBgSm);
      } else {
        setBgSize(HeroBgLg);
      }
    };
    window.addEventListener("resize", handleBgSize);
    handleBgSize();

    return () => window.removeEventListener("resize", handleBgSize);
  }, []);

  const { meteoData, city, isLoading, getIcon } = useContext(MeteoContext);

  const date = new Date();
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <div className="relative overflow-hidden rounded-[20px] px-6 py-10 sm:h-[286px]">
      <img
        src={bgSize}
        alt=""
        className="absolute top-1/2 -translate-y-1/2 left-0 object-cover w-full md:h-[286px] -z-1"
      />
      <div className="flex flex-col items-center gap-4 sm:flex-row justify-between h-full">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <span className="text-4">
            {city.city}, {city.country}
          </span>
          <span className="text-6 opacity-80">{formattedDate}</span>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={getIcon(meteoData?.current.weather_code)}
            alt=""
            className="w-[120px] h-[120px]"
          />
          <h3 className="text-1 italic">
            {meteoData?.current.temperature_2m}°
          </h3>
        </div>
      </div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3.5 items-center justify-center bg-neutral-800 w-full h-full text-6 text-neutral-200 ${
          isLoading ? "" : "hidden"
        }`}
      >
        <Loader />
        Loading...
      </div>
    </div>
  );
}

export default Hero;

function Loader() {
  return <div className="loader"></div>;
}
