import { AxiosError } from "axios";

import { ErrorResponse } from "../../models/ErrorResponse";
import { createErrorToast } from "../../utils/toast/errorToast";
import { isErrorReponse } from "../../utils/typeChecks";

export const handleErrorResponse = async (error: AxiosError<ErrorResponse>) => {
  const { response } = error;
  if (response && response.data) {
    // backend is running
    const { data } = response;
    if (isErrorReponse(data)) {
      // custom error from backend
      createErrorToast(data.error);
    } else {
      // default error
      createErrorToast("An unexpected error occured.");
    }
  } else {
    // backend is down
    createErrorToast("Can't establish connection to server.");
  }
  return Promise.reject(error);
};
