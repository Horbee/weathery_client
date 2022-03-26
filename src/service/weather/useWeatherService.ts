import { addMinutes, isPast } from 'date-fns'
import { useState } from 'react'

import { City, CitySearchResponse } from '../../models/CitySearchResponse'
import { Forecast, ForecastResponse } from '../../models/ForecastResponse'
import { Nullable } from '../../utils/Nullable'
import { TypedStorage } from '../../utils/typedStorage'
import { axiosInstance } from '../axios/axiosIstance'

type Status = "UP" | "DOWN" | "PENDING";

export const useWeatherService = () => {
  const [status, setStatus] = useState<Nullable<boolean>>(null);
  const [loading, setLoading] = useState(false);
  const [weatherForecast, setWeatherForecast] =
    useState<Nullable<Forecast>>(null);
  const [lastCity, setLastCity] = useState<Nullable<City>>(null);
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
    const { data } = await axiosInstance.post<ForecastResponse>(
      `/api/weather/forecast`,
      { city }
    );
    setWeatherForecast(data.forecast);
    setLastCity(city);
    setLastSearchTime(Date.now());
    TypedStorage.citySearch = city;
  };

  const timedRefreshLastCitySearch = () => {
    if (TypedStorage.citySearch && lastSearchTime) {
      if (isPast(addMinutes(new Date(lastSearchTime), 1))) {
        getCityForecast(TypedStorage.citySearch);
      }
    }
  };

  const clearWeatherInfo = () => setWeatherForecast(null);

  return {
    checkBackendStatus,
    getCities,
    getCityForecast,
    timedRefreshLastCitySearch,
    clearWeatherInfo,
    lastSearchTime,
    loading,
    backendState,
    weatherForecast,
    lastCity,
  };
};
