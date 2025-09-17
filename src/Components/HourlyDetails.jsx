import { useContext } from "react";
import { HourlyDatailsNavigation } from "./";
import { MeteoContext } from "../Contexts/MeteoContext";

function HourlyDetails() {
  const { meteoData, activeDay, getIcon } = useContext(MeteoContext);
  let b = [];
  for (let i = 0; i < meteoData?.hourly.time.length; i++) {
    if (
      new Date(meteoData?.hourly.time[i]).toLocaleDateString("en-US", {
        weekday: "long",
      }) === activeDay
    ) {
      const a = {
        time: meteoData?.hourly.time[i],
        temp: meteoData?.hourly.temperature_2m[i],
        icon: meteoData?.hourly.weather_code[i],
      };
      b.push(a);
    }
  }

  const x = Array.from({ length: b.length }, (_, i) => (
    <DetailsItem
      key={i}
      icon={getIcon(b[i].icon)}
      time={new Date(b[i].time).toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      })}
      value={Math.round(b[i].temp)}
    />
  ));

  return (
    <div className="bg-neutral-800 px-4 py-5 sm:px-6 sm:py-6 rounded-[20px] md:min-w-[340px] flex flex-col max-lg:max-h-[693px]">
      <HourlyDatailsNavigation />
      <ul className="flex flex-col gap-4 items-stretch overflow-y-scroll">
        {x}
      </ul>
    </div>
  );
}

export default HourlyDetails;
function DetailsItem({ time, value, icon }) {
  const { isLoading } = useContext(MeteoContext);
  return (
    <li className="ps-3 pe-4 py-2.5 rounded-lg flex items-center justify-between bg-neutral-700 border border-neutral-600 relative">
      <div className="flex justify-start items-center gap-2">
        <img
          src={icon}
          alt=""
          className="w-[40px] h-[40px]"
        />
        <span className="text-5 font-medium">{time}</span>
      </div>
      <span className="text-7">{value}°</span>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-neutral-800 rounded-lg ${
          !isLoading ? "hidden" : ""
        }`}
      ></div>
    </li>
  );
}
