import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faTrash, faCloud, faCloudRain } from '@fortawesome/free-solid-svg-icons'
import { TemperatureForecastType, WeatherCardType, WeatherForecastType, WeatherStatusType } from "../../types/weather";
import Button from "../Button/Button";
import { useAppContext } from "../../context/AppContext";
import { fetchApi } from "../../utils/fetchApi";

export const calculateFromFarToCel = (n:number) => Math.trunc((n - 32) * (5 / 9));

//Render a weather icon depending on weather
const renderWeatherType = (type: WeatherStatusType) => {
  if(type === "cloud") return faCloud;
  if(type === "rain") return faCloudRain;
  return faSun; // set the Sun as default
}

function WeatherItem({  lat, lng, location, onRemove }: WeatherCardType) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ weatherData, setWeatherData ] = useState<WeatherForecastType | null>()
  const { isFahrenheit } = useAppContext();
  
  useEffect(() => {
    (async() => {
      // Check if the data has been cached
      if(!weatherData) {
        try {
          // This would be a unique request for eact location
          const response = await fetchApi<WeatherForecastType>('./cardData.json');
          if (response) {
            setWeatherData(response);
          } else {
            // Promp the user with an error message
          }
        } catch (error) {
          // Promp the user with an error message
        }
      }
    })();
  }, [weatherData]);
  
  const renderHrlWeather = useMemo(() => weatherData?.temp?.hourly.map(({ degrees, time}: TemperatureForecastType) => {
    return (<div key={time} className="flex my-2 p-2">
      <div className="w-12 text-sm">{ time }</div>
      <div className="w-12 text-sm">
          { (isFahrenheit ? `${degrees}` : `${calculateFromFarToCel(degrees)}`) }&deg;
        </div>
    </div>)
  }),
  [weatherData, isFahrenheit]);

  if (!weatherData) return null;

  const { weather, temp } = weatherData;
  const icon = renderWeatherType(weather);

  return (
    <div className="flex flex-col my-2 px-2 p-2 rounded bg-slate-100 w-full hover:bg-slate-200" key={location}>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2>{location}</h2>
        <span className="text-sm mr-2">Latitude: {lat}</span>
        <span className="text-sm">Longitude: {lng}</span>
        <div>
          <FontAwesomeIcon icon={icon} className="mr-2" />
          { temp && <>
              <span className="mr-2">{(isFahrenheit ? temp.low : calculateFromFarToCel(temp.low)) }</span>
              <span>{(isFahrenheit ? temp.high : calculateFromFarToCel(temp.high)) }</span>
            </>
            }
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
