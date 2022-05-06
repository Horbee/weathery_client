import { axiosInstance } from "../service/axios/axiosIstance";
import { CitySearchResponse } from "./models/CitySearchResponse";

export const searchCityByName = async (name: string) => {
  const { data } = await axiosInstance.get<CitySearchResponse>(
    "cities/search",
    { params: { name } }
  );

  return data.data;
};
