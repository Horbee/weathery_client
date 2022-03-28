import { City, CitySearchResponse } from "../models/CitySearchResponse";
import { ForecastResponse } from "../models/ForecastResponse";
import { axiosInstance } from "../service/axios/axiosIstance";

export const getForecastByCity = async (
  city: City
): Promise<ForecastResponse> => {
  const { data } = await axiosInstance.post<ForecastResponse>(
    `/api/weather/forecast`,
    { city }
  );

  return data;
};

export const searchCityByName = async (term: string) => {
  const { data } = await axiosInstance.get<CitySearchResponse>(
    `/api/cities/${term}`
  );

  return data.data;
};
