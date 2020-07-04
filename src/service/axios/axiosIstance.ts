import axios from "axios";

import { apiBaseUrl } from "../../constants/endpoints";
import { handleErrorResponse } from "./handleErrorResponse";
import { handleRequest } from "./handleRequest";

export const instance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.response.use((response) => response, handleErrorResponse);

instance.interceptors.request.use(handleRequest, (error) =>
  Promise.reject(error)
);

export const axiosInstance = instance;
