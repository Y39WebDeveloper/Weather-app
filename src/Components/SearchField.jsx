import { useContext, useEffect, useState } from "react";
import { MeteoContext } from "../Contexts/MeteoContext";
import IconSearch from "/assets/images/icon-search.svg";
import "./loader.css";

function SearchField() {
  const { setCity, setError, setNotFound } = useContext(MeteoContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside() {
      setOpen(false);
    }
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [open]);

  async function handleOnChangeSearch() {
    if (value == "") {
      return;
    }
    try {
      setIsLoading(true)
      setOpen(true);
      const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${value}&language=en&format=json&count=10`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Http error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data?.results?.length > 0) {
        const cities2 = data?.results?.map((city, i) => {
          return (
            <li
              key={i}
              className="text-7 outline-none px-2 py-2.5 rounded-lg focus:bg-neutral-700 hover:bg-neutral-700 focus:border focus:border-neutral-600"
              tabIndex={0}
              onClick={() => {
                setCity({
                  lat: city.latitude,
                  lon: city.longitude,
                  city: city.name,
                  country: city.country,
                });
                localStorage.setItem("city", JSON.stringify({
                  lat: city.latitude,
                  lon: city.longitude,
                  city: city.name,
                  country: city.country,
                }))
                setCities([]);
                setValue("");
              }}
            >
              {city.name}, {city?.admin2}, {city?.admin1}, {city.country}
            </li>
          );
        });
        setCities(cities2);
        setNotFound(false);
      } else {
        setCities([]);
        setNotFound(true);
        setOpen(false)
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:gap-4 w-full">
      <label className="w-full flex justify-start items-center gap-2 bg-neutral-800 rounded-xl px-6 py-4 [&:has(input:focus)]:shadow-[0_0_0_2px_#262540,0_0_0_3px_#fff] relative">
        <img src={IconSearch} className="w-5" alt="" />
        <input
          type="search"
          name=""
          id=""
          placeholder="Search for a place..."
          className="outline-none w-full placeholder:text-neutral-200 text-5 font-medium"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <ul
          className={`absolute left-0 top-full mt-2.5 p-2 rounded-xl bg-neutral-800 border border-neutral-700 w-full z-2 ${
            open ? "" : "hidden"
          }`}
        >
          {isLoading ? <SearchLoading /> : cities}
        </ul>
      </label>
      <button
        onClick={handleOnChangeSearch}
        className="outline-none bg-blue-500 rounded-xl px-6 py-4 text-5 font-medium hover:bg-blue-700 focus:shadow-[0_0_0_3px_#02012C,0_0_0_5px_#4658D9]"
      >
        Search
      </button>
    </div>
  );
}

export default SearchField;

function SearchLoading() {
  return (
    <span className="flex items-center gap-2.5 justify-start">
      <SearchLoadinganim/>Search in progress
    </span>
  );
}
function SearchLoadinganim() {
  return (
    <div className="dots-loader">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
}
