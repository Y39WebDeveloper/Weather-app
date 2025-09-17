import { useContext } from "react";
import {
  DailyDetails,
  DeatailsContainer,
  Header,
  Hero,
  HourlyDetails,
  Navbar,
} from "./";
import IconReload from '/assets/images/icon-retry.svg'
import IconError from '/assets/images/icon-error.svg'
import { MeteoContext } from "../Contexts/MeteoContext";

function MeteoApp() {
  const { notFound, error } = useContext(MeteoContext);
  return (
    <div className="app p-4 sm:p-6 text-neutral-0 max-w-[1216px] mx-auto">
      <Navbar />
      <Header />
      {error ? (
        <Error />
      ) : notFound ? (
        <NotFound />
      ) : (
        <div className="body flex flex-col lg:flex-row gap-8 lg:max-h-[712px]">
          <div className="flex flex-col gap-8 lg:gap-12 w-full">
            <div className="flex flex-col gap-5 lg:gap-8">
              <Hero />
              <DeatailsContainer />
            </div>
            <DailyDetails />
          </div>
          <HourlyDetails />
        </div>
      )}
    </div>
  );
}

export default MeteoApp;

function NotFound() {
  return <div className="text-4 text-center">No search result found!</div>;
}
function Error() {
  return (
    <div className="text-4 text-center flex flex-col items-center gap-4 sm:gap-6">
      <img src={IconError} alt="" className="w-[42px] h-[50px]" />
      <h3 className="text-2 font-bricolage">Something went wrong</h3>
      <p className="text-5 font-medium text-neutral-200">We couldn’t connect to the server (API error). Please try <br className="max-lg:hidden"></br> again in a few moments.</p>
      <button onClick={()=>{location.reload()}} className="flex items-center justify-center gap-2.5 px-4 py-3 text-7 bg-neutral-800 hover:bg-neutral-700 cursor-pointer rounded-lg"><img src={IconReload} alt="" className="w-4 h-4" />Retry</button>
    </div>
  );
}
