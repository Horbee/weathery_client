import { WeatherDescription } from "./WeatherResponse";

export interface Forecast {
  lat: number;
  lon: number;
  timezone: string; // Timezone name
  timezone_offset: number; // Shift in seconds from UTC
  current: {
    dt: number; // Current time, Unix, UTC
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number; // Atmospheric pressure on the sea level, hPa
    humidity: number; // Humidity, %
    dew_point: number; // Atmospheric temperature below which water droplets begin to condense and dew can form.
    uvi: number; // Midday UV index
    clouds: number; // Cloudiness, %
    visibility: number; // Average visibility, meters
    wind_speed: number; // Wind speed metre/sec
    wind_deg: number; // Wind direction, degrees
    weather: WeatherDescription[];
  };
  minutely: Precipitation[]; // for 1 H
  hourly: HourlyForecast[]; // for 48 H
  daily: DailyForecast[]; // for 7 D
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
  pop: number; // Probability of precipitation
  rain?: {
    "1h": number; // Rain volume for last hour, mm
  };
}

export interface Precipitation {
  dt: number; // Time of the forecasted data, unix, UTC
  precipitation: number; // Precipitation volume, mm
}

export interface ForecastResponse {
  cityName: string;
  forecast: Forecast;
}
