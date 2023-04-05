export type WeatherCardType = {
  location: string;
  lat: number;
  lng: number;
  temp: number;
  onRemove: (location: string) => void;
}

export type WeatherType = Omit<WeatherCardType, "onRemove">;