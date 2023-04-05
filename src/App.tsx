import { useEffect, useState } from "react";
import { fetchApi } from "./utils/fetchApi";
import {WeatherType } from "./types/weather";
import AddNewWeatherItem from "./components/Weather/AddNewWeatherItem";
import WeatherItem from "./components/Weather/WeatherItem";
import { getFromLocalStorage, saveToLocalStorage } from "./utils/storage";
import { useAppContext } from "./context/AppContext";
import Button from "./components/Button/Button";

function App() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ addNewWeatherCardError, setAddNewWeatherCardError ] = useState('');
  const [ weatherCards, setWeatherCards ] = useState<WeatherType[] | null>(null);
  const { onSetIsFahrenheit, isFahrenheit } = useAppContext();

  useEffect(() => {
    (async() => {
      // Check if there are saved data in localstorage
      const savedCards = await getFromLocalStorage<WeatherType[]>('weather');
      if (!savedCards) {
        // if not, we load default cards
        const response = await fetchApi<WeatherType[]>('./cards.json');
        if (response) {
          setWeatherCards(response)
        }
      } else {
        setWeatherCards(savedCards);
      }
      setIsLoading(false);
    })();
  }, []);


  const onAddNewCard = (card: WeatherType) => {
    /*
    Add a new card if the added weather location doesn't exist, if it does in the list,
    promp an error message to the user
    */
    if(weatherCards) {
      const existInList = weatherCards.find(({ location }) => card.location === location);
      if(existInList) {
        setAddNewWeatherCardError('Location already exist');
      } else {
        const newWeatherCards = [
          card,
          ...weatherCards,
        ]
        // Save to localstorage
        saveToLocalStorage('weather', newWeatherCards);
        setWeatherCards(newWeatherCards);
        setAddNewWeatherCardError('');
      }
    }
  }

  const onRemove = (city: string) => {
    // Remove the card from the list
    const filteredWeatherCards = weatherCards?.filter(({ location}) => city !== location);
    if(filteredWeatherCards) {
      setWeatherCards(filteredWeatherCards)
      // Save to localstorage.
      saveToLocalStorage('weather', filteredWeatherCards);
    }
  }

  return (
    <div className="mx-auto flex flex-col" style={{ maxWidth: 600 }}>
      {isLoading && <div className="my-4 text-center">Loading...</div>}
      { !isLoading && (
        <div className="mt-4">
          <Button onClick={onSetIsFahrenheit}>
            Show { isFahrenheit ? "Celsius" : "Fahrenheit" }
          </Button>
          <AddNewWeatherItem onClick={onAddNewCard} error={addNewWeatherCardError} />
          { weatherCards && weatherCards.map((card) => <WeatherItem key={card.location} {...{...card, onRemove}} />)}
        </div>
      )}
      
    </div>
  );
}

export default App;
