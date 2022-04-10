import { axiosInstance } from "../service/axios/axiosIstance";
import { StatusResponse } from "./models/StatusResponse";

export const getBackendStatus = async (): Promise<StatusResponse> => {
  const { data } = await axiosInstance.get<StatusResponse>("/health");

  return data;
};
