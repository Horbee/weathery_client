import { createContext, FC, useState } from "react";


import { City } from "../../api/models/CitySearchResponse";
import { Forecast } from "../../api/models/ForecastResponse";
import { getForecastByCity } from "../../api/weather-controller";
import { Nullable } from "../../utils/Nullable";
import { TypedStorage } from "../../utils/typedStorage";

type WeatherServiceContextType = {
  getCityForecast: (city: Nullable<City>) => Promise<void>;
  clearWeatherInfo: () => void;
  weatherForecast: Nullable<Forecast>;
  lastCity: Nullable<City>;
};

export const WeatherServiceContext = createContext<WeatherServiceContextType>(
  undefined as any
);

export const WeatherServiceProvider: FC = ({ children }) => {
  const [weatherForecast, setWeatherForecast] =
    useState<Nullable<Forecast>>(null);
  const [lastCity, setLastCity] = useState<Nullable<City>>(null);

  const getCityForecast = async (city: Nullable<City> = lastCity) => {
    if (!city) return;

    const response = await getForecastByCity(city);
    setWeatherForecast(response.forecast);
    setLastCity(city);
    TypedStorage.citySearch = city;
  };

  const clearWeatherInfo = () => setWeatherForecast(null);

  return (
    <WeatherServiceContext.Provider
      value={{
        getCityForecast,
        clearWeatherInfo,
        weatherForecast,
        lastCity,
      }}
    >
      {children}
    </WeatherServiceContext.Provider>
  );
};
