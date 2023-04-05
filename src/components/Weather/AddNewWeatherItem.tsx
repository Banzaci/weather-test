import { useState } from "react";
import { TextInput } from "../Input/Input";
import Button from "../Button/Button";
import { WeatherType } from "../../types/weather";

/*
This component adds a new weather location.
In real life, a name text filed would search for latitude and longitude.
*/

function AddNewWeatherItem({ onClick, error }: { onClick: (data: WeatherType) => void, error: string }) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ location, setLocation ] = useState('');
  const [ longitude, setLongitude ] = useState('');
  const [ latitude, setLatitude ] = useState('');

  const onLocalClick = () => {
    onClick({
      location,
      lat: Number(latitude),
      lng: Number(longitude),
    });
  }
  return (
    <div className="my-4 relative">
      <div className="cursor-pointer mb-2" onClick={() => setIsOpen(!isOpen)}>+</div>
      { isOpen && (
        <div className="flex flex-col mb-4">
          <TextInput className="mb-2" placeholder="City" onChange={setLocation}/>
          <TextInput className="mb-2" placeholder="Latitude" onChange={setLatitude}/>
          <TextInput className="mb-2" placeholder="Longitude" onChange={setLongitude}/>
          <Button onClick={onLocalClick}>Add location</Button>
          { error && <p className="text-red-500 w-full py-2 text-center font-bold">{ error }</p>}
        </div>
      )}
    </div>
  );
}

export default AddNewWeatherItem;
