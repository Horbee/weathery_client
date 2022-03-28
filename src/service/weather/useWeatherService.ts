import { useContext } from "react";


import { WeatherServiceContext } from "./WeatherServiceContext";

export const useWeatherService = () => {
  return useContext(WeatherServiceContext);
};
