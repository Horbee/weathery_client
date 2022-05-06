import { hasAllKeys } from "./hasAllKeys";

export const isErrorReponse = (data: any) => {
  return hasAllKeys(data, ["success", "error"]) && !data.success;
};
