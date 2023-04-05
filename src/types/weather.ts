export type TemperatureForecastType = {
  degrees: number;
  time: number;
}

export type WeatherStatusType = "sun" | "rain" | "cloud";

export type WeatherForecastType = {
  temp: {
    high: number;
    low: number;
    hourly: TemperatureForecastType[]
  };
  weather: WeatherStatusType;
}

export type WeatherDefaultType = {
  location: string;
  lat: number;
  lng: number;
  onRemove:(city: string) => void;
}

export type WeatherType = Omit<WeatherDefaultType, "onRemove" | "hrlTemp">;

export type WeatherCardType = Omit<WeatherDefaultType, "hrlTemp">;

export type WeatherHeaderType = Omit<WeatherDefaultType, "temp">;