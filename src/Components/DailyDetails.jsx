import { useContext } from "react";
import { MeteoContext } from "../Contexts/MeteoContext";

function DailyDetails() {
  const { meteoData, getIcon } = useContext(MeteoContext);

  const daily = meteoData?.daily;
  const x = Array.from({ length: daily?.time.length }, (_, i) => (
    <DetailsCard
      key={i}
      icon={getIcon(daily?.weather_code[i])}
      max={Math.round(daily?.temperature_2m_max[i])}
      min={Math.round(daily?.temperature_2m_min[i])}
      day={new Date(daily?.time[i]).toLocaleDateString("en-US", {
        weekday: "short",
      })}
    />
  ));
  return (
    <div className="flex flex-col items-start">
      <h4 className="text-5 mb-5">Daily forecast</h4>
      <div className="grid grid-cols-3 gap-4 sm:flex sm:justify-center sm:items-center w-full">
        {x}
      </div>
    </div>
  );
}

export default DailyDetails;

function DetailsCard({ max = "--", min = "--", unit = "°", day, icon }) {
  const { isLoading } = useContext(MeteoContext);
  return (
    <div className="flex flex-col items-center gap-6 px-2.5 py-4 bg-neutral-800 rounded-xl border border-neutral-600 w-full relative overflow-hidden">
      <span className="text-6">{day}</span>
      <img
        src={icon}
        alt=""
        className="w-[60px] h-[60px]"
      />
      <div className="text-7 w-full flex items-center justify-between">
        <span>
          {max}
          {unit}
        </span>
        <span className="text-neutral-200">
          {min}
          {unit}
        </span>
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-neutral-800 ${
          !isLoading ? "hidden" : ""
        }`}
      ></div>
    </div>
  );
}
