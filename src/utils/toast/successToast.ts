import { Slide, toast } from "react-toastify";

export const createSuccessToast = (msg: string) => {
  toast.success(msg, {
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
