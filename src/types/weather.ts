export type WeatherCardType = {
  location: string;
  lat: number;
  lng: number;
  temp: number;
  onRemove:(city: string) => void;
}

export type WeatherType = Omit<WeatherCardType, "onRemove">;

export type WeatherTypeBody = Pick<WeatherCardType, "temp" | "onRemove">;

export type WeatherHeaderType = Omit<WeatherCardType, "temp">;