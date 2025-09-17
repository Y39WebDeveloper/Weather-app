import {HourlyDetailsMenu} from './'

function HourlyDatailsNavigation() {
  return (
    <div className="flex items-center justify-between mb-4 gap-2">
      <h4 className="text-5">Hourly forecast</h4>
      <HourlyDetailsMenu />
    </div>
  )
}

export default HourlyDatailsNavigation