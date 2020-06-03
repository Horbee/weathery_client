import { Slide, toast } from "react-toastify";

export const createErrorToast = (error: string | string[]) => {
  if (error instanceof Array) {
    error.forEach((msg: string) => errorToast(msg));
  } else {
    errorToast(error);
  }
};

const errorToast = (msg: string) => {
  toast.error(msg, {
    transition: Slide,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined
  });
};
