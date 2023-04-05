import { useState } from "react";
import { WeatherCardType } from "../../types/weather";
import Button from "../Button/Button";

export const calculateFromFarToCel = (n:number) => {
  return Math.trunc((n - 32) * (5 / 9));
}

function WeatherItem({  lat, lng, location, onRemove }: WeatherCardType) {
  const [ isOpen, setIsOpen ] = useState(false);
  return (
    <div className="flex flex-col my-2 px-2 p-2 rounded bg-slate-100 w-full hover:bg-slate-200" key={location}>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2>{location}</h2>
        {calculateFromFarToCel(lat)}
      </div>
      { isOpen && (<div>
        <Button className="mt-4" onClick={() => onRemove(location)}>Remove</Button>
      </div>)}
    </div>
  );
}

export default WeatherItem;
