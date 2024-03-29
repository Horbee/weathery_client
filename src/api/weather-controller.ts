import { axiosInstance } from "../service/axios/axiosIstance";
import { ApiResponse } from "./models/ApiResponse";
import { City } from "./models/CitySearchResponse";
import { ForecastResponse } from "./models/ForecastResponse";

export const getForecastByCity = async (
  city: City
): Promise<ApiResponse<ForecastResponse>> => {
  const { data } = await axiosInstance.post<ApiResponse<ForecastResponse>>(
    `/weather/forecast`,
    { city }
  );

  return data;
};
