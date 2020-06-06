import axios from "axios";
import moment from "moment";
import { useState } from "react";

import { backendURL } from "../../constants/endpoints";
import { Weather, WeatherResponse } from "../../models/WeatherResponse";
import { Nullable } from "../../utils/Nullable";
import { createErrorToast } from "../../utils/toast/errorToast";
import { TypedStorage } from "../../utils/typedStorage";

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
      const response = await axios.get<{ status: Status }>(
        backendURL("/health")
      );
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

  const getWeatherInfo = async (city: string) => {
    try {
      const response = await axios.get<WeatherResponse>(
        backendURL(`/api/weather/${city}`),
        {
          headers: { Authorization: `Bearer ${TypedStorage.accessToken}` }
        }
      );

      setWeather(response.data.data);
      setLastSearchTime(Date.now());
      TypedStorage.citySearch = city;
    } catch (err) {
      console.log(err.response);
      createErrorToast(err.response.data?.error);
    }
  };

  const timedRefreshLastCitySearch = () => {
    if (TypedStorage.citySearch && lastSearchTime) {
      if (moment(lastSearchTime).add(1, "minutes") <= moment()) {
        console.log("time Passed");
        getWeatherInfo(TypedStorage.citySearch);
      }
    }
  };

  const clearWeatherInfo = () => setWeather(null);

  return {
    checkBackendStatus,
    getWeatherInfo,
    timedRefreshLastCitySearch,
    clearWeatherInfo,
    lastSearchTime,
    loading,
    backendState,
    weather
  };
};
