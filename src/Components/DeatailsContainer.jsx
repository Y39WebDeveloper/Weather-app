import { useContext } from 'react'
import { MeteoContext } from '../Contexts/MeteoContext'

function DeatailsContainer() {
  const {meteoData} = useContext(MeteoContext)
  return (
    <div className='grid grid-cols-2 gap-4 md:flex md:justify-center md:items-center md:gap-5 lg:gap-6'>
        <DetailsCard label="Feels Like" value={meteoData?.current.apparent_temperature} unit={"°"}/>
        <DetailsCard label="Humidity" value={meteoData?.current.relative_humidity_2m} unit={"%"}/>
        <DetailsCard label="Wind" value={meteoData?.current.wind_speed_10m} unit={" km/h"}/>
        <DetailsCard label="Precipitation" value={meteoData?.current.precipitation} unit={" mm"}/>
    </div>
  )
}

export default DeatailsContainer


function DetailsCard({label="Feels Like", value="–", unit}) {
  const {isLoading} = useContext(MeteoContext)
    return (
        <div className='flex flex-col items-start gap-6 p-5 bg-neutral-800 rounded-xl border border-neutral-600 w-full'>
            <span className='text-6 text-neutral-200'>{label}</span>
            <h3 className='text-3'>{isLoading?"–":value}{unit}</h3>
        </div>
    )
}