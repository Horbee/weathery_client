import axios from "axios";

import { apiBaseUrl } from "../../constants/endpoints";
import { TypedStorage } from "../../utils/typedStorage";
import { handleErrorResponse } from "./handleErrorResponse";

export const instance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${TypedStorage.accessToken}`;

instance.interceptors.response.use((response) => response, handleErrorResponse);

export const axiosInstance = instance;
