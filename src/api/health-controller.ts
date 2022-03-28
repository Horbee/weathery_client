import { StatusResponse } from "../models/StatusResponse";
import { axiosInstance } from "../service/axios/axiosIstance";

export const getBackendStatus = async (): Promise<StatusResponse> => {
  const { data } = await axiosInstance.get<StatusResponse>("/health");

  return data;
};
