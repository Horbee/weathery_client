import { ErrorResponse } from "../models/ErrorResponse";
import { hasAllKeys } from "./hasAllKeys";

export const isErrorReponse = (data: any) => {
  if (hasAllKeys(data, ["success", "error"])) {
    return (
      (data as ErrorResponse).success === false &&
      (typeof (data as ErrorResponse).error === "string" ||
        isStringArray((data as ErrorResponse).error))
    );
  }

  return false;
};

export const isStringArray = (value: any) => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
};
