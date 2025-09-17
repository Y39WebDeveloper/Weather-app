import { useContext, useEffect, useState, useRef } from "react";
import IconDropdown from "/assets/images/icon-dropdown.svg";
import { MeteoContext } from "../Contexts/MeteoContext";

function HourlyDetailsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, activeDay } = useContext(MeteoContext);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex justify-center items-center gap-3 text-7 bg-neutral-600 px-4 py-2 rounded-lg"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isLoading ? "–" : activeDay}
        <img src={IconDropdown} alt="" className="w-[12px] h-[18px]" />
      </button>
      {isOpen && <MenuList setIsOpen={setIsOpen} />}
    </div>
  );
}

export default HourlyDetailsMenu;

function MenuList({ setIsOpen }) {
  const { activeDay, setActiveDay } = useContext(MeteoContext);

  const dayss = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [days, setDays] = useState([]);
  useEffect(() => {
    const updatedDay = [];
    for (let i = 0; i < dayss.length; i++) {
      const newDay = { id: i, day: dayss[i], active: dayss[i] === activeDay };
      updatedDay.push(newDay);
    }
    setDays(updatedDay);
  }, []);

  function handleClickDay(id) {
    const updatedDay = days.map((day) => {
      if (day.id == id) {
        setActiveDay(day.day);
        return { ...day, active: true };
      } else {
        return { ...day, active: false };
      }
    });
    setDays(updatedDay);
    setIsOpen(false);
  }

  const listeItems = days.map((day) => (
    <MenuItem
      key={day.id}
      id={day.id}
      day={day.day}
      active={day.active}
      handleClick={handleClickDay}
    />
  ));

  return (
    <ul className="flex flex-col gap-2 p-2 bg-neutral-800 rounded-md sm:rounded-xl w-[214px] absolute right-0 top-full mt-2.5 border-1 border-neutral-600 z-10">
      {listeItems}
    </ul>
  );
}

function MenuItem({ id, day = "Monday", active = false, handleClick }) {
  return (
    <li
      onClick={() => {
        handleClick(id);
      }}
      className={`${
        active && "active"
      } outline-none cursor-pointer text-8 sm:text-7 py-1.5 px-2 sm:py-2.5 sm:px-2 flex justify-between items-center hover:bg-neutral-700 [&.active]:bg-neutral-700 rounded-lg [&.active_img]:flex focus:bg-neutral-700 focus:shadow-[0_0_0_2px_#262540,0_0_0_3px_#fff]`}
      tabIndex={0}
    >
      {day}
    </li>
  );
}
