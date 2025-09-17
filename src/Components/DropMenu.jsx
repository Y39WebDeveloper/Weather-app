import IconUnits from "/assets/images/icon-units.svg";
import IconDropdown from "/assets/images/icon-dropdown.svg";
import { DropMenuList } from "./";
import { useState } from "react";

function DropMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <div className="absolute z-10 top-0 left-0 w-[2000vw] h-[200vh] bg-[transparent]" onClick={()=>setIsOpen(false)}></div>}
      <div className="relative z-20">
        <button
          className="z-20 flex justify-center items-center gap-1.5 text-8 sm:gap-2.5 sm:text-7 bg-neutral-800 px-2.5 py-2 sm:px-4 sm:py-3 rounded-md sm:rounded-lg"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img src={IconUnits} alt="" className="h-3.5 sm:h-4" />
          Units
          <img
            src={IconDropdown}
            alt=""
            className="h-3.5 w-[9px] sm:w-3 sm:h-[18px]"
          />
        </button>
        {isOpen && <DropMenuList setIsOpen={setIsOpen} isOpen={isOpen} />}
      </div>
    </>
  );
}

export default DropMenu;
