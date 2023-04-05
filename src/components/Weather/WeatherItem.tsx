import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faTrash, faTemperature1 } from '@fortawesome/free-solid-svg-icons'
import { Hrltemp, WeatherCardType } from "../../types/weather";
import Button from "../Button/Button";
import { useAppContext } from "../../context/AppContext";
import { fetchApi } from "../../utils/fetchApi";

export const calculateFromFarToCel = (n:number) => Math.trunc((n - 32) * (5 / 9));

function WeatherItem({  lat, lng, location, onRemove, temp }: WeatherCardType) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ weatherData, setWeatherData ] = useState<Hrltemp[] | null>()
  const { isFahrenheit } = useAppContext();
  
  useEffect(() => {
    (async() => {
      if(isOpen && !weatherData) {
        const response = await fetchApi<Hrltemp[]>('./cardData.json');
        if (response) {
          setWeatherData(response)
        }
      }
    })();
  }, [isOpen, weatherData]);
  
  const renderHrlWeather = useMemo(() => weatherData?.map(({ time, temp }: Hrltemp) => 
    <div key={time} className="flex my-2">
      <div className="w-12 text-sm">{ time }</div>
      <div className="w-12 text-sm">
          <FontAwesomeIcon icon={faTemperature1} className="mr-1" />
          { (isFahrenheit ? temp : calculateFromFarToCel(temp)) }
        </div>
    </div>),
  [weatherData, isFahrenheit])

  return (
    <div className="flex flex-col my-2 px-2 p-2 rounded bg-slate-100 w-full hover:bg-slate-200" key={location}>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2>{location}</h2>
        <span className="text-sm mr-2">Latitude: {lat}</span>
        <span className="text-sm">Longitude: {lng}</span>
        <div>
          <FontAwesomeIcon icon={faSun} className="mr-2" /> 
          { temp && (isFahrenheit ? temp.high : calculateFromFarToCel(temp.high)) }
        </div>
      </div>
      { isOpen && (<div>
        { renderHrlWeather ? <div>{renderHrlWeather}</div> : <div>No records</div> }
        <Button className="mt-4" onClick={() => onRemove(location)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>)}
    </div>
  );
}

export default WeatherItem;
