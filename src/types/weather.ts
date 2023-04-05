type Temp = {
  low: number;
  high: number;
}

export type Hrltemp = {
  time: string;
  temp: number;
}

export type WeatherDefaultType = {
  location: string;
  lat: number;
  lng: number;
  temp?: Temp;
  hrlTemp: Hrltemp[],
  onRemove:(city: string) => void;
}

export type WeatherType = Omit<WeatherDefaultType, "onRemove" | "hrlTemp">;

export type WeatherCardType = Omit<WeatherDefaultType, "hrlTemp">;

export type WeatherHeaderType = Omit<WeatherDefaultType, "temp">;