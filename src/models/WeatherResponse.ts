// TODO: delete if not in use
export interface Weather {
  coord: { lon: number; lat: number };
  weather: WeatherDescription[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherDescription {
  id: number;
  main: string; // Group of weather parameters (Rain, Snow, Extreme etc.)
  description: string;
  icon: string;
}

export interface WeatherResponse {
  success: boolean;
  data: Weather;
}
