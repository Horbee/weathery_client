import { WeatherDescription } from "./WeatherResponse";

export interface CityForecast {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherDescription[];
  };
  minutely: Precipitation[];
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherDescription[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

interface HourlyForecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherDescription[];
  pop: number;
  rain?: {
    "1h": number;
  };
}

export interface Precipitation {
  dt: number;
  precipitation: number;
}

export interface CityForecastResponse {
  success: boolean;
  data: CityForecast;
}
