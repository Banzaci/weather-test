import { useEffect, useState } from "react";
import { WeatherHeaderType, WeatherTypeBody } from "../../types/weather";
import Button from "../Button/Button";
import { useAppContext } from "../../context/AppContext";
import { fetchApi } from "../../utils/fetchApi";

export const calculateFromFarToCel = (n:number) => Math.trunc((n - 32) * (5 / 9));

function WeatherItem({  lat, lng, location, onRemove }: WeatherHeaderType) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ weatherData, setWeatherData ] = useState<WeatherTypeBody | null>()
  const { isFahrenheit } = useAppContext();
  
  useEffect(() => {
    (async() => {
      const response = await fetchApi<WeatherTypeBody>('./card-body.json');
      console.log(response)
      if (response) {
        setWeatherData(response)
      }
    })();
  }, []);

  return (
    <div className="flex flex-col my-2 px-2 p-2 rounded bg-slate-100 w-full hover:bg-slate-200" key={location}>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2>{location}</h2>
        { isFahrenheit ? calculateFromFarToCel(lat) : lat }
      </div>
      { isOpen && (<div>
        {weatherData ? <div>Data</div> : <div>No records</div>}
        <Button className="mt-4" onClick={() => onRemove(location)}>Remove</Button>
      </div>)}
    </div>
  );
}

export default WeatherItem;
