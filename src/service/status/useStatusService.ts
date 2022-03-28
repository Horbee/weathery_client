import { useContext } from "react";


import { StatusServiceContext } from "./StatusServiceContext";

export const useStatusService = () => {
  return useContext(StatusServiceContext);
};
