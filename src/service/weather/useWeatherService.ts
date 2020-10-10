import moment from "moment";
import { useState } from "react";

import { CityForecastResponse } from "../../models/CityForecastResponse";
import { City, CitySearchResponse } from "../../models/CitySearchResponse";
import { Weather, WeatherResponse } from "../../models/WeatherResponse";
import { Nullable } from "../../utils/Nullable";
import { TypedStorage } from "../../utils/typedStorage";
import { axiosInstance } from "../axios/axiosIstance";

type Status = "UP" | "DOWN" | "PENDING";

export const useWeatherService = () => {
  const [status, setStatus] = useState<Nullable<boolean>>(null);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<Nullable<Weather>>(null);
  const [lastSearchTime, setLastSearchTime] = useState<Nullable<number>>(null);

  const checkBackendStatus = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const response = await axiosInstance.get<{ status: Status }>("/health");
      if (response.data.status === "UP") {
        setStatus(true);
      }
    } catch (err) {
      setStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const backendState: Status = status
    ? "UP"
    : status === null
    ? "PENDING"
    : "DOWN";

  const getCities = async (search: string) => {
    const { data } = await axiosInstance.get<CitySearchResponse>(
      `/api/cities/${search}`
    );

    return data.data;
  };

  const getCityForecast = async (city: City) => {
    const { data } = await axiosInstance.post<CityForecastResponse>(
      `/api/weather/forecast`,
      { city }
    );

    return data.data;
  };

  const getWeatherInfo = async (cityName: string) => {
    const response = await axiosInstance.get<WeatherResponse>(
      `/api/weather/${cityName}`
    );

    setWeather(response.data.data);
    setLastSearchTime(Date.now());
    TypedStorage.citySearch = cityName;
  };

  const timedRefreshLastCitySearch = () => {
    if (TypedStorage.citySearch && lastSearchTime) {
      if (moment(lastSearchTime).add(1, "minutes") <= moment()) {
        // console.log("time Passed");
        getWeatherInfo(TypedStorage.citySearch);
      }
    }
  };

  const clearWeatherInfo = () => setWeather(null);

  return {
    checkBackendStatus,
    getWeatherInfo,
    getCities,
    getCityForecast,
    timedRefreshLastCitySearch,
    clearWeatherInfo,
    lastSearchTime,
    loading,
    backendState,
    weather
  };
};
