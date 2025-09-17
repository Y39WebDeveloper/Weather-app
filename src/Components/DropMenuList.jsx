import { useContext } from "react";
import IconCheckmark from "/assets/images/icon-checkmark.svg";
import { MeteoContext } from "../Contexts/MeteoContext";

function DropMenuList({ setIsOpen, isOpen }) {
  const { isMetric, setIsMetric } = useContext(MeteoContext);

  return (
    <div className="flex flex-col gap-2 p-2 bg-neutral-800 rounded-md sm:rounded-xl w-[214px] absolute right-0 top-full mt-2.5 border-1 border-neutral-600 z-20">
      <button
        className="cursor-pointer hover:bg-neutral-700 outline-none rounded-lg text-8 sm:text-7 py-2 px-1.5 sm:py-2.5 sm:px-2 focus:shadow-[0_0_0_2px_#262540,0_0_0_3px_#fff]"
        onClick={() => {
          setIsMetric(!isMetric);
          setIsOpen(false);
        }}
      >
        Switch to {isMetric ? "Imperial" : "Metric"}
      </button>

      <div className="flex flex-col gap-2 items-stretch border-b-[1px] border-neutral-600 pb-1 last:border-0">
        <span className="text-8 text-neutral-300 ms-2">Temperature</span>
        <ul className="flex flex-col gap-1 items-stretch">
          <ListUnitItem label={"Celsius (°C)"} active={isMetric} />
          <ListUnitItem label={"Celsius (°C)"} active={!isMetric} />
        </ul>
      </div>

      <div className="flex flex-col gap-2 items-stretch border-b-[1px] border-neutral-600 pb-1 last:border-0">
        <span className="text-8 text-neutral-300 ms-2">Wind Speed</span>
        <ul className="flex flex-col gap-1 items-stretch">
          <ListUnitItem label={"km/h"} active={isMetric} />
          <ListUnitItem label={"mph"} active={!isMetric} />
        </ul>
      </div>

      <div className="flex flex-col gap-2 items-stretch border-b-[1px] border-neutral-600 pb-1 last:border-0">
        <span className="text-8 text-neutral-300 ms-2">Precipitation</span>
        <ul className="flex flex-col gap-1 items-stretch">
          <ListUnitItem label={"Millimeters (mm)"} active={isMetric} />
          <ListUnitItem label={"Inches (in)"} active={!isMetric} />
        </ul>
      </div>
    </div>
  );
}

export default DropMenuList;

function ListUnitItem({ label, active }) {
  return (
    <li
      className={`outline-none text-8 sm:text-7 py-1.5 px-2 sm:py-2.5 sm:px-2 flex justify-between items-center [&.active]:bg-neutral-700 rounded-lg [&.active_img]:flex focus:bg-neutral-700 focus:shadow-[0_0_0_2px_#262540,0_0_0_3px_#fff] ${
        active ? "active" : ""
      }`}
    >
      {label}
      <img
        src={IconCheckmark}
        alt=""
        className={`w-[9px] sm:w-[14px] ${active ? "" : "hidden"}`}
      />
    </li>
  );
}
