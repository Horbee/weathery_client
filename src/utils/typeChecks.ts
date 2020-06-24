import { hasAllKeys } from "./hasAllKeys";

export const isErrorReponse = (data: any) => {
  return (
    hasAllKeys(data, ["success", "error"]) &&
    data.succcess === false &&
    (typeof data.error === "string" || isStringArray(data.error))
  );
};

export const isStringArray = (value: any) => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
};
