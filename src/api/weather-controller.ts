import { axiosInstance } from "../service/axios/axiosIstance";
import { City } from "./models/CitySearchResponse";
import { ForecastResponse } from "./models/ForecastResponse";

export const getForecastByCity = async (
  city: City
): Promise<ForecastResponse> => {
  const { data } = await axiosInstance.post<ForecastResponse>(
    `/weather/forecast`,
    { city }
  );

  return data;
};
