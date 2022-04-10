import { useContext } from "react";


import { AuthServiceContext } from "./AuthServiceContext";

export const useAuthService = () => {
  return useContext(AuthServiceContext);
};
