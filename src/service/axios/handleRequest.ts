import { AxiosRequestConfig } from "axios";

import { TypedStorage } from "../../utils/typedStorage";

// methods will be called before each request
export const handleRequest = (config: AxiosRequestConfig) => {
  setAuthorizationHeader(config);
  return config;
};

// get token from LS
const setAuthorizationHeader = (config: AxiosRequestConfig) => {
  if (TypedStorage.accessToken) {
    config.headers!.Authorization = `Bearer ${TypedStorage.accessToken}`;
  } else {
    console.warn(
      "Unable to read token from localstorage. Authorization header will not be set."
    );
  }
};
